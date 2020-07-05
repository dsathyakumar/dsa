'use strict';

/**
 * @description Via Recursion, returns all the ancestors of the given node (including itself).
 * - Note that any Node that exists on the path between the Root Node and the given Node
 * is an ancestor of the given Node.
 * - Every Node is an ancestor of itself.
 * - When proper ancestors are asked, then the given node is to be excluded.
 * http://www.cs.kent.edu/~durand/CS2/Notes/10_Binary_Trees/ds_treesA.html
 * @param {TreeNode} root of the tree
 * @param {TreeNode} node for which the ancestors have to be computed.
 */
exports.getAllAncestorsRecursively = (root, node) => {

};

/**
 * @description Returns all the ancestors of the given node (including itself).
 * - Note that any Node that exists on the path between the Root Node and the given Node
 * is an ancestor of the given Node.
 * - Every Node is an ancestor of itself.
 * - When proper ancestors are asked, then the given node is to be excluded.
 * http://www.cs.kent.edu/~durand/CS2/Notes/10_Binary_Trees/ds_treesA.html
 * @param {TreeNode} root of the tree
 * @param {TreeNode} node for which the ancestors have to be computed.
 */
exports.getAllAncestors = (root, node) => {
    if (!root) {
        console.warn(`Tree cannot be empty!`);
        return;
    }

    const stack = [];

    let currentNode = root;
    let hasLeft = false;
    let hasRight = false;
    let prevNode = null;
    let hasFound = false;

    while ((currentNode !== null) && (typeof currentNode !== 'undefined')) {
        // check if currentNode is our Node of interest
        // if found, break and return the stack
        if (currentNode === node) {
            stack.push(currentNode);
            hasFound = true;
            break;
        }

        // if not, proceed to traverse
        // check for left and right child nodes
        hasLeft = (currentNode.left !== null);
        hasRight = (currentNode.right !== null);

        // if LEFT and RIGHT exists, push into Stack
        // since we will need the Node again, to process RIGHT, after LEFT is processed
        if (hasLeft && hasRight) {
            stack.push(currentNode);
        }

        // if a LEFT exists, process it
        if (hasLeft) {
            currentNode = currentNode.left;
            continue;
        }

        // if a RIGHT exists, in the absence of a LEFT, process it
        if (!hasLeft && hasRight) {
            currentNode = currentNode.right;
            continue;
        }

        // Neither LEFT nor RIGHT => LEAF
        if (!hasLeft && !hasRight) {
            // if a node exists in the stack, its for sure to have a RIGHT
            prevNode = stack.shift();

            // if the node is NULL / UNDEFINED => stack is empty.
            if (!prevNode) {
                currentNode = null;
                break;
            }

            // get the right and process it
            currentNode = prevNode.right;
            prevNode = null;
        }
    }

    return hasFound ? stack : [];
};

/**
 * @description Returns all the ancestors of the given node (excluding itself).
 * - Note that any Node that exists on the path between the Root Node and the given Node
 * is an ancestor of the given Node.
 * - Every Node is an ancestor of itself.
 * - When proper ancestors are asked, then the given node is to be excluded.
 * http://www.cs.kent.edu/~durand/CS2/Notes/10_Binary_Trees/ds_treesA.html
 * @param {TreeNode} root of the tree
 * @param {TreeNode} node for which the ancestors have to be computed.
 */

exports.getProperAncestors = (root, node) => {
    if (!root) {
        console.warn(`Tree cannot be empty!`);
        return;
    }

    const stack = [];

    let currentNode = root;
    let hasLeft = false;
    let hasRight = false;
    let prevNode = null;
    let hasFound = false;

    while ((currentNode !== null) && (typeof currentNode !== 'undefined')) {
        // check if currentNode is our Node of interest
        // if found, break and return the stack
        if (currentNode === node) {
            hasFound = true;
            break;
        }

        // if not, proceed to traverse
        // check for left and right child nodes
        hasLeft = (currentNode.left !== null);
        hasRight = (currentNode.right !== null);

        // if LEFT and RIGHT exists, push into Stack
        // since we will need the Node again, to process RIGHT, after LEFT is processed
        if (hasLeft && hasRight) {
            stack.push(currentNode);
        }

        // if a LEFT exists, process it
        if (hasLeft) {
            currentNode = currentNode.left;
            continue;
        }

        // if a RIGHT exists, in the absence of a LEFT, process it
        if (!hasLeft && hasRight) {
            currentNode = currentNode.right;
            continue;
        }

        // Neither LEFT nor RIGHT => LEAF
        if (!hasLeft && !hasRight) {
            // if a node exists in the stack, its for sure to have a RIGHT
            prevNode = stack.shift();

            // if the node is NULL / UNDEFINED => stack is empty.
            if (!prevNode) {
                currentNode = null;
                break;
            }

            // get the right and process it
            currentNode = prevNode.right;
            prevNode = null;
        }
    }

    return hasFound ? stack : [];
}