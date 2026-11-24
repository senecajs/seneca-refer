# Changes

## 0.7.0 2026-11-21

First entry of this change log. Earlier versions are on npm and in the git
history.

* Seneca 4: the peer dependency is `seneca` `^4.0.0` (was `>=3`). Seneca 3
  users stay on `@seneca/refer@0.6`.
* The entity peer dependency is `@seneca/entity` `^29.0.0` (was
  `seneca-entity` `>=18`). The old peer made npm install `seneca-entity` 28,
  which stops a Seneca 4 process at startup with `plugin_gubu_shape`. Load the
  entity plugin by its full name: `seneca.use('@seneca/entity')`.
* The `seneca-promisify` and `@seneca/entity-util` peer dependencies are
  removed: Seneca 4 has promises built in (do not call `use('promisify')`,
  D4), and the plugin does not use `@seneca/entity-util`.
* Node.js 24 or later (`engines.node` `>=24`, was `>=14`).
* The package no longer ships the stale template output
  `dist/github-provider*` and `dist/GithubProvider-doc*` (`github-provider.js`
  required `@octokit/rest`, which is not a dependency).
* The plugin documentation module puts its action descriptions under
  `messages`, as `@seneca/doc` 9 requires.
* Tests run on Seneca 4 with `@seneca/entity` 29 and `@seneca/entity-util` 4,
  load them by their full names (B14) and no longer use `promisify`. The rule
  subscriptions on `role:entity,cmd:save` still fire with `@seneca/entity` 29.
  devDependencies: `seneca` `^4.0.0`, `@seneca/entity` `^29.0.0`,
  `@seneca/entity-util` `^4.0.0`, `seneca-msg-test` `^5.0.0`, `@seneca/doc`
  `^9.0.0` (was `seneca-doc`), `typescript` `^5.9.3` and `@types/node`
  `^24.0.0`; the unused `@seneca/maintain` is removed. `dist/` is rebuilt with
  TypeScript 5.9.3.
* `repository.url` uses `git+https`, `publishConfig` sets public access, and
  the package includes `CHANGES.md`.
