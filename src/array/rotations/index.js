'use strict';

const {
    rotateArrayByCyclicReplacements
} = require('./cyclic-replacements');
const {
    rotateArrayByModuloDivision
} = require('./rotate-by-modulo-division');

const {
    rotateByReversals
} = require('./rotate-by-reversals');

// console.log(rotateArrayByModuloDivision([1, 2, 3, 4], 2));
// console.log(rotateArrayByModuloDivision([1, 2, 3, 4], 3));
// console.log(rotateArrayByModuloDivision([1, 2, 3, 4, 5], 2));

// console.log(rotateArrayByCyclicReplacements([1, 2, 3, 4], 2));
// console.log(rotateArrayByCyclicReplacements([1, 2, 3, 4], 3));
// console.log(rotateArrayByCyclicReplacements([1, 2, 3, 4, 5], 1));

// console.log(rotateByReversals([1, 2, 3, 4], 2));
// console.log(rotateByReversals([1, 2, 3, 4], 3));
// console.log(rotateByReversals([1, 2, 3, 4, 5], 1));

exports.rotateArrayByCyclicReplacements = rotateArrayByCyclicReplacements;
exports.rotateArrayByModuloDivision = rotateArrayByModuloDivision;
exports.rotateByReversals = rotateByReversals;
