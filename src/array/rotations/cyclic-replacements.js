'use strict';

/**
 * Rotates array performing cyclic replacements.
 * These are in-place with space complexity of O(1)
 * and a time complexity of O(N).
 * Both left shift and right shift can be done.
 * This uses the array length to subtract and perform shifts.
 * This function is implemented with Right Shift. So for Right Shift,
 * Where if index > arr.length - 1, (computedIdx => index - arr.length)
 * If this was Left shift, then this would be:
 * if index < 0, then, (computedIdx => index + arr.length)
 * @param {Array} arr
 * @param {Number} numberOfRotations
 */
const rotateArrayByCyclicReplacements = (arr, numberOfRotations) => {
    let replacementCount = 0,
    arrayIdxCounter = 0,
    replacedValue = null,
    computedIdx = -1;

    do {
        if (computedIdx === -1 && replacedValue === null) {
            computedIdx = arrayIdxCounter + numberOfRotations;
        } else {
            computedIdx = computedIdx + numberOfRotations;
        }

        if (computedIdx >= arr.length) {
            computedIdx = computedIdx - arr.length;
        }

        if (replacedValue) {
            let tempValue = replacedValue;
            replacedValue = arr[computedIdx];
            arr[computedIdx] = tempValue;
        } else {
            // replacedValue
            replacedValue = arr[computedIdx];

            // get the originalValue
            arr[computedIdx] = arr[arrayIdxCounter];
        }

        // replace with originalValue
        replacementCount = (replacementCount + 1);

        // reset computedIdx and arrayIdxCounter
        if (computedIdx === arrayIdxCounter) {
            arrayIdxCounter = arrayIdxCounter + 1;
            computedIdx = -1;
            replacedValue = null;
        }
    } while(replacementCount < arr.length)

    return arr;
};

exports.rotateArrayByCyclicReplacements = rotateArrayByCyclicReplacements;

/**
 * A = [1,2,3,4] D=2 N=4
 * ---------------------------------------------------------
 * arrayIdxCounter = 0,
 * computedIdx = -1,
 * replacedValue = null,
 * replacementCount = 0
 * 
 * Does computedIdx exist? -> NO
 * So, computedIdx = arrayIdxCounter + D = 0 + 2 = 2
 *      computedIdx = 2
 *      replacedValue = A[2] = 3
 *      A[2] = A[arrayIdxCounter] = A[0] = 1
 * Now check if (computedIdx === arrayIdxCounter) => 2 === 0 => FALSE
 * 
 * computedIdx = 2;
 * replacedValue = 3;
 * arrayIdxCounter = 0;
 * replacementCount = replacementCount + 1 = 0 + 1 = 1
 * 
 * A = [1, 2, 1, 4] replacedValue = 3
 * 
 * is replacementCount === A.length => FALSE 
 * 
 * ----------------------------------------------------------
 * computedIdx = 2;
 * replacedValue = 3;
 * arrayIdxCounter = 0;
 * replacementCount = 1
 * A = [1, 2, 1, 4]
 * D = 2
 * 
 * Does computedIdx exist? -> YES
 * So, 
 *      
 */
