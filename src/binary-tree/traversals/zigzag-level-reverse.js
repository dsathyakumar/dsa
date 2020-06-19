'use strict';

// The ZigZag level reverse is same as the ZigZag type traversal,
// except that the results are reported backwards, from the bottom level starting first.
// For this, we use the usual level order traversal, filling elements
// L->R in the result array, for even levels
// R->L in the result array, for odd levels
//
exports.zigZaglevelReverse = (root) => {
    if (!root) {
        return null;
    }

    // Q to store the level order of elements.
    const q = [root];
    const result = [];

    let size = q.size;
    let levelTraversalArray;
    let deqNode = null;
    let level = 0;

    while (q.length) {
        // new result array for every level of the tree
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

        // move the result of the current level into the 2D result array
        // Here instead of a .push we use a .unshift, thereby,
        // the last level traversed, will end up first in the 2D result array
        // and the 1st level of the root, will be the last in the 2D result array
        result.unshift(levelTraversalArray);

        // increment level counter
        ++level;
    }

    return result;
};
