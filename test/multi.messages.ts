export default {
  print: false,
  pattern: 'biz:refer',
  allow: { missing: true },
  calls: [
    {
      print: true,
      name: 'create-multiple',
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
      name: 'create-multiple2',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u02',
        kind: 'standard', // avoid using 'type', 'kind' has fewer conflicts
        email: 'johndoe@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u02', // _id suffix for foreign keys
          kind: 'standard',
          email: 'johndoe@example.com',
        },
        occur: [
          {
            user_id: 'u02',
            entry_kind: 'standard',
            kind: 'create',
            email: 'johndoe@example.com',
          },
        ],
      },
    },

    {
      print: true,
      name: 'create-multiple3',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        user_id: 'u03',
        kind: 'standard', // avoid using 'type', 'kind' has fewer conflicts
        email: 'foo@example.com',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u03', // _id suffix for foreign keys
          kind: 'standard',
          email: 'foo@example.com',
        },
        occur: [
          {
            user_id: 'u03',
            entry_kind: 'standard',
            kind: 'create',
            email: 'foo@example.com',
          },
        ],
      },
    },

    // Validate that all refer/entry exists and are correct
    {
      print: true,
      pattern: 'biz:null,role:entity,base:refer,name:entry,cmd:list',
      out: [
        {
          id: '`create-multiple:out.entry.id`',
          user_id: 'u01',
          kind: 'standard',
          email: 'alice@example.com',
        },
        {
          id: '`create-multiple2:out.entry.id`',
          user_id: 'u02',
          kind: 'standard',
          email: 'johndoe@example.com',
        },
        {
          id: '`create-multiple3:out.entry.id`',
          user_id: 'u03',
          kind: 'standard',
          email: 'foo@example.com',
        },
      ],
    },

    // Validate that all refer/occur exists and are correct
    {
      pattern: 'biz:null,role:entity,base:refer,name:occur,cmd:list',
      out: [
        {
          id: '`create-multiple:out.occur[0].id`',
          entry_id: '`create-multiple:out.entry.id`',
          entry_kind: 'standard',
          kind: 'create',
          email: 'alice@example.com',
        },
        {
          id: '`create-multiple2:out.occur[0].id`',
          entry_id: '`create-multiple2:out.entry.id`',
          entry_kind: 'standard',
          kind: 'create',
          email: 'johndoe@example.com',
        },
        {
          id: '`create-multiple3:out.occur[0].id`',
          entry_id: '`create-multiple3:out.entry.id`',
          entry_kind: 'standard',
          kind: 'create',
          email: 'foo@example.com',
        },
      ],
    },

    // Validate all email were 'sent' (uses mock entity)
    {
      pattern: 'biz:null,role:entity,base:mock,name:email,cmd:list',
      out: [
        {
          toaddr: 'alice@example.com',
          fromaddr: 'invite@example.com',
          kind: 'refer',
          code: 'invite',
        },
        {
          toaddr: 'johndoe@example.com',
          fromaddr: 'invite@example.com',
          kind: 'refer',
          code: 'invite',
        },
        {
          toaddr: 'foo@example.com',
          fromaddr: 'invite@example.com',
          kind: 'refer',
          code: 'invite',
        },
      ],
    },

    // Accept all referrals
    {
      print: true,
      name: 'accept-multiple',
      pattern: 'accept:entry',
      params: {
        key: '`create-multiple:out.entry.key`',
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
            entry_id: '`create-multiple:out.entry.id`',
            email: 'alice@example.com',
            user_id: 'u01',
            kind: 'accept',
          },
        ],
      },
    },

    {
      print: true,
      name: 'accept-multiple',
      pattern: 'accept:entry',
      params: {
        key: '`create-multiple2:out.entry.key`',
        user_id: 'u02',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u02',
          kind: 'standard',
          email: 'johndoe@example.com',
        },
        occur: [
          {
            entry_kind: 'standard',
            entry_id: '`create-multiple2:out.entry.id`',
            email: 'johndoe@example.com',
            user_id: 'u02',
            kind: 'accept',
          },
        ],
      },
    },

    {
      print: true,
      name: 'accept-multiple',
      pattern: 'accept:entry',
      params: {
        key: '`create-multiple3:out.entry.key`',
        user_id: 'u03',
      },
      out: {
        ok: true,
        entry: {
          user_id: 'u03',
          kind: 'standard',
          email: 'foo@example.com',
        },
        occur: [
          {
            entry_kind: 'standard',
            entry_id: '`create-multiple3:out.entry.id`',
            email: 'foo@example.com',
            user_id: 'u03',
            kind: 'accept',
          },
        ],
      },
    },

    // Validate new refer/occur records
    {
      print: true,
      pattern: 'biz:null,role:entity,base:refer,name:occur,cmd:list',
      params: { q: { kind: 'accept' } },
      out: [
        {
          entry_kind: 'standard',
          entry_id: '`create-multiple:out.entry.id`',
          email: 'alice@example.com',
          user_id: 'u01',
          kind: 'accept',
        },
        {
          entry_kind: 'standard',
          entry_id: '`create-multiple2:out.entry.id`',
          email: 'johndoe@example.com',
          user_id: 'u02',
          kind: 'accept',
        },
        {
          entry_kind: 'standard',
          entry_id: '`create-multiple3:out.entry.id`',
          email: 'foo@example.com',
          user_id: 'u03',
          kind: 'accept',
        },
      ],
    },

    // Validate new all refer/reward updated
    {
      print: true,
      pattern: 'biz:null,role:entity,base:refer,name:reward,cmd:list',
      out: [
        {
          entry_id: '`create-multiple:out.entry.id`',
          entry_kind: 'standard',
          kind: 'accept',
          award: 'incr',
          count: 1,
        },
        {
          entry_id: '`create-multiple2:out.entry.id`',
          entry_kind: 'standard',
          kind: 'accept',
          award: 'incr',
          count: 1,
        },
        {
          entry_id: '`create-multiple3:out.entry.id`',
          entry_kind: 'standard',
          kind: 'accept',
          award: 'incr',
          count: 1,
        },
      ],
    },
  ],
}
