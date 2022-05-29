export default {
  print: false,
  pattern: 'biz:refer',
  allow: { missing: true },

  calls: [
    // Create referral
    {
      print: true,
      name: 'create-alice',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01', // _id suffix for foreign keys
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

    // Create referral 3
    {
      print: true,
      name: 'create-alice3',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice3@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01', // _id suffix for foreign keys
          kind: 'special',
          email: 'alice3@example.com',
        },
        occur: [
          {
            user_id: 'u01',
            entry_kind: 'special',
            kind: 'create',
            email: 'alice3@example.com',
          },
        ],
      },
    },

    // Accept the referral
    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice:out.entry.key`',
        user_id: 'u01',
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
            entry_kind: 'special',
            entry_id: '`create-alice:out.entry.id`',
            email: 'alice@example.com',
            user_id: 'u01',
            kind: 'accept',
          },
        ],
      },
    },

    // Create the referral2
    {
      print: true,
      name: 'create-alice2',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice2@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01', // _id suffix for foreign keys
          kind: 'special',
          email: 'alice2@example.com',
        },
        occur: [
          {
            user_id: 'u01',
            entry_kind: 'special',
            kind: 'create',
            email: 'alice2@example.com',
          },
        ],
      },
    },

    // Accept the referral2
    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice2:out.entry.key`',
        user_id: 'u01',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01',
          kind: 'special',
          email: 'alice2@example.com',
        },
        occur: [
          {
            entry_kind: 'special',
            entry_id: '`create-alice2:out.entry.id`',
            email: 'alice2@example.com',
            user_id: 'u01',
            kind: 'accept',
          },
        ],
      },
    },

    // Create the referral4
    {
      print: true,
      name: 'create-alice4',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice4@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01', // _id suffix for foreign keys
          kind: 'special',
          email: 'alice4@example.com',
        },
        occur: [
          {
            user_id: 'u01',
            entry_kind: 'special',
            kind: 'create',
            email: 'alice4@example.com',
          },
        ],
      },
    },

    // Accept the referral4
    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice4:out.entry.key`',
        user_id: 'u01',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01',
          kind: 'special',
          email: 'alice4@example.com',
        },
        occur: [
          {
            entry_kind: 'special',
            entry_id: '`create-alice4:out.entry.id`',
            email: 'alice4@example.com',
            user_id: 'u01',
            kind: 'accept',
          },
        ],
      },
    },

    // Create the referral5 for user 2
    {
      print: true,
      name: 'create-alice5',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u02', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice5@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u02', // _id suffix for foreign keys
          kind: 'special',
          email: 'alice5@example.com',
        },
        occur: [
          {
            user_id: 'u02',
            entry_kind: 'special',
            kind: 'create',
            email: 'alice5@example.com',
          },
        ],
      },
    },

    // Accept the referral 5
    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice5:out.entry.key`',
        user_id: 'u02',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u02',
          kind: 'special',
          email: 'alice5@example.com',
        },
        occur: [
          {
            entry_kind: 'special',
            entry_id: '`create-alice5:out.entry.id`',
            email: 'alice5@example.com',
            user_id: 'u02',
            kind: 'accept',
          },
        ],
      },
    },

    // Validate double award more than 3 referrals
    {
      print: true,
      name: 'create-alice6',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice6@example.com',
      },
    },

    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice6:out.entry.key`',
        user_id: 'u01',
      },
    },

    {
      print: true,
      name: 'create-alice7',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice7@example.com',
      },
    },

    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice7:out.entry.key`',
        user_id: 'u01',
      },
    },

    {
      print: true,
      name: 'create-alice8',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice8@example.com',
      },
    },

    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice8:out.entry.key`',
        user_id: 'u01',
      },
    },

    {
      print: true,
      name: 'create-alice9',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice9@example.com',
      },
    },

    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice9:out.entry.key`',
        user_id: 'u01',
      },
    },

    {
      print: true,
      name: 'create-alice10',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice10@example.com',
      },
    },

    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice10:out.entry.key`',
        user_id: 'u01',
      },
    },

    // {
    //   print: true,
    //   pattern: 'biz:null,role:entity,base:refer,name:reward,cmd:list',
    //   out: [
    //     {
    //       user_id: 'u01',
    //       count: 1,
    //       remaining: 9,
    //     },
    //     {
    //       user_id: 'u01',
    //       count: 2,
    //       remaining: 8,
    //     },
    //     {
    //       user_id: 'u01',
    //       count: 3,
    //       prize: 1,
    //       remaining: 7,
    //     },
    //     {
    //       user_id: 'u02',
    //       count: 1,
    //       remaining: 9,
    //     },
    //     {
    //       user_id: 'u01',
    //       count: 4,
    //       prize: 3,
    //       remaining: 6,
    //     },
    //     {
    //       user_id: 'u01',
    //       count: 5,
    //       prize: 5,
    //       remaining: 5,
    //     },
    //     {
    //       user_id: 'u01',
    //       count: 6,
    //       prize: 7,
    //       remaining: 4,
    //     },
    //     {
    //       user_id: 'u01',
    //       count: 7,
    //       prize: 9,
    //       remaining: 3,
    //     },
    //     {
    //       user_id: 'u01',
    //       count: 8,
    //       prize: 11,
    //       remaining: 2,
    //     },
    //   ],
    // },
  ],
}
