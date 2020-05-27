'use strict';

/**
 * Performs array reversal in-place by swapping out elements.
 * This performs a full reversal of the array.
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

const reverseArrayBySwapsBasedOnRange = (arr, start, end) => {
    if (!arr.length) {
        console.warn(`Array must not be empty!`);
        return;
    }

    let temp;

    while(start <= end) {
        temp = arr[end];
        arr[end] = arr[start];
        arr[start] = temp;

        start++;
        end--;
    }

    return arr;
};

exports.reverseArrayBySwaps = reverseArrayBySwaps;
exports.reverseArrayBySwapsBasedOnRange = reverseArrayBySwapsBasedOnRange;
