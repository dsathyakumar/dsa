'use strict';

// The ZigZag Level traversal is basically a level order traversal
// where in the elements are filled from L->R in level 0
// and R->L in the Level 1 and so on alternatively.
// So even number levels would be filled L->R
// Odd number levels would be filled R->L
// In JS, the traversal would be the usual level order traversal.
// But, while filling the result, for L->R traversal, we will push elements into the array
// So, the 1st element of traversal from left, would be the 1st element in result array.
// Bt, while filling the result for R->L, we will unshift elements into the array
// causing the 1st element of the level (level order traversal) to move to the last position
exports.zigZagLevel = (root) => {
    if (!root) {
        return null;
    }

    const q = [root];

    // a 2D array, containing an array for every level => a N X 1 matrix type
    const result = [];

    let size = q.size;
    let levelTraversalArray;
    let deqNode = null;
    let level = 0;

    while (q.length) {
        // create a new array for every level order traversal
        levelTraversalArray = [];

        while (size !== 0) {
            deqNode = q.shift();

            // LEFT to RIGHT
            if (level % 2 === 0) {
                levelTraversalArray.push(deqNode.val || deqNode.data);
            } else { // RIGHT TO LEFT
                levelTraversalArray.unshift(deqNode.val || deqNode.data);
            }

            if (deqNode.left) {
                q.push(deqNode.left);
            }

            if (deqNode.right) {
                q.push(deqNode.right);
            }

            --size;
        }

        // reset Q snapshot size
        size = q.size;

        // push current result into the 2D result array
        result.push(levelTraversalArray);

        // increment level
        ++level;
    }

    return result;
};
