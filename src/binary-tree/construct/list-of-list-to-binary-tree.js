'use strict';

const {
    TreeNode
} = require('./TreeNode');

// A list of list representation is as follows:
// Every array element represents a node and is itself an array
// So, the 0th index would have the value
// The index = 1 would have the left child and subtree
// The index = 2 would have the right child and subtree.
/**
 * const data = [
 *      'A',
 *      [
 *          'B',
 *          [
 *              'C',
 *              [],
 *              []
 *          ],
 *          [
 *              'D',
 *              []
 *              []
 *          ]
 *      ],
 *      [
 *          'C',
 *          [
 *              'E',
 *              [],
 *              []
 *          ],
 *          [
 *              'F',
 *              [],
 *              []
 *          ]
 *      ]
 * ]
 */
// This is a recursive structure and we will follow a recursive implementation

exports.listOfListToBinaryTree = (data) => {
    if (data === null || typeof data === 'undefined' || !data.length) {
        console.warn(`Data is empty. Tree cannot be created.`);
        return;
    }

    // base case would be that the Node is a LEAF
    if (!data[1].length
        && !data[2].length
        && data[0] !== null
        && typeof data[0] !== 'undefined') {
        return new TreeNode(data[0], null, null);
    }

    // all other cases.
    return new TreeNode(
        data[0], 
        (data[1].length ? this.listOfListToBinaryTree(data[1]) : null),
        (data[2].length ? this.listOfListToBinaryTree(data[2]) : null)
    );
};

exports.BinaryTreeToListOfLists = root => {
    if (!root) {
        console.warn(`Tree is empty!`);
        return;
    }

    const node = [
        (root.val || root.data),
        root.left ? this.BinaryTreeToListOfLists(root.left) : null,
        root.right ? this.BinaryTreeToListOfLists(root.right) : null
    ];

    return node;
};
