/* Copyright © 2022 Seneca Project Contributors, MIT License. */

function refer(this: any, options: any) {
  const seneca: any = this

  const genCode = this.util.Nid({ length: 16 })


  seneca
    .fix('biz:refer')
    .message('create:entry', msgCreateEntry)
    .message('ensure:entry', msgEnsureEntry)
    .message('accept:entry', msgAcceptEntry)
    .message('lost:entry', msgLostEntry)
    .message('give:award', msgRewardEntry)
    .message('load:rules', msgLoadRules)
    .prepare(prepare)


  async function msgCreateEntry(this: any, msg: any) {
    const seneca = this

    let user_id = msg.user_id
    let email = msg.email // not required if mode === 'multi'
    let kind = msg.kind || 'standard'
    let mode = msg.mode || 'single'
    let peg = msg.peg || 'none' // app specific entry type

    let occur

    if ('single' === mode) {
      occur = await seneca.entity('refer/occur').load$({
        email,
        kind: 'accept',
      })

      if (occur) {
        return {
          ok: false,
          why: 'entry-exists',
        }
      }
    }

    const entry = await seneca.entity('refer/entry').save$({
      user_id,
      kind,
      email,
      mode,
      peg,

      // TODO: use a longer key!
      // unique key for this referral, used for validation
      key: genCode()
    })

    if ('single' === mode) {
      occur = await seneca.entity('refer/occur').save$({
        user_id: msg.user_id,
        entry_kind: msg.kind,
        entry_mode: msg.mode,
        entry_peg: msg.peg,
        email: msg.email,
        entry_id: entry.id,
        kind: 'create',
      })
    }

    return {
      ok: true,
      entry,
      occur: [occur],
    }
  }


  // Create if not exists, otherwise return match
  // Most useful for mode=multi 
  async function msgEnsureEntry(this: any, msg: any) {
    const seneca = this

    let user_id = msg.user_id
    let kind = msg.kind || 'standard'
    let peg = msg.peg

    let entry = await seneca.entity('refer/entry').load$({
      user_id,
      kind,
      peg,
    })

    let out

    if (null == entry) {
      let createMsg = { ...msg, create: 'entry' }
      delete createMsg.ensure
      out = await seneca.post(createMsg)
    }
    else {
      out = {
        ok: true,
        entry,
        occur: [],
      }
    }

    return out
  }


  async function msgAcceptEntry(this: any, msg: any) {
    const seneca = this

    const entry = await seneca.entity('refer/entry').load$({ key: msg.key })

    if (!entry) {
      return {
        ok: false,
        why: 'entry-unknown',
      }
    }

    let lostOccur = await this.entity('refer/occur').load$({
      entry_id: entry.id,
      kind: 'lost',
    })

    if (lostOccur) {
      return {
        ok: false,
        why: 'entry-lost',
      }
    }

    const occur = await seneca.entity('refer/occur').save$({
      user_id: msg.user_id,
      entry_kind: entry.kind,
      email: entry.email,
      entry_id: entry.id,
      kind: 'accept',
    })

    return {
      ok: true,
      entry,
      occur: [occur],
    }
  }

  async function msgLostEntry(this: any, msg: any) {
    const seneca = this

    const occurList = await seneca.entity('refer/occur').list$({
      email: msg.email,
      kind: 'create',
    })

    const unacceptedReferrals = occurList.filter(
      (occur: any) => occur.user_id !== msg.userWinner
    )

    for (let i = 0; i < unacceptedReferrals.length; i++) {
      await seneca.entity('refer/occur').save$({
        user_id: unacceptedReferrals[i].user_id,
        entry_kind: unacceptedReferrals[i].entry_kind,
        email: msg.email,
        entry_id: unacceptedReferrals[i].entry_id,
        kind: 'lost',
      })
    }
  }

  async function msgRewardEntry(this: any, msg: any) {
    const seneca = this

    const entry = await seneca.entity('refer/occur').load$({
      entry_id: msg.entry_id,
    })

    let reward = await this.entity('refer/reward').load$({
      entry_id: entry.id,
    })

    if (!reward) {
      reward = seneca.make('refer/reward', {
        entry_id: msg.entry_id,
        entry_kind: msg.entry_kind,
        kind: msg.kind,
        award: msg.award,
      })
      reward[msg.field] = 0
    }

    reward[msg.field] = reward[msg.field] + 1

    await reward.save$()
  }

  async function msgLoadRules(this: any, msg: any) {
    const seneca = this

    const rules = await seneca.entity('refer/rule').list$()

    // TODO: handle rule updates?
    // TODO: create a @seneca/rule plugin? later!

    for (let rule of rules) {
      if (rule.ent) {
        const subpat = generateSubPat(seneca, rule)

        seneca.sub(subpat, function(this: any, msg: any) {
          if (rule.where.kind === 'create') {
            rule.call.forEach((callmsg: any) => {
              // TODO: use https://github.com/rjrodger/inks
              callmsg.toaddr = msg.ent.email
              callmsg.fromaddr = 'invite@example.com'

              this.act(callmsg)
            })
          }
        })

        seneca.sub(subpat, function(this: any, msg: any) {
          if (rule.where.kind === 'accept') {
            rule.call.forEach((callmsg: any) => {
              callmsg.ent = seneca.entity(rule.ent)
              callmsg.entry_id = msg.q.entry_id
              callmsg.entry_kind = msg.q.entry_kind

              this.act(callmsg)
            })
          }
        })

        seneca.sub(subpat, function(this: any, msg: any) {
          if (rule.where.kind === 'lost' && msg.q.kind === 'accept') {
            rule.call.forEach((callmsg: any) => {
              callmsg.ent = seneca.entity(rule.ent)
              callmsg.email = msg.q.email
              callmsg.userWinner = msg.q.user_id
              this.act(callmsg)
            })
          }
        })
      }
      // else ignore as not yet implemented
    }
  }

  async function prepare(this: any) {
    const seneca = this
    await seneca.post('biz:refer,load:rules')
  }

  function generateSubPat(seneca: any, rule: any): object {
    const ent = seneca.entity(rule.ent)
    const canon = ent.canon$({ object: true })
    Object.keys(canon).forEach((key) => {
      if (!canon[key]) {
        delete canon[key]
      }
    })

    return {
      role: 'entity',
      cmd: rule.cmd,
      q: rule.where,
      ...canon,
      out$: true,
    }
  }
}

type ReferOptions = {
  debug?: boolean
}

// Default options.
const defaults: ReferOptions = {
  // TODO: Enable debug logging
  debug: false,
}

Object.assign(refer, { defaults })

export default refer

if ('undefined' !== typeof module) {
  module.exports = refer
}
