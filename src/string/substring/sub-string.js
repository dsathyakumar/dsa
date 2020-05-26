'use strict';

exports.printSubString = str => {
    if (!str.length) {
        console.warn('string is empty');
        return;
    }

    console.log(`Possible sub-strings count: ${str.length * (str.length + 1) / 2}`);

    // fix start Indexes
    for (let startIdx = 0; startIdx < (str.length); startIdx) {
        // vary the endIndex from the startIndex
        for (let endIdx = startIdx; endIdx < (str.length); endIdx++) {
            let rangeStr = '';

            // the rangeCounter will print, counting from startIndex to endIndex
            for (let rangeIdx = startIdx; rangeIdx <= endIdx; rangeIdx++) {
                rangeStr = rangeStr + str.charAt(rangeIdx);
            }

            console.log(rangeStr);
            console.log('\n');
        }
    }
};
