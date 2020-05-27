'use strict';

const {
    reverseArrayBySwapsBasedOnRange,
    reverseArrayBySwaps
} = require('../reverse/index');

/**
 * This program does reverse via the following:
 * - reverse the full array.
 * - have the array in 2 groups of (numberOfRotations), (arr.length - numberOfRotations)
 * - reverse the array group of (numberOfRotations)
 * - reverse the remaining group of (arr.length - numberOfRotations)
 * @param {Array} arr
 * @param {Number} numberOfRotations
 */
const rotateByReversals = (arr, numberOfRotations) => {
    // fully reverse the array
    reverseArrayBySwaps(arr);

    // reverse the 1st k elemenst where k=numberOfRotations
    reverseArrayBySwapsBasedOnRange(arr, 0, numberOfRotations)

    // reverse the remaining n-k elemenst where k=numberOfRotations n=arr.length
    reverseArrayBySwapsBasedOnRange(arr)

    return arr;
}

exports.rotateByReversals = rotateByReversals;
