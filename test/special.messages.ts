export default {
  print: false,
  pattern: 'biz:refer',
  allow: { missing: true },

  calls: [
    {
      print: true,
      name: 'create-alice',
      pattern: 'create:entry',
      params: {
        user_id: 'u01',
        kind: 'special',
        email: 'alice@example.com',
        limit: 200,
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01',
          kind: 'special',
          email: 'alice@example.com',
        },
        occur: [
          {
            user_id: 'u01',
            entry_kind: 'special',
            kind: 'create',
            email: 'alice@example.com',
          },
        ],
      },
    },

    // // Validate the refer/entry exists and is correct
    // {
    //   print: true,
    //   pattern: 'biz:null,role:entity,base:refer,name:entry,cmd:list',
    //   out: [
    //     {
    //       id: '`create-alice:out.entry.id`',
    //       user_id: 'u01',
    //       kind: 'standard',
    //       email: 'alice@example.com',
    //     },
    //   ],
    // },
    //
    // // Validate the refer/occur exists and is correct
    // {
    //   pattern: 'biz:null,role:entity,base:refer,name:occur,cmd:list',
    //   out: [
    //     {
    //       // back references, see: https://github.com/rjrodger/inks
    //       id: '`create-alice:out.occur[0].id`',
    //       entry_id: '`create-alice:out.entry.id`',
    //       entry_kind: 'standard',
    //       kind: 'create',
    //       email: 'alice@example.com',
    //     },
    //   ],
    // },
    //
    // // Validate email was 'sent' (uses mock entity)
    // {
    //   pattern: 'biz:null,role:entity,base:mock,name:email,cmd:list',
    //   out: [
    //     {
    //       toaddr: 'alice@example.com',
    //       fromaddr: 'invite@example.com',
    //       kind: 'refer',
    //       code: 'invite',
    //     },
    //   ],
    // },
    //
    // // Accept the referral
    // {
    //   print: true,
    //   name: 'accept-alice',
    //   pattern: 'accept:entry',
    //   params: {
    //     key: '`create-alice:out.entry.key`',
    //     user_id: 'u01',
    //   },
    //   out: {
    //     ok: true,
    //     entry: {
    //       user_id: 'u01',
    //       kind: 'standard',
    //       email: 'alice@example.com',
    //     },
    //     occur: [
    //       {
    //         entry_kind: 'standard',
    //         entry_id: '`create-alice:out.entry.id`',
    //         email: 'alice@example.com',
    //         user_id: 'u01',
    //         kind: 'accept',
    //       },
    //     ],
    //   },
    // },
    // // Validate new refer/occur record
    // {
    //   print: true,
    //   pattern: 'biz:null,role:entity,base:refer,name:occur,cmd:load',
    //   params: { q: { kind: 'accept' } },
    //   out: {
    //     entry_kind: 'standard',
    //     entry_id: '`create-alice:out.entry.id`',
    //     email: 'alice@example.com',
    //     user_id: 'u01',
    //     kind: 'accept',
    //   },
    // },
    //
    // // Validate new refer/reward updated
    // {
    //   print: true,
    //   pattern: 'biz:null,role:entity,base:refer,name:reward,cmd:load',
    //   params: {
    //     q: {
    //       entry_id: '`create-alice:out.entry.id`',
    //     },
    //   },
    //   out: {
    //     entry_id: '`create-alice:out.entry.id`',
    //     entry_kind: 'standard',
    //     kind: 'accept',
    //     award: 'incr',
    //     count: 1, // alice@example.com accepted
    //   },
    // },
    //
    // // Check return for invalid entry key
    // {
    //   print: true,
    //   name: 'accept-alice',
    //   pattern: 'accept:entry',
    //   params: {
    //     key: '123',
    //   },
    //   out: {
    //     ok: false,
    //     why: 'entry-unknown',
    //   },
    // },
  ],
}

/* ADDITIONAL SCENARIOS
 * Another user send a referral to alice@example.com
 *   - before acceptance
 *   - after acceptance
 */
