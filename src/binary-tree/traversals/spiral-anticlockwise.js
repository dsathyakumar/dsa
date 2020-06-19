'use strict';

exports.spiralAntiClockWise = (root) => {
    if (root === null) {
        console.warn(`Tree cannot be empty!`);
        return;
    }

    const result = [];
    const q = [];

    let size = q.length;
    let deqNode = null;
    let levelTraversalArray;

    while (q.length) {
        levelTraversalArray = [];

        while(size !== 0) {
            deqNode = q.shift();

            levelTraversalArray.unshift(deqNode.data || deqNode.val);

            if (deqNode.left) {
                q.push(deqNode.left);
            }

            if (deqNode.right) {
                q.push(deqNode.right);
            }

            --size;
        }

        result.push(levelTraversalArray);
        size = q.length;
    }

    let idx = 0;
    let res = [];
    let middle = Math.floor(result.length / 2);

    while (idx <= middle) {
        res[idx] = result[idx];

        if (idx !== middle) {
            res[result.length - idx] = result[result.length - idx].reverse();
        }

        idx++;
    }

    return res;
};
