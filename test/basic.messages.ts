/* Copyright © 2022 Seneca Project Contributors, MIT License. */

export default {
  print: false,
  pattern: 'biz:refer',
  allow: { missing: true },

  calls: [
    {
      name: 'create-alice',
      pattern: 'create:entry',
      params: {
        user_id: 'u01',
        kind: 'standard',
        email: 'alice@example.com'
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01',
          kind: 'standard',
          email: 'alice@example.com'
        },
        occur: [
          {
            user_id: 'u01',
            entry_kind: 'standard',
            kind: 'create',
            email: 'alice@example.com'
          }
        ]
      },
    },

    // Print entire database
    // { print: true, pattern: 'biz:null,role:mem-store,cmd:dump' },

    {
      pattern: 'biz:null,role:entity,base:refer,name:entry,cmd:list',
      out: [{
        id: '`create-alice:out.entry.id`',
        user_id: 'u01',
        kind: 'standard',
        email: 'alice@example.com'
      }]
    },

    {
      pattern: 'biz:null,role:entity,base:refer,name:occur,cmd:list',
      out: [{
        id: '`create-alice:out.occur[0].id`',
        entry_id: '`create-alice:out.entry.id`',
        entry_kind: 'standard',
        kind: 'create',
        email: 'alice@example.com'
      }]
    },


    {
      pattern: 'biz:null,role:entity,base:mock,name:email,cmd:list',
      out: [{
        toaddr: 'alice@example.com',
        fromaddr: 'invite@example.com',
        kind: 'refer',
        code: 'invite'
      }]
    },



  ]
}
