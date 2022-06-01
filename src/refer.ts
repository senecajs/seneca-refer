/* Copyright © 2022 Seneca Project Contributors, MIT License. */

function refer(this: any, options: any) {
  const seneca: any = this

  seneca
    .fix('biz:refer')
    .message('create:entry', actCreateEntry)
    .message('accept:entry', actAcceptEntry)
    .message('lost:entry', actLostEntry)
    .message('give:award', actRewardEntry)
    .message('give:award,set:prize', actRewardPrizeEntry)
    .message('give:award,set:prize,reward:extra', actRewardPrizeExtraEntry)
    .message('load:rules', actLoadRules)
    .prepare(prepare)

  async function actCreateEntry(this: any, msg: any) {
    const seneca = this

    let occur = await seneca.entity('refer/occur').load$({
      email: msg.email,
      kind: 'accept',
    })

    if (occur) {
      return {
        ok: false,
        why: 'entry-exists',
      }
    }

    const entry = await seneca.entity('refer/entry').save$({
      user_id: msg.user_id,
      kind: msg.kind,
      email: msg.email,

      // TODO: use a longer key!
      key: this.util.Nid(), // unique key for this referral, used for validation
    })

    occur = await seneca.entity('refer/occur').save$({
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

    const rewardList = await seneca.entity('refer/reward').list$({
      user_id: msg.user_id,
      entry_kind: entry.kind,
    })

    if (rewardList.length > 0) {
      const lastReward = rewardList[rewardList.length - 1]

      if (lastReward.remaining === 0) {
        return {
          ok: false,
          why: 'limit-exceed',
        }
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

  async function actRewardEntry(this: any, msg: any) {
    const seneca = this

    const rewardList = await seneca.entity('refer/reward').list$({
      user_id: msg.user_id,
      entry_kind: msg.entry_kind,
    })

    let reward = seneca.make('refer/reward', {
      entry_id: msg.entry_id,
      entry_kind: msg.entry_kind,
      kind: msg.kind,
      email: msg.email,
      award: msg.award,
      user_id: msg.user_id,
    })

    if (rewardList.length === 0) {
      reward[msg.field] = 1
      reward['remaining'] = msg.limit - reward[msg.field]
    } else {
      const amountIncreased = rewardList[rewardList.length - 1][msg.field]
      reward[msg.field] = amountIncreased + 1
      reward['remaining'] = msg.limit - reward[msg.field]
    }

    await reward.save$()

    await seneca.act('biz:refer,give:award,set:prize', msg)
  }

  async function actRewardPrizeEntry(this: any, msg: any) {
    const seneca = this

    const reward = await seneca.entity('refer/reward').load$({
      entry_id: msg.entry_id,
    })

    if (reward.count < msg.goal) {
      return
    }

    await reward.save$({
      prize: msg.prize,
    })

    if (reward.count === msg.goal) {
      return
    }

    await seneca.act('biz:refer,give:award,set:prize,reward:extra', msg)
  }

  async function actRewardPrizeExtraEntry(this: any, msg: any) {
    const seneca = this

    if (msg.sort != 'goal') {
      return
    }

    const rewardList = await seneca.entity('refer/reward').list$({
      user_id: msg.user_id,
      entry_kind: msg.entry_kind,
    })

    const reward = await seneca.entity('refer/reward').load$({
      entry_id: msg.entry_id,
    })

    let extra = 0

    for (let i = msg.goal; i < rewardList.length; i++) {
      extra++
      await reward.save$({
        extra: extra * msg.extra,
      })
    }
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
          if (rule.where.kind === 'accept' && msg.q.kind === 'accept') {
            if (rule.where.entry_kind === msg.q.entry_kind) {
              rule.call.forEach((callmsg: any) => {
                callmsg.ent = seneca.entity(rule.ent)
                callmsg.entry_id = msg.q.entry_id
                callmsg.entry_kind = msg.q.entry_kind
                callmsg.user_id = msg.q.user_id
                callmsg.email = msg.q.email

                this.act(callmsg)
              })
            }
          }
        })

        seneca.sub(subpat, function (this: any, msg: any) {
          if (rule.where.kind === 'lost' && msg.ent.kind === 'accept') {
            rule.call.forEach((callmsg: any) => {
              callmsg.ent = seneca.entity(rule.ent)
              callmsg.email = msg.ent.email
              callmsg.userWinner = msg.ent.user_id
              this.act(callmsg)
            })
          }
        })

        seneca.sub(subpat, function (this: any, msg: any) {
          if (rule.where.kind === 'prize' && msg.ent.kind === 'accept') {
            rule.call.forEach((callmsg: any) => {
              callmsg.user_id = msg.ent.user_id
              callmsg.entry_kind = rule.where.user_id
              callmsg.entry_id = msg.ent.entry_id
              callmsg.entry_kind = this.act(callmsg)
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
