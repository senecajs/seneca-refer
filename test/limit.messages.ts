export default {
  print: false,
  pattern: 'biz:refer',
  allow: { missing: true },

  calls: [
    {
      print: true,
      name: 'create-point',
      pattern: 'create:point',
      params: {
        user_id: 'u01',
        kind: 'standard',
        email: 'u01@example.com',
        link: 'u01.com',
        vanity_urls: ['myVanityUrl', 'myOtherVanityUrl'],
        limit: 2,
      },
      out: {
        ok: true,
        point: {
          user_id: 'u01',
          kind: 'standard',
          email: 'u01@example.com',
          link: 'u01.com',
          vanity_urls: ['myVanityUrl', 'myOtherVanityUrl'],
          limit: 2,
          remaining: 2,
        },
      },
    },
    {
      print: true,
      name: 'create-alice',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01',
        kind: 'standard', // avoid using 'type', 'kind' has fewer conflicts
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
    {
      print: true,
      name: 'create-alice3',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01',
        kind: 'standard', // avoid using 'type', 'kind' has fewer conflicts
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
    {
      print: true,
      name: 'create-alice2',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u01',
        kind: 'standard', // avoid using 'type', 'kind' has fewer conflicts
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
    // Validate the remaining isn't changed if the invite isn't accepted
    {
      print: true,
      pattern: 'biz:null,role:entity,base:refer,name:point,cmd:load',
      params: {
        q: {
          user_id: 'u01',
          kind: 'standard',
        },
      },
      out: {
        remaining: 2,
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
    // Validate the remaining is properly updated
    {
      print: true,
      pattern: 'biz:null,role:entity,base:refer,name:point,cmd:load',
      params: {
        q: {
          user_id: 'u01',
          kind: 'standard',
        },
      },
      out: {
        remaining: 0,
      },
    },
    // Validate referral accept above the limit
    {
      print: true,
      name: 'accept-alice',
      pattern: 'accept:entry',
      params: {
        key: '`create-alice3:out.entry.key`',
        user_id: 'u01',
      },
      out: {
        ok: false,
        why: 'exceed-limit',
      },
    },
  ],
}
