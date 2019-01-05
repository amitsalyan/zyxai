'use strict'

const {entriesArray, reconstruct} = require('m-o')
const compare = require('3')

module.exports = (map, sorter = ([k1], [k2]) => compare(k1, k2)) => reconstruct(map, entriesArray(map).sort(sorter))
