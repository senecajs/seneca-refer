/* Copyright © 2022 Seneca Project Contributors, MIT License. */


import Seneca from 'seneca'
import SenecaMsgTest from 'seneca-msg-test'
// import { Maintain } from '@seneca/maintain'



import Refer from '..'

// import BasicMessages from './basic.messages'


describe('refer', () => {

  test('happy', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use(Refer)
    await seneca.ready()
  })


  // test('basic.messages', async () => {
  //   const seneca = await makeSeneca()
  //   await (SenecaMsgTest(seneca, BasicMessages)())
  // })


  // test('maintain', Maintain)
})



async function makeSeneca() {
  const seneca = Seneca({ legacy: false })
    .test()
    .use('promisify')
    .use('entity')
    .use('entity-util', { when: { active: true } })

  await makeBasicRules(seneca)

  seneca
    .use(Refer)

  await makeMockActions(seneca)

  // print all message patterns
  // console.log(seneca.list())

  return seneca.ready()
}



async function makeBasicRules(seneca: any) {
  await seneca.entity('refer/rule').save$({
    ent: 'refer/occur',
    cmd: 'save',
    where: { kind: 'create' },
    call: [{
      sys: 'email',
      send: 'email',
      fromaddr: '`config:sender.invite.email`',
      subject: '`config:sender.invite.subject`',
      toaddr: '`occur:sender.invite.subject`',
      code: 'invite',
      kind: 'refer',
    }]
  })
}


async function makeMockActions(seneca: any) {
  seneca.message(
    'sys:email,send:email,toaddr:alice@example.com',
    async function(msg: any) {
      this.entity('mock/email').save$({
        toaddr: msg.toaddr,
        fromaddr: msg.fromaddr,
        subject: msg.subject,
        kind: msg.kind,
        code: msg.code,
        what: 'sent',
      })
    })
}
