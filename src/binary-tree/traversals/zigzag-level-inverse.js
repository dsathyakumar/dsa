'use strict';

// inverse zig zag is the S type formation of the ZigZag Pattern
// where in the even levels are printed R->L and the odd levels 
// are printed L-R (its basically a slight change to the ZigZag pattern)
exports.zigZagInverse = root => {
    if (!root) {
        return null;
    }

    const q = [root];
    const result = [];

    let deqNode = null;
    let size = q.length;
    let levelTraversalArray;
    let level = 0;

    while (q.length) {
        levelTraversalArray = [];

        while (size !== 0) {
            deqNode = q.shift();

            // R->L for Levels that are even
            if (level % 2 === 0) {
                levelTraversalArray.unshift(deqNode.data || deqNode.val);
            } else { // L->R for levels that are odd
                levelTraversalArray.push(deqNode.data || deqNode.val);
            }

            if (deqNode.left) {
                q.push(deqNode.left);
            }

            if (deqNode.right) {
                q.push(deqNode.right);
            }

            --size;
        }

        size = q.length;
        ++level;
        result.push(levelTraversalArray);
    }

    return result;
};
