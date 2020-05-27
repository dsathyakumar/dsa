'use strict';

/**
 * Performs the same in-place reverse, in an recursive manner
 * This can perform reversals within a range on the array.
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

exports.recursiveReverseBySwaps = recursiveReverseBySwaps;
