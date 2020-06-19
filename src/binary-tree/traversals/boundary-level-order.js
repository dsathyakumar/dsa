'use strict';

// This is per GeeksForGeeks post
// https://www.geeksforgeeks.org/boundary-level-order-traversal-of-a-binary-tree/?ref=leftbar-rightbar
// This does a level order traversal
// But for each level, it would print the boundary nodes first
// And decrement in that order
// For eg) in a level X, with N nodes, it would print
// 0, N-1, 1, N-2, 2, N-3 and so on...
// Technically these could be implemented via a proper DynamicCircularArrayQueue as well
exports.boundaryLevelOrderTraversal = (root) => {
    if (root === null) {
        console.warn(`Tree cannot be empty!`);
        return [];
    }

    // A Q for the level order traversal.
    // The key to solving this problem is to be able to aggregate the childNodes at
    // level (N+1) into the result, when the Parents at level N are in the Q.
    const q = [root];
    let size = q.length;

    let deqNode;

    // level counter.
    let level = 0;

    // account for TreeNode type implementations that have field val / data
    let levelTraversalArray = [root.val || root.data];
    const result = [];
    result.push(levelTraversalArray);

    let hasTraversedLastLevel = false;

    while (q.length && !hasTraversedLastLevel) {
        levelTraversalArray = [];

        // The result for the 0th level, is filled before the loop starts.
        // For the 0th level, we fill in the result for (Level 1)
        // For the 1st level, we fill in the result for (Level 2)
        // For the nth level, we fill in the result for Level (n+1)
        // This is the result array for the next level level.
        if (level === 0) {
            levelTraversalArray.push(q[0].left.data || q[0].left.val);
            levelTraversalArray.push(q[0].right.data || q[0].right.val);
        } else {
            let leftIdx = 0;
            let rightIdx = (size - 1);

            while (leftIdx < rightIdx) {
                let leftNode = q[leftIdx];
                let rightNode = q[rightIdx];
                
                if (leftNode && leftNode.left) {
                    levelTraversalArray.push(leftNode.left.data || leftNode.left.val);
                }

                if (rightNode && rightNode.right) {
                    levelTraversalArray.push(rightNode.right.data || rightNode.right.val);
                }

                if (leftNode && leftNode.right) {
                    levelTraversalArray.push(leftNode.right.data || leftNode.right.val);
                }

                if (rightNode && rightNode.left) {
                    levelTraversalArray.push(rightNode.left.data || rightNode.left.val);
                }

                ++leftIdx;
                --rightIdx
            }
        }

        // For a given level n, the Q snapshot we iterate includes the
        // Nodes for level N only.
        while (size !== 0) {
            deqNode = q.shift();

            if (deqNode && deqNode.left) {
                q.push(deqNode.left);
            } else {
                q.push(null);
            }

            if (deqNode && deqNode.right) {
                q.push(deqNode.right);
            } else {
                q.push(null);
            }

            --size;
        }
        
        // push the result of (N+1) level into the 2D result array
        if (levelTraversalArray.length) {
            result.push(levelTraversalArray);
        } else {
            hasTraversedLastLevel = true;
        }

        // reset Q snapshot size
        size = q.length;

        ++level;
    }

    return result;
};
