'use strict';

/**
 * This rotation of array makes use of modulo arithmetic
 * and is based on whatever the circular array uses.
 * (Current Index + Number of Shifts) % Size.
 * Bt it uses an additional array to temporarily hold the arrangements.
 * So the space complexity is O(N) and the time complexity is O(N).
 * If stuff has to be re-copied back into the original array, then,
 * the time complexity would be O(N) + O(N).
 * @param {Array} arr
 * @param {Number} numberOfRotations
 */
const rotateArrayByModuloDivision = (arr, numberOfRotations) => {
    let tempArr = new Array(arr.length);

    arr.forEach((el, idx) => {
        let computedIdx = (idx + numberOfRotations) % arr.length;
        tempArr[computedIdx] = el;
    });

    return tempArr;
};

exports.rotateArrayByModuloDivision = rotateArrayByModuloDivision;
