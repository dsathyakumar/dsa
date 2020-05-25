'use strict';

/***
 * A subbarray is a contiguous part of array. An array that is inside another array.
 * For example, consider the array [1, 2, 3, 4],
 * There are 10 non-empty sub-arrays.
 * The subbarays are (1), (2), (3), (4), (1,2), (2,3), (3,4), (1,2,3), (2,3,4) and (1,2,3,4).
 * In general, for an array/string of size n, there are,
 *      [n*(n+1)/2] non-empty subarrays/subsrings.
 * This function would create that many individual sub-arrays.
 */
exports.generateSubArrays = arr => {
    if (!arr.length) {
        console.warn('empty array');
        return;
    }

    console.info(`Number of sub-arrays = ${arr.length * ((arr.length + 1) / 2)}`);

    const result = [];

    for (let i = 0; i < (arr.length); i++) {
        let tempArr = [];

        for (let j = i; j < (arr.length); j++) {
            if (j === i) {
                tempArr.unshift([arr[j]]);
            } else {
                tempArr.unshift([arr[j], ...tempArr[0]]);
            }
        }

        result.unshift(...tempArr);
        tempArr = undefined;
    }

    return result;
};

exports.printSubArrays = arr => {
    if (!arr.length) {
        console.warn('empty array');
        return;
    }

    console.info(`Number of sub-arrays = ${arr.length * ((arr.length + 1) / 2)}`);

    for (let startIndex = 0; startIndex < (arr.length); startIndex++) {
        for (let endIndex = startIndex; endIndex < (arr.length); endIndex++) {
            let result = '';
            for (let rangeIndex = startIndex; rangeIndex <= endIndex; rangeIndex++) {
                if (result) {
                    result = result + ' , ' + arr[rangeIndex];
                } else {
                    result = arr[rangeIndex];
                }
            }
            console.log(result);
            console.log('\n');
        }
    }
};