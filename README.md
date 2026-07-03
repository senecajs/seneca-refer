![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) plugin

# @seneca/refer

[![npm version](https://img.shields.io/npm/v/@seneca/refer.svg)](https://npmjs.com/package/@seneca/refer)
[![build](https://github.com/senecajs/seneca-refer/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-refer/actions/workflows/build.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-refer/badge.svg)](https://snyk.io/test/github/senecajs/seneca-refer)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-refer/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-refer?branch=main)
[![Maintainability](https://api.codeclimate.com/v1/badges/8242b80adb8acb685afd/maintainability)](https://codeclimate.com/github/senecajs/seneca-refer/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

## Install

```sh
$ npm install @seneca/refer
```

## Quick Example

```js
// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca().use('refer', {})

TODO
```

<!--START:options-->

## More Examples

See [test/](test/) for more usage examples.

## Motivation

A [Seneca.js](http://senecajs.org) plugin.

## Support

If you're using this module and need help, you can:

- Post a [github issue](https://github.com/senecajs/seneca-refer/issues)
- Tweet to [@senecajs](http://twitter.com/senecajs)
- Ask on the [Gitter](https://gitter.im/senecajs/seneca)

## API

### Options

_None._

<!--END:options-->

<!--START:action-list-->

### Action Patterns

* [accept:entry,biz:refer](#-acceptentrybizrefer-)
* [biz:refer,create:entry](#-bizrefercreateentry-)
* [biz:refer,ensure:entry](#-bizreferensureentry-)
* [biz:refer,give:award](#-bizrefergiveaward-)
* [biz:refer,load:entry](#-bizreferloadentry-)
* [biz:refer,load:rules](#-bizreferloadrules-)
* [biz:refer,lost:entry](#-bizreferlostentry-)
* [biz:refer,update:occur](#-bizreferupdateoccur-)
* [biz:refer,update:entry](#-bizreferupdateentry-)


<!--END:action-list-->

<!--START:action-desc-->

### Action Descriptions

### &laquo; `accept:entry,biz:refer` &raquo;

No description provided.



----------
### &laquo; `biz:refer,create:entry` &raquo;

Create referral entry.



----------
### &laquo; `biz:refer,ensure:entry` &raquo;

No description provided.



----------
### &laquo; `biz:refer,give:award` &raquo;

No description provided.



----------
### &laquo; `biz:refer,load:entry` &raquo;

No description provided.



----------
### &laquo; `biz:refer,load:rules` &raquo;

No description provided.



----------
### &laquo; `biz:refer,lost:entry` &raquo;

No description provided.



----------
### &laquo; `biz:refer,update:occur` &raquo;

No description provided.



----------
### &laquo; `biz:refer,update:entry` &raquo;

No description provided.



----------


<!--END:action-desc-->

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features please get in touch.

### Running tests

```sh
npm run test
```

## Background

Part of the [Senecajs org](https://github.com/senecajs/).
