
# babel-plugin-sync

[![NPM version](https://img.shields.io/npm/v/babel-plugin-sync.svg?style=flat)](https://npmjs.com/package/babel-plugin-sync) [![NPM downloads](https://img.shields.io/npm/dm/babel-plugin-sync.svg?style=flat)](https://npmjs.com/package/babel-plugin-sync) [![CircleCI](https://circleci.com/gh/egoist/babel-plugin-sync/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/babel-plugin-sync/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

## Install

```bash
yarn add babel-plugin-sync --dev
```

## Usage

With `.babelrc`:

```js
{
  "plugins": [
    "sync"
  ]
}
```

In:

```js
class MyModule {
  // $MakeMeSync
  async read() {
    await this.resolve('./file')
  }
}
```

Out:

```js
class MyModule {
  async read() {
    await this.resolve('./file')
  }
  readSync() {
    this.resolveSync('./file')
  }
}
```

### Make returnStatement sync

We don't know if it's safe to make the return statement sync at all, you can use the `await` keyword or `// $MakeMeSync` explicitly.

```diff
class Foo {
  // $MakeMeSync
  async foo() {
-    return this.bar()
+    return this.bar() // $MakeMeSync
  }
}
```

## Used By

- [JoyCon](https://github.com/egoist/joycon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**babel-plugin-sync** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/babel-plugin-sync/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
