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
  ],
}
