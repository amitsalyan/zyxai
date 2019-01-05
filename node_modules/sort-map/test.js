'use strict'

const assert = require('assert')
const sortMap = require('.')

describe('sortMap()', function () {
  it('should sort keys by default', function () {
    const entries = sortMap(new Map([['b', 2], ['a', 1]])).entries()
    let entry = entries.next().value
    assert.strictEqual(entry[0], 'a')
    assert.strictEqual(entry[1], 1)
    entry = entries.next().value
    assert.strictEqual(entry[0], 'b')
    assert.strictEqual(entry[1], 2)
  })

  it('should support a sort callback', function () {
    const entries = sortMap(new Map([['a', 1], ['b', 2]]), ([, v1], [, v2]) => v2 - v1).entries()
    let entry = entries.next().value
    assert.strictEqual(entry[0], 'b')
    assert.strictEqual(entry[1], 2)
    entry = entries.next().value
    assert.strictEqual(entry[0], 'a')
    assert.strictEqual(entry[1], 1)
  })
})
