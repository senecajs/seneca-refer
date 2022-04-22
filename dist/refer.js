"use strict";
/* Copyright © 2022 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
function refer(options) {
    const seneca = this;
    seneca
        .fix('biz:refer')
        .message('create:entry', actCreateEntry)
        .message('load:rules', actLoadRules)
        .prepare(prepare);
    async function actCreateEntry(msg) {
        let seneca = this;
        let entry = await seneca.entity('refer/entry').save$({
            user_id: msg.user_id,
            kind: msg.kind,
            email: msg.email,
            // TODO: use a longer key!
            key: this.util.Nid() // unique key for this referral, used for validation
        });
        let occur = await seneca.entity('refer/occur').save$({
            user_id: msg.user_id,
            entry_kind: msg.kind,
            email: msg.email,
            entry_id: entry.id,
            kind: 'create',
        });
        return {
            ok: true,
            entry,
            occur: [occur]
        };
    }
    async function actLoadRules(msg) {
        let seneca = this;
        let rules = await seneca.entity('refer/rule').list$();
        // TODO: handle rule updates?
        // TODO: create a @seneca/rule plugin? later!
        for (let rule of rules) {
            if (rule.ent) {
                let ent = seneca.entity(rule.ent);
                let canon = ent.canon$({ object: true });
                let subpat = {
                    role: 'entity',
                    cmd: rule.cmd,
                    ...canon,
                    out$: true
                };
                seneca.sub(subpat, function (msg) {
                    // TODO: match and 'where' fields
                    if (msg.ent.kind === rule.where.kind) {
                        // TODO: handle more than 1!
                        let callmsg = { ...rule.call[0] };
                        // TODO: use https://github.com/rjrodger/inks
                        callmsg.toaddr = msg.ent.email;
                        callmsg.fromaddr = 'invite@example.com';
                        this.act(callmsg);
                    }
                });
            }
            // else ignore as not yet implemented
        }
    }
    async function prepare() {
        let seneca = this;
        await seneca.post('biz:refer,load:rules');
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