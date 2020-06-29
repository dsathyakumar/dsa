'use strict';

const {
    TreeNode
} = require('./TreeNode');

// In a map based representation the structure is as follows:
/**
 * const treeMap = {
 *      val: 'A',
 *      left: {
 *          val: 'B',
 *          left: {
 *              val: 'D',
 *              left: null,
 *              right: null
 *          },
 *          right: {
 *              val: 'E',
 *              left: null,
 *              right: null
 *          }
 *      },
 *      right: {
 *          val: 'C',
 *          left: {
 *              val: 'F',
 *              left: null,
 *              right: null
 *          },
 *          right: {
 *              val: 'G',
 *              left: null,
 *              right: null
 *          }
 *      }
 * }
 */
// The above structure is a recursive structure and we follow a recursive implementation.

exports.mapToBinaryTree = mapObj => {
    if (Object.keys(mapObj).length === 0) {
        console.warn('nothing to build. Tree is empty!');
        return;
    }

    // base condition
    if (mapObj
        && (mapObj.val || mapObj.data)
        && (mapObj.left === null)
        && (mapObj.right === null)
    ) {
        return new TreeNode(mapObj.val, null, null);
    }

    return new TreeNode(
        (mapObj.val || mapObj.data),
        mapObj.left ? this.mapToBinaryTree(mapObj.left) : null,
        mapObj.right ? this.mapToBinaryTree(mapObj.right) : null);
};

exports.BinaryTreeToMap = root => {
    if (!root) {
        console.warn(`Tree is empty!`);
        return;
    }

    // every stage would return a node to its parent
    // This being the 1st stage, would return the root Node to the caller.
    const node = {
        val: (root.val || root.data),
        left: root.left ? this.BinaryTreeToMap(root.left) : null,
        right: root.right ? this.BinaryTreeToMap(root.right): null
    };

    return node;
};