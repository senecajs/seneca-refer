"use strict";
/* Copyright © 2022 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
function refer(options) {
    const seneca = this;
    seneca
        .fix('biz:refer')
        .message('create:entry', actCreateEntry);
    async function actCreateEntry(msg) {
        return {
            ok: true,
        };
    }
    return {};
}
// Default options.
const defaults = {
    // TODO: Enable debug logging
    debug: false
};
Object.assign(refer, { defaults });
exports.default = refer;
if ('undefined' !== typeof (module)) {
    module.exports = refer;
}
//# sourceMappingURL=refer.js.map