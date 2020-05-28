'use strict';

const {
    rotateLeftByCyclicReplacements,
    rotateRightByCyclicReplacements
} = require('./cyclic-replacements');
const {
    rotateArrayByModuloDivision
} = require('./rotate-by-modulo-division');

const {
    rotateRightByReversal,
    rotateLeftByReversal
} = require('./rotate-by-reversals');

// console.log(rotateArrayByModuloDivision([1, 2, 3, 4], 2));
// console.log(rotateArrayByModuloDivision([1, 2, 3, 4], 3));
// console.log('\n');

// console.log(rotateRightByCyclicReplacements([1, 2, 3, 4], 2));
// console.log(rotateRightByCyclicReplacements([1, 2, 3, 4], 3));
// console.log('\n');

// console.log(rotateLeftByCyclicReplacements([1, 2, 3, 4], 2));
// console.log(rotateLeftByCyclicReplacements([1, 2, 3, 4], 3));
// console.log('\n');

// console.log(rotateLeftByReversal([1, 2, 3, 4], 2));
// console.log(rotateLeftByReversal([1, 2, 3, 4], 3));
// console.log('\n');

// console.log(rotateRightByReversal([1, 2, 3, 4], 2));
// console.log(rotateRightByReversal([1, 2, 3, 4], 3));
// console.log('\n');

exports.rotateLeftByCyclicReplacements = rotateLeftByCyclicReplacements;
exports.rotateRightByCyclicReplacements = rotateRightByCyclicReplacements;

exports.rotateArrayByModuloDivision = rotateArrayByModuloDivision;

exports.rotateRightByReversal = rotateRightByReversal;
exports.rotateLeftByReversal = rotateLeftByReversal;
