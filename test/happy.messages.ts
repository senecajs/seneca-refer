/* Copyright © 2022 Seneca Project Contributors, MIT License. */

export default {
  print: false,
  pattern: 'biz:refer',
  allow: { missing: true },

  calls: [
    {
      pattern: 'create:entry',
      out: { ok: true },
    }
  ]
}
