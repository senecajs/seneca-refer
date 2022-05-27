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
        kind: 'standard',
        email: 'alice@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01', // _id suffix for foreign keys
          kind: 'standard',
          email: 'alice@example.com',
        },
        occur: [
          {
            user_id: 'u01',
            entry_kind: 'standard',
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
        kind: 'standard',
        email: 'alice3@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01', // _id suffix for foreign keys
          kind: 'standard',
          email: 'alice3@example.com',
        },
        occur: [
          {
            user_id: 'u01',
            entry_kind: 'standard',
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
          kind: 'standard',
          email: 'alice@example.com',
        },
        occur: [
          {
            entry_kind: 'standard',
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
        kind: 'standard',
        email: 'alice2@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01', // _id suffix for foreign keys
          kind: 'standard',
          email: 'alice2@example.com',
        },
        occur: [
          {
            user_id: 'u01',
            entry_kind: 'standard',
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
          kind: 'standard',
          email: 'alice2@example.com',
        },
        occur: [
          {
            entry_kind: 'standard',
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
        kind: 'standard',
        email: 'alice4@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u01', // _id suffix for foreign keys
          kind: 'standard',
          email: 'alice4@example.com',
        },
        occur: [
          {
            user_id: 'u01',
            entry_kind: 'standard',
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
          kind: 'standard',
          email: 'alice4@example.com',
        },
        occur: [
          {
            entry_kind: 'standard',
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
        kind: 'standard',
        email: 'alice5@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u02', // _id suffix for foreign keys
          kind: 'standard',
          email: 'alice5@example.com',
        },
        occur: [
          {
            user_id: 'u02',
            entry_kind: 'standard',
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
          kind: 'standard',
          email: 'alice5@example.com',
        },
        occur: [
          {
            entry_kind: 'standard',
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
          remaining: 2,
        },
        {
          remaining: 1,
        },
        {
          remaining: 0,
        },
        {
          remaining: 2,
        },
      ],
    },

    // Validate referral isn't accepted above the limit
    {
      print: true,
      name: 'create-alice6',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01', // _id suffix for foreign keys
        kind: 'standard',
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
      out: {
        ok: false,
        why: 'limit-exceed',
      },
    },
  ],
}
