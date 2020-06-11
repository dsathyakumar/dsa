'use strict';

const {
    DynamicArrayStack
} = require('../../stack/dynamic-array-stack/dynamic-array-stack');

const {
    DynamicArray
} = require('../../array-list/array-list');

/**
 * @description IN ORDER - THE ITERATIVE WAY
 * 
 * By In-order traversal, this means LDR (LEFT - DATA - RIGHT)
 * LEFT = LEFT CHILD / LEFT SUBTREE
 * RIGHT = RIGHT CHILD / RIGHT SUBTREE
 * 
 * Steps:
 * - Process Left SubTree
 * - Process The Data of the given Node
 * - Process Right SubTree
 * 
 * In the Steps, L-D-R, the following combinations are possible:
 * 1) L-D
 *      * Right Node is absent. Left is present.
 *      * The Left SubTree has to be processed before the current node's data can be processed
 *      * So, the Node is pushed into the Stack (for later processing of the Node's data), after the LEFT is processed.
 * 
 * 2) D-R
 *      * Right Node is present. Left is absent.
 *      * Since Right is present, but Left is absent, the current Node is processed & then the Right is processed after it.
 *      * There is no need to hold or store the Node for later processing.
 * 
 * 3) D
 *      * Right Node is absent. Left Node is absent.
 *      * Since Both Left and Right are absent, the current Node is processed and its done.
 *      * There is no need to hold or store the node for later processing.
 * 
 * 4) L-D-R
 *      * Right Node is present. Left Node is also present.
 *      * Here, the LEFT is processed, then the node, then the RIGHT subtree.
 *      * Since the RIGHT can be processedd only after LEFT is fully done, and the Node itself is processed, its pushed into the stack
 *          so, that, it can be retrieved later for processing The Node & the RIGHT (once LEFT is done)
 * 
 * The Data structure used to hold Nodes for further processing is a STACK (we always need to process the last Node that was pushed it)
 * Notice that, whenever a LEFT is present, the Node gets pushed into the stack (since the Node and RIGHt can be processed only after LEFT is done)
 * So, when a Node is popped out of the stack, it is NOT guaranteed to have a right sub-tree.
 * 
 * PROCESSING A NODE => printing its value and pushing the value into the results array and returning it.
 * TRAVERSING THE TREE => visiting the nodes of the tree in an order and processing it (processed once, but can be visited multiple times)
 */


/**
 * Performs iterative In-Order Traversal of the Binary Tree.
 * @param {TreeNode} root
 * @param {Number} size
 * @returns {Array} result
 */
exports.inOrder = (root, size) => {
    // create a Stack to hold Nodes that will be get temporarily pushed
    // (so that the Node & RIGHT subtrees can be processed later)
    const stack = new DynamicArrayStack(size);

    // Hold the result of traversal in this array.
    const result = new DynamicArray(size);

    let currentNode = root,
        prevNode;

    do {
        const hasLeft = (currentNode.left !== null); // > does a LEFT exist?
        const hasRight = (currentNode.right !== null); // > does a RIGHT exist?

        // if a LEFT exists, push currentNode onto stack (since the Node itself would have to be processed),
        // after the LEFT is processed (irrespective of whether or not a RIGHT exists).
        // Then, process the LEFT.
        if (hasLeft) {
            stack.push(currentNode);
            currentNode = currentNode.left;
            continue;
        }

        // process Current Node
        result.push(currentNode.data);
        console.log(currentNode.data);

        // if a RIGHT exists, but there is no LEFT, process the RIGHT
        if (!hasLeft && hasRight) {
            currentNode = currentNode.right;
            continue;
        }

        // if neither a LEFT nor a RIGHT exists => its a LEAF
        // Since the current Node has already been processed (above),
        // time to pull another Node from the Stack (so that it can be processed & its RIGHT can also be)
        // popping an element off the stack, does not guarantee that the Node has a RIGHT.
        // so if a Node is popped, we check the RIGHT (after processing it).
        // If a RIGHT did not exist, we continue popping Nodes off the stack, until, EITHER
        //      A) WE REACH A NODE THAT HAS A RIGHT (or)
        //      B) THE STACK GOES EMPTY
        if (!hasLeft && !hasRight) {
            do {
                // 1st pop an element off the stack (the element that was stored previously, for later processing)
                prevNode = stack.pop();

                // if no element was returned => stack is empty, set currentNode as NULL and terminate the inner loop.
                // By setting currentNode as NULL, the outer loop is also terminated
                if (!prevNode) {
                    currentNode = null;
                    break;
                }

                // process the currently popped Node from Stack
                console.log(prevNode.data);
                result.push(prevNode.data);

                // if the currentNode had a right, the inner loop can be terminated.
                if (prevNode.right !== null) {
                    currentNode = prevNode.right;
                    break;
                }

                // else, set prevNode = NULL, so that the inner loop can continue
                // to pop off the other elements from the stack (till a RIGHT exists / the stack goes empty)
                prevNode = null;
            } while (prevNode === null);
        }
    } while (currentNode !== null);

    return result; // > return the result of traversal
};

/**
 * Performs a recursive in-order traversal of the Tree
 * L-D-R:
 * 
 * 1. Process the LEFT subtree
 * 2. Process the Node
 * 3. Process the RIGHT subtree
 * 
 * @private
 * @param {TreeNode} node
 * @param {Array} result
 */
const recursiveInOrder = (node, result) => {
    // head recursion base case
    if (node === null) {
        return;
    }

    // process the LEFT
    recursiveInOrder(node.left, result);

    // process the Node
    console.log(node.data);
    result.push(node.data);

    // process the RIGHT
    recursiveInOrder(node.right, result);

    return;
};

/**
 * @public
 * Performs a recursive in-order traversal of the Binary Tree
 * 
 * @param {TreeNode} node
 * @returns {Array} result
 */
exports.inOrderRecursive = (root) => {
    const result = new DynamicArray();
    recursiveInOrder(root, result);
    return result;
};
