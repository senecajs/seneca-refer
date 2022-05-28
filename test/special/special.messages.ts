export default {
  print: false,
  pattern: 'biz:refer',
  allow: { missing: true },

  calls: [
    //Create refer/point row for user
    {
      print: true,
      name: 'create-point',
      pattern: 'create:point',
      params: {
        user_id: 'u01',
        kind: 'special',
        link: 'u01.com',
        vanity_urls: ['myVanityUrl2', 'myOtherVanityUrl2'],
        limit: 3,
      },
      out: {
        ok: true,
        point: {
          user_id: 'u01',
          kind: 'special',
          link: 'u01.com',
          vanity_urls: ['myVanityUrl2', 'myOtherVanityUrl2'],
          limit: 3,
          remaining: 3,
        },
      },
    },
    {
      print: true,
      name: 'create-alice',
      pattern: 'create:entry', // call { biz:refer, create:entry, ...params }
      params: {
        point_id: '`create-point:out.point.id`',
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
  ],
}
