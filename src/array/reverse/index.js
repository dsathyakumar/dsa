'use strict';

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

/**
 * Performs array reversal in-place by swapping out elements.
 * Space Complexity = O(1)
 * Time complexity = O(N)
 */
const reverseArrayBySwaps = (arr) => {
    if (!arr.length) {
        console.warn(`Array is empty`);
        return;
    }

    let forwardIdx = 0,
        reverseIdx,
        temp;
    
    // this loop always goes only half the way (as the other half would have been swapped)
    // doesn't really matter if N (arr.length) is ODD or EVEN sizes.
    while(forwardIdx < (arr.length/2)) {
        // for i = 0, we need n-1 element, => n - (i+1) => n - (0+1) => n - 1
        // for i = 1, we need n-2 element, => n - (i+1) => n - (1+1) => n - 2
        // so the reversed index can be computed as (n-i-1)
        let reverseIdx = (arr.length - forwardIdx - 1);

        // this is for the middle element, to prevent needeless swap
        if (forwardIdx <= reverseIdx) {
            temp = arr[reverseIdx];
            arr[reverseIdx] = arr[forwardIdx];
            arr[forwardIdx] = temp;
            forwardIdx++;
        }
    }

    return arr;
};

/**
 * Performs the same in-place reverse, in an iterative manner
 * @param {Array} arr
 * @param {Number} start
 * @param {Number} end
 */
const recursiveReverseBySwaps = (arr, start, end) => {
    let temp;

    if (start <= end) {
        temp = arr[end];
        arr[end] = arr[start];
        arr[start] = temp;

        recursiveReverseBySwaps(arr, start+1, end-1);
    } else {
        return;
    }
};

// console.log(reverseArrayBySwaps([1, 2, 3, 4])); // size is even
// console.log(reverseArrayBySwaps([1, 2, 3, 4, 5])); // size is odd

// let arr = [1, 2, 3, 4];
// recursiveReverseBySwaps(arr, 0, arr.length - 1);
// console.log(arr);

// arr = [1, 2, 3, 4, 5]; // 
// recursiveReverseBySwaps(arr, 0, arr.length - 1);
// console.log(arr);

exports.recursiveReverseBySwaps;
exports.reverseArrayBySwaps;
