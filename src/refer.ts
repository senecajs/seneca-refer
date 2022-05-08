/* Copyright © 2022 Seneca Project Contributors, MIT License. */

function refer(this: any, options: any) {
  const seneca: any = this

  seneca
    .fix('biz:refer')
    .message('create:entry', actCreateEntry)
    .message('accept:entry', actAcceptEntry)
    .message('give:award', actRewardEntry)
    .message('load:rules', actLoadRules)
    .prepare(prepare)

  async function actCreateEntry(this: any, msg: any) {
    const seneca = this

    const entry = await seneca.entity('refer/entry').save$({
      user_id: msg.user_id,
      kind: msg.kind,
      email: msg.email,

      // TODO: use a longer key!
      key: this.util.Nid(), // unique key for this referral, used for validation
    })

    const occur = await seneca.entity('refer/occur').save$({
      user_id: msg.user_id,
      entry_kind: msg.kind,
      email: msg.email,
      entry_id: entry.id,
      kind: 'create',
    })

    return {
      ok: true,
      entry,
      occur: [occur],
    }
  }

  async function actAcceptEntry(this: any, msg: any) {
    const seneca = this

    const entry = await seneca.entity('refer/entry').load$({ key: msg.key })

    if (!entry) {
      return {
        ok: false,
        error: 'No entry found with this key',
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

  async function actLoadRules(this: any, msg: any) {
    const seneca = this

    const rules = await seneca.entity('refer/rule').list$()

    // TODO: handle rule updates?
    // TODO: create a @seneca/rule plugin? later!

    for (let rule of rules) {
      if (rule.ent) {
        const ent = seneca.entity(rule.ent)
        const canon = ent.canon$({ object: true })
        delete canon['zone']
        const subpat = {
          role: 'entity',
          cmd: rule.cmd,
          q: rule.where,
          ...canon,
          out$: true,
        }

        seneca.sub(subpat, function (this: any, msg: any) {
          if (rule.where.kind === 'create') {
            // TODO: handle more than 1!
            const callmsg = { ...rule.call[0] }

            // TODO: use https://github.com/rjrodger/inks
            callmsg.toaddr = msg.ent.email
            callmsg.fromaddr = 'invite@example.com'

            this.act(callmsg)
          }
        })

        seneca.sub(subpat, function (this: any, msg: any) {
          if (rule.where.kind === 'accept') {
            const callmsg = {
              ...rule.call[0],
              ent: ent,
              entry_id: msg.q.entry_id,
              entry_kind: msg.q.entry_kind,
            }
            this.act(callmsg)
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
