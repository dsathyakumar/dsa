'use strict';

const {
    DynamicArrayStack
} = require('../../stack/dynamic-array-stack/dynamic-array-stack');

const {
    DynamicArray
} = require('../../array-list/array-list');

/**
 * @description PRE ORDER - THE ITERATIVE WAY
 * 
 * By Pre-order traversal, this means DLR (Data - LEFT - RIGHT)
 * LEFT = LEFT CHILD / LEFT SUBTREE
 * RIGHT = RIGHT CHILD / RIGHT SUBTREE
 * 
 * Steps:
 * - Process current Node
 * - Process Left SubTree
 * - Process Right SubTree
 * 
 * In the Steps, D-L-R, the following combinations are possible:
 * 1) D-L
 *      * Right Node is absent. Left is present.
 *      * Since Right is absent, the current Node can be processed and the left can be processed after it.
 *      * There is no need to hold or store the Node for later processing of Right SubTree
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
 * 4) D-L-R
 *      * Right Node is present. Left Node is also present.
 *      * Here, the Node is processed, then its LEFT and then its RIGHT subTree.
 *      * Since the RIGHT can be processedd only after LEFT is fully done, it has to be temporarily stored, so that
 *          it can be retrieved later for processing RIGHT (once LEFT is done)
 * 
 * The Data structure used to hold Nodes for further processing is a STACK (we always need to process the last Node that was pushed it)
 * Only when both LEFT and RIGHT are present, we push into the stack for later processing.
 * So, when a Node is popped out of the stack, it is guaranteed to have a right sub-tree.
 * 
 * PROCESSING A NODE => printing its value and pushing the value into the results array and returning it.
 * TRAVERSING THE TREE => visiting the nodes of the tree in an order and processing it (processed once, but can be visited multiple times)
 */

/**
 * Performs pre-order iterative traversal. 
 * @param {TreeNode} root
 * @param {Number} size
 * @returns {Array} result
 */
exports.preOrder = (root, size) => {
    // create a Stack to hold Nodes that will be get temporarily pushed (so that its RIGHT subtrees can be processed later)
    const stack = new DynamicArrayStack(size);

    // Hold the result of traversal in this array.
    const result = new DynamicArray(size);

    let currentNode = root,
        prevNode = null;

    do {
        // 1. Process Current Node (DATA)
        result.push(currentNode.data);
        console.log(currentNode.data);

        const hasLeft = (currentNode.left !== null);
        const hasRight = (currentNode.right !== null);

        // if LEFT && RIGHT, then push into stack as the RIGHT can be processed only after LEFT is done.
        if (hasLeft && hasRight) {
            stack.push(currentNode);
        }

        // if a LEFT exists, process it
        if (hasLeft) {
            currentNode = currentNode.left;
            continue;
        }

        // if a RIGHT exists, and a LEFT does not, then process RIGHT
        if (!hasLeft && hasRight) {
            currentNode = currentNode.right;
            continue;
        }

        // if neither LEFT nor RIGHT exist, its a leaf (and its already processed)
        // so proceed to pick next node off the stack, so that its RIGHT can be processed
        if (!hasLeft && !hasRight) {
            prevNode = stack.pop();

            if (!prevNode) {
                currentNode = null;
                break;
            }

            // else pop the stack and assign the RIGHT as currentNode to proceed with iteration            
            currentNode = prevNode.right;
            prevNode = null;
        }
    } while (currentNode !== null);

    return result;
};

/**
 * Performs a recursive pre-order traversal of the Tree
 * D-L-R:
 * 
 * 1. Process the Node
 * 2. Process the LEFT subtree
 * 3. Process the RIGHT subtree
 * 
 * @private
 * @param {TreeNode} node
 * @param {Array} result
 */
const recursivePreOrder = (node, result) => {
    if (node === null) {
        return;
    }

    // process current Node
    console.log(node.data);
    result.push(node.data);

    // preOrder LEFT
    recursivePreOrder(node.left, result);

    // preOrder RIGHT
    recursivePreOrder(node.right, result);

    return;
};

/**
 * @public
 * Performs a recursive pre-order traversal of the Binary Tree
 * 
 * @param {TreeNode} node
 * @returns {Array} result
 */
exports.preOrderRecursive = (root) => {
    const result = new DynamicArray();
    recursivePreOrder(root, result);
    return result;
};
