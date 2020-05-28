'use strict';

const {
    reverseArrayBySwapsBasedOnRange,
    reverseArrayBySwaps
} = require('../reverse/index');

/**
 * NOTE: This assumes the whole array is available for rotation / shift and not a portion
 * alone
 * 
 * This program does rotation/shift via the following process:
 * - reverses the full array.
 * - have the array in 2 groups of (numberOfRotations), (arr.length - numberOfRotations)
 * - reverse the array group of (numberOfRotations)
 * - reverse the remaining group of (arr.length - numberOfRotations)
 * By doing this, the required rotation is achieved.
 * @param {Array} arr
 * @param {Number} numberOfRotations
 */
const rotateByReversals = (arr, numberOfRotations) => {
    // fully reverse the array
    reverseArrayBySwaps(arr);

    // reverse the 1st k elemenst where k=numberOfRotations
    reverseArrayBySwapsBasedOnRange(arr, 0, (numberOfRotations - 1));

    // reverse the remaining n-k elemenst where k=numberOfRotations n=arr.length
    reverseArrayBySwapsBasedOnRange(arr, numberOfRotations, arr.length-1);

    return arr;
}

exports.rotateByReversals = rotateByReversals;
