/* Copyright © 2022 Seneca Project Contributors, MIT License. */


function refer(this: any, options: any) {
  const seneca: any = this

  seneca
    .fix('biz:refer')
    .message('create:entry', actCreateEntry)


  async function actCreateEntry(this: any, msg: any) {
    return {
      ok: true,
    }
  }


  return {
  }
}


type ReferOptions = {
  debug?: boolean
}


// Default options.
const defaults: ReferOptions = {

  // TODO: Enable debug logging
  debug: false
}


Object.assign(refer, { defaults })

export default refer

if ('undefined' !== typeof (module)) {
  module.exports = refer
}
