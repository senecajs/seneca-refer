/* Copyright © 2022 Seneca Project Contributors, MIT License. */


import Seneca from 'seneca'
import SenecaMsgTest from 'seneca-msg-test'
import { Maintain } from '@seneca/maintain'



import Refer from '..'

import HappyMessages from './happy.messages'


describe('refer', () => {

  test('happy', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use(Refer)
    await seneca.ready()
  })


  test('messages-happy', async () => {
    const seneca = await makeSeneca()
    await (SenecaMsgTest(seneca, HappyMessages)())
  })


  test('maintain', Maintain)
})



async function makeSeneca() {
  const seneca = Seneca({ legacy: false })
    .test()
    .use('promisify')
    .use(Refer)

  makeBasicRules(seneca)


  await seneca.ready()
  return seneca
}



async function makeBasicRules(seneca: any) {


}
