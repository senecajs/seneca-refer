![Seneca Refer](http://senecajs.org/files/assets/seneca-logo.png)

> _Seneca Refer_ is a plugin for [Seneca](http://senecajs.org)


User Referral business logic plugin for the Seneca platform.


[![npm version](https://img.shields.io/npm/v/@seneca/refer.svg)](https://npmjs.com/package/@seneca/refer)
[![build](https://github.com/senecajs/seneca-refer/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-refer/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-refer/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-refer?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-refer/badge.svg)](https://snyk.io/test/github/senecajs/seneca-refer)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/19462/branches/505954/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=19462&bid=505954)
[![Maintainability](https://api.codeclimate.com/v1/badges/f76e83896b731bb5d609/maintainability)](https://codeclimate.com/github/senecajs/seneca-refer/maintainability)


| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|


## Quick Example


```js

// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca()
  .use('refer', {
  })

TODO

```

## Install

```sh
$ npm install @seneca/refer
```



<!--START:options-->


## Options

* `debug` : boolean <i><small>false</small></i>


Set plugin options when loading with:
```js


seneca.use('GithubProvider', { name: value, ... })


```


<small>Note: <code>foo.bar</code> in the list above means 
<code>{ foo: { bar: ... } }</code></small> 



<!--END:options-->

<!--START:action-list-->


## Action Patterns

* [role:entity,base:github,cmd:load,name:repo,zone:provider](#-roleentitybasegithubcmdloadnamerepozoneprovider-)
* [role:entity,base:github,cmd:save,name:repo,zone:provider](#-roleentitybasegithubcmdsavenamerepozoneprovider-)
* [sys:provider,get:info,provider:github](#-sysprovidergetinfoprovidergithub-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `role:entity,base:github,cmd:load,name:repo,zone:provider` &raquo;

Load GitHub repository data into an entity.



----------
### &laquo; `role:entity,base:github,cmd:save,name:repo,zone:provider` &raquo;

Update GitHub repository data from an entity.



----------
### &laquo; `sys:provider,get:info,provider:github` &raquo;

Get information about the provider.



----------


<!--END:action-desc-->
