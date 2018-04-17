const babel = require('@babel/core')
const sync = require('../')

function snapshotTest({ title, code, debug }) {
  test(title, () => {
    const res = babel.transform(code, {
      plugins: [sync],
      babelrc: false
    })
    if (debug) {
      console.log(res.code)
    } else {
      expect(res.code).toMatchSnapshot()
    }
  })
}

snapshotTest({
  title: 'main',
  code: `
  class Foo {
    // $MakeMeSync
    async bar() {
      await bar()
      await this.bar()
    }
  }`
})

snapshotTest({
  title: 'manually',
  code: `
  class Foo {
    // $MakeMeSync
    /**
     * jsdoc
     *
     */
    async bar() {
      return this.bar() // $MakeMeSync
    }

    // trailing
  }
  `
})
