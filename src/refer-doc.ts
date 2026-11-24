/* Copyright © 2022 Seneca Project Contributors, MIT License. */

// @seneca/doc 9 reads action descriptions from `messages`.
const docs = {
  messages: {
    msgCreateEntry: {
      desc: 'Create referral entry.',
    },
  },
}

export default docs

if ('undefined' !== typeof module) {
  module.exports = docs
}
