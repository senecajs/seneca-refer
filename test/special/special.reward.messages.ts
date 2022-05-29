export default {
  print: false,
  pattern: 'biz:refer',
  allow: { missing: true },

  calls: [
    // Create referral and accept
    {
      print: true,
      name: 'create-alice',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice@example.com',
      },
    },

    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice:out.entry.key`',
        user_id: 'u01',
      },
    },

    // Create referral and accept2
    {
      print: true,
      name: 'create-alice2',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice2@example.com',
      },
    },

    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice2:out.entry.key`',
        user_id: 'u01',
      },
    },

    // Create referral and accept3
    {
      print: true,
      name: 'create-alice3',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice3@example.com',
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
    },

    // Create referral and accept4
    {
      print: true,
      name: 'create-alice4',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice4@example.com',
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
    },

    // Create referral and accept5
    {
      print: true,
      name: 'create-alice5',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'special',
        email: 'alice5@example.com',
      },
    },

    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice5:out.entry.key`',
        user_id: 'u01',
      },
    },

    {
      print: true,
      pattern: 'biz:null,role:entity,base:refer,name:reward,cmd:list',
      out: [
        {
          user_id: 'u01',
          count: 1,
          remaining: 4,
        },
        {
          user_id: 'u01',
          count: 2,
          remaining: 3,
        },
        {
          user_id: 'u01',
          count: 3,
          prize: 1,
          remaining: 2,
        },
        {
          user_id: 'u01',
          count: 4,
          prize: 1,
          extra: 1,
          remaining: 1,
        },
        {
          user_id: 'u01',
          count: 5,
          prize: 1,
          extra: 2,
          remaining: 0,
        },
      ],
    },
  ],
}
