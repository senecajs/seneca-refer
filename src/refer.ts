/* Copyright © 2022 Seneca Project Contributors, MIT License. */

function refer(this: any, options: any) {
  const seneca: any = this

  seneca
    .fix('biz:refer')
    .message('create:point', actCreatePoint)
    .message('create:entry', actCreateEntry)
    .message('accept:entry', actAcceptEntry)
    .message('lost:entry', actLostEntry)
    .message('give:award', actRewardEntry)
    .message('update:point', actUpdatePoint)
    .message('load:rules', actLoadRules)
    .prepare(prepare)

  async function actCreatePoint(this: any, msg: any) {
    const seneca = this

    const point = await seneca.entity('refer/point').save$({
      user_id: msg.user_id,
      kind: msg.kind,
      email: msg.email,
      link: msg.link,
      vanity_urls: msg.vanity_urls,
      limit: msg.limit,
      remaining: msg.limit,
    })

    return {
      ok: true,
      point,
    }
  }

  async function actCreateEntry(this: any, msg: any) {
    const seneca = this
    let occur = await seneca.entity('refer/occur').load$({
      email: msg.email,
      kind: 'accept',
    })
    if (!occur) {
      let point = await seneca.entity('refer/point').load$({
        user_id: msg.user_id,
        kind: msg.kind,
      })

      if (point.remaining <= point.limit && point.remaining != 0) {
        const entry = await seneca.entity('refer/entry').save$({
          user_id: msg.user_id,
          kind: msg.kind,
          email: msg.email,
          limit: msg.limit,

          // TODO: use a longer key!
          key: this.util.Nid(), // unique key for this referral, used for validation
        })

        occur = await seneca.entity('refer/occur').save$({
          user_id: msg.user_id,
          entry_kind: msg.kind,
          email: msg.email,
          entry_id: entry.id,
          entry_limit: msg.limit,
          remaining: msg.limit,
          kind: 'create',
        })

        return {
          ok: true,
          entry,
          occur: [occur],
        }
      }
    }
    return {
      ok: false,
      why: 'entry-invalid',
      details: {
        why_exactly: 'entry already a user',
      },
    }
  }

  async function actAcceptEntry(this: any, msg: any) {
    const seneca = this

    const entry = await seneca.entity('refer/entry').load$({ key: msg.key })

    if (!entry) {
      return {
        ok: false,
        why: 'entry-unknown',
      }
    }

    const { remaining } = await seneca
      .entity('refer/point')
      .load$({ user_id: entry.user_id, kind: entry.entry_kind })

    if (remaining === 0) {
      return {
        ok: false,
        why: 'exceed-limit',
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

  async function actLostEntry(this: any, msg: any) {
    const seneca = this

    const entryList = await seneca.entity('refer/occur').list$({
      email: msg.email,
      kind: 'create',
    })
    entryList.forEach((entry: any) => {
      if (entry.user_id === msg.userWinner) {
        return
      }
      seneca.entity('refer/occur').save$({
        user_id: entry.user_id,
        entry_kind: entry.entry_kind,
        email: msg.email,
        entry_id: entry.entry_id,
        kind: 'lost',
      })
    })
  }

  async function actRewardEntry(this: any, msg: any) {
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

  async function actUpdatePoint(this: any, msg: any) {
    const seneca = this

    const point = await seneca.entity('refer/point').load$({
      user_id: msg.user_id,
      kind: msg.entry_kind,
    })

    if (point.remaining === 0) return

    await point.save$({
      remaining: point.remaining - 1,
    })
  }

  async function actLoadRules(this: any, msg: any) {
    const seneca = this

    const rules = await seneca.entity('refer/rule').list$()

    // TODO: handle rule updates?
    // TODO: create a @seneca/rule plugin? later!

    for (let rule of rules) {
      if (rule.ent) {
        const subpat = generateSubPat(seneca, rule)

        seneca.sub(subpat, function (this: any, msg: any) {
          if (rule.where.kind === 'create') {
            rule.call.forEach((callmsg: any) => {
              // TODO: use https://github.com/rjrodger/inks
              callmsg.toaddr = msg.ent.email
              callmsg.fromaddr = 'invite@example.com'

              this.act(callmsg)
            })
          }
        })

        seneca.sub(subpat, function (this: any, msg: any) {
          if (rule.where.kind === 'accept') {
            rule.call.forEach((callmsg: any) => {
              callmsg.ent = seneca.entity(rule.ent)
              callmsg.entry_id = msg.q.entry_id
              callmsg.entry_kind = msg.q.entry_kind

              this.act(callmsg)
            })
          }
        })
        seneca.sub(subpat, function (this: any, msg: any) {
          if (rule.where.kind === 'lost' && msg.q.kind === 'accept') {
            rule.call.forEach((callmsg: any) => {
              callmsg.ent = seneca.entity(rule.ent)
              callmsg.email = msg.q.email
              callmsg.userWinner = msg.q.user_id
              this.act(callmsg)
            })
          }
        })
        seneca.sub(subpat, function (this: any, msg: any) {
          if (rule.where.kind === 'limit' && msg.q.kind === 'accept') {
            rule.call.forEach((callmsg: any) => {
              callmsg.ent = seneca.entity(rule.ent)
              callmsg.user_id = msg.q.user_id
              callmsg.entry_kind = msg.q.entry_kind
              callmsg.entry_id = msg.q.entry_id
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
