export default {
  print: false,
  pattern: 'biz:refer',
  allow: { missing: true },

  calls: [
    // Creating: refer/entry referral record for u01
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

    // Creating: refer/entry referral record for u02
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

    // Accept the referral 1
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

    // Create refer/entry  referral record 3 from u01 and accept
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

    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice3:out.entry.key`',
        user_id: 'u01',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01',
          kind: 'special',
          email: 'alice3@example.com',
        },
        occur: [
          {
            entry_kind: 'special',
            entry_id: '`create-alice3:out.entry.id`',
            email: 'alice3@example.com',
            user_id: 'u01',
            kind: 'accept',
          },
        ],
      },
    },

    // Create refer/entry  referral record 4 from u01 and accept
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

    // Create refer/entry  referral record 5 from u02 and accept
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

    //Validate the remaining is properly updated
    {
      print: true,
      pattern: 'biz:null,role:entity,base:refer,name:reward,cmd:list',
      out: [
        {
          remaining: 4,
        },
        {
          remaining: 3,
        },
        {
          remaining: 2,
        },
        {
          remaining: 4,
        },
      ],
    },

    // Validate referrals aren't accept above the limit
    {
      print: false,
      name: 'create-alice6',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice6@example.com',
      },
    },

    {
      print: false,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice6:out.entry.key`',
        user_id: 'u01',
      },
    },

    {
      print: false,
      name: 'create-alice7',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice7@example.com',
      },
    },

    {
      print: false,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice7:out.entry.key`',
        user_id: 'u01',
      },
    },

    {
      print: false,
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
      out: {
        ok: false,
        why: 'limit-exceed',
      },
    },
  ],
}
