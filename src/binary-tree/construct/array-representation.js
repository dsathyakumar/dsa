const {
    TreeNode
} = require('../node');

/**
 * This converts a given Array to a Binary Tree.
 * It requires the Array to follow the format as to how a complete binary tree would be filled
 * A complete binary tree is a type of binary tree where all the levels except for perhaps the
 * last level is completely filled. And regarding the last level, its filled from leftmost.
 * So this requires for the complete binary tree to indicate nodes that are NULL to be marked as null.
 * Leaf Nodes are marked with NULL, NULL
 * Empty Nodes are marked with NULL.
 *      For a node at index i,
 *          -> Left Child is at (2 * i) + 1;
 *          -> Right Child is at (2 * i) + 2;
 *      For a node at index i,
 *          -> parent is at Math.floor((i-1) / 2)
 * The array expected is assumed to be filled with Level Order Traversal.
 * This implementation does not skip over NULL nodes.
 * A NULL when enQ'd will have further references to NULL only (which can be optimized)
 * Try with:
 * [3, null, 4, null, null, null, 5, null, null, null, null, null, null, null, 6]
 * More can be found here:
 * https://www.geeksforgeeks.org/construct-complete-binary-tree-given-array/
 * @param {Array} arr (data in level order fashion)
 * @returns {TreeNode} root
 */
exports.arrayToBinaryTree = (arr) => {
    if (!Array.isArray(arr)) {
        return null;
    }

    if (!arr.length) {
        console.log(`Array is empty`);
        return null;
    }

    const rootNode = new TreeNode(arr[0]);
    const q = [rootNode];

    // starting from 0th index of the array, this keeps the count over array index
    let count = 0;
    let deQNode = null;
    let leftIndex = -1;
    let rightIndex = -1;

    while (q.length) {
        // deQ from front
        deQNode = q.shift();

        // compute left and right indexes
        leftIndex = (2 * count) + 1;
        rightIndex = (2 * count) + 2;

        // if leftIndex is < array length &&
        // if the element dequed is NOT NULL &&
        // if the element at the leftIndex is NOT NULL, enQ
        if ((leftIndex < (arr.length))
            && (arr[leftIndex] !== null)
            && (deQNode !== null)) {
            deQNode.left = new TreeNode(arr[leftIndex]);
            q.push(deQNode.left); // enQ at Rear
        } else {
            if (leftIndex < arr.length) {
                q.push(null);
            }
        }

        // if rightIndex is < array length &&
        // if the element dequed is NOT NULL &&
        // if the element at the rightIndex is NOT NULL, enQ
        if ((rightIndex < (arr.length))
            && (arr[rightIndex] !== null)
            && (deQNode !== null)) {
            deQNode.right = new TreeNode(arr[rightIndex]);
            q.push(deQNode.right); // enQ at rear
        } else {
            // else just push a NULL
            if (rightIndex < arr.length) {
                q.push(null);
            }
        }

        ++count;
    }

    return rootNode;
};

exports.BinaryTreeToArray = (root) => {
    if (!root) {
        console.warn(`Tree is empty!`);
        return;
    }

    const bTreeArray = [];
    const q = [root];

    let deqNode;

    while (q.length) {
        deqNode = q.shift();

        // if a node exists (if its a not null),
        // then push that value. Else push a NULL
        // A NULL is possible here when dealing with a LEAF node.
        if (deqNode) {
            bTreeArray.push(deqNode.data || deqNode.val);
        } else {
            bTreeArray.push(null);
        }

        // if a LEFT subtree exists, push that into the Q
        // if Not, as long as the current node is not null, push a NULL
        // this means => current node doesn't have a LEFT or is a LEAF node
        // By doing this, we don't push a NULL for a null node (previously included NULL)
        if (deqNode && deqNode.left) {
            q.push(deqNode.left);
        } else if (deqNode !== null) {
            q.push(null);
        }

        // if a RIGHT subtree exists, push that into the Q
        // if Not, as long as the current node is not null, push a NULL
        // this means => current node doesn't have a RIGHT or is a LEAF node
        // By doing this, we don't push a NULL for a null node (previously included NULL)
        if (deqNode && deqNode.right) {
            q.push(deqNode.right);
        } else if (deqNode !== null) {
            q.push(null);
        }
    }

    return bTreeArray;
};
