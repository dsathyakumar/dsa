'use strict';

// In clockwise spiral traversal, the level 0 would be printed L->R
// This would be followed by the last level from R->L
// Then the level 1 from L->R
// Then the (last level - 1) from R->L and so on.
// The easy way is to use level order traversal and store the result in a 2D array.
exports.spiralClockwise = (root) => {
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

            levelTraversalArray.push(deqNode.data || deqNode.val);

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
