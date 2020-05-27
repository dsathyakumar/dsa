'use strict';

const {
    reverseArrayBySwaps,
    reverseArrayBySwapsBasedOnRange
} = require('./iterative-reverse-swap')

const {
    recursiveReverseBySwaps
} = require('./recursive-reverse-swap');

/**
 * There are multiple ways to reverse elements of the array.
 * 1) In-place O(N) way where the 0th element is swapped with N-1 th element.
 * 2) Additional array method: the given array is forward iterated and elements placed backwards
 *      in new array.
 * 3) Is to use a list, reverse it and convert it back to an array.
 * 4) Is to use a stack.
 * 
 * All these methods except for #1 require creation of new structures in memory
 * and so are not having a space complexity of O(1) constant.
 * 
 * In JS, there is also another methods, create a new array, and shift elements from
 * the given array and unshift it into the new array.
 */


// console.log(reverseArrayBySwaps([1, 2, 3, 4])); // size is even
// console.log(reverseArrayBySwaps([1, 2, 3, 4, 5])); // size is odd

// let arr = [1, 2, 3, 4];
// recursiveReverseBySwaps(arr, 0, arr.length - 1);
// console.log(arr);

// arr = [1, 2, 3, 4, 5]; // 
// recursiveReverseBySwaps(arr, 0, arr.length - 1);
// console.log(arr);

// console.log(reverseArrayBySwapsBasedOnRange([1, 2, 3, 4], 0 , 1)); // size is even
// console.log(reverseArrayBySwapsBasedOnRange([1, 2, 3, 4, 5], 0, 2)); // size is odd

exports.recursiveReverseBySwaps;
exports.reverseArrayBySwaps;
