'use strict';

const {
    DynamicArrayStack
} = require('../../stack/dynamic-array-stack/dynamic-array-stack');

const {
    DynamicArray
} = require('../../array-list/array-list');

/**
 * @description POST ORDER - THE ITERATIVE WAY
 * 
 * By Post-order traversal, this means LRD (LEFT - RIGHT - DATA)
 * LEFT = LEFT CHILD / LEFT SUBTREE
 * RIGHT = RIGHT CHILD / RIGHT SUBTREE
 * 
 * Steps:
 * - Process Left SubTree
 * - Process Right SubTree
 * - Process The Data of the given Node
 * 
 * In the Steps, L-R-D, the following combinations are possible:
 * 1) L-D
 *      * Right Node is absent. Left is present.
 *      * The RIGHT subtree doesnt have to be processed after LEFT is done. Only the Node has to be processed.
 *      * The Left SubTree has to be processed before the current node's data can be processed.
 *      * So, the Node is pushed into the Stack (for later processing of the Node's data), after the LEFT is processed.
 * 
 * 2) R-D
 *      * Right Node is present. Left is absent.
 *      * Only the Node is pending to be processed, after the RIGHT is processed.
 *      * Since Right is present, but Left is absent, the Right is processed & the current Node is processed after it.
 *      * So, the Node is pushed into the Stack (for later processing of the Node's data), after the RIGHT is processed.
 * 
 * 3) D
 *      * Right Node is absent. Left Node is absent.
 *      * Since Both Left and Right are absent, the current Node is processed and its done.
 *      * There is no need to hold or store the node for later processing.
 * 
 * 4) L-R-D
 *      * Right Node is present. Left Node is also present.
 *      * Here, the LEFT is processed, then the RIGHT subtree, then the node.
 *      * Since the RIGHT can be processedd only after LEFT is fully done, & that the Node can be processed only after RIGHT is done,
 *           its pushed into the stack, so, that, it can be retrieved later for processing the RIGHT & The Node (once LEFT is done)
 * 
 * The Data structure used to hold Nodes for further processing is a STACK (we always need to process the last Node that was pushed it)
 * Notice that, whenever a LEFT is present, the Node gets pushed into the stack (since the Node and RIGHt can be processed only after LEFT is done)
 * So, when a Node is popped out of the stack, it is NOT guaranteed to have a right sub-tree.
 * There are 2 types of processing possible here: either process the RIGHT (if it exists), or process the Node.
 * If a RIGHT is to be processed, the element should remain in the stack, so that it can be retrived once more (after RIGHT is processed)
 * to process the Node itself. (So we initially peek to get the RIGHT. We pop only when there is no right)
 * 
 * PROCESSING A NODE => printing its value and pushing the value into the results array and returning it.
 * TRAVERSING THE TREE => visiting the nodes of the tree in an order and processing it (processed once, but can be visited multiple times)
 */


/**
 * Performs iterative post order traversal of the Binary Tree
 * @param {TreeNode} root
 * @param {Number} size
 * @returns {Array} result
 */
exports.postOrder = (root, size) => {
    // create a Stack to hold Nodes that will be get temporarily pushed (so that its RIGHT subtrees can be processed later)
    const stack = new DynamicArrayStack(size);

    // Hold the result of traversal in this array.
    const result = new DynamicArray(size);

    let currentNode = root,
        prevNode = null;

    do {
        const hasLeft = (currentNode.left !== null); // > Does a Left exist?
        const hasRight = (currentNode.right !== null); // > Does a right exist?

        // if Either of LEFT or RIGHT is present, push element onto stack
        if (hasLeft || hasRight) {
            stack.push(currentNode);
        }

        // if Left exists, process it
        if (hasLeft) {
            currentNode = currentNode.left;
            continue;
        }

        // if a Right exists, but there is no left, process it
        if (!hasLeft && hasRight) {
            currentNode = currentNode.right;
            continue;
        }

        // if Neither Left nor Right exists, then the currentNode is a LEAF
        if (!hasLeft && !hasRight) {
            // process the leaf
            console.log(currentNode.data);
            result.push(currentNode.data);

            // now proceed to loop back and pick off elements from the stack
            // to either process their right subtrees (if a right exists)
            // or just process the Node itself
            do {
                // peek the top from the stack
                prevNode = stack.peek();

                // if there are no elements in the stack (empty stack)
                // reset currentNode as NULL and break inner loop
                // thereby it would break the outer loop
                if (!prevNode) {
                    currentNode = null;
                    break;
                }

                // if a prevNode exists, and it had a RIGHT and the RIGHT is not equal to the current Node
                // assign it as currentNode and break the inner loop, so that the outer loop continues to traverse
                if ((prevNode.right !== null) && (prevNode.right !== currentNode)) {
                    currentNode = prevNode.right;
                    break;
                }

                // PrevNode exists, but there is no right or the Right is matching the currentNode (which is already processed)
                // Process the Node itself
                console.log(prevNode.data);
                result.push(prevNode.data);

                // pop the element off the stack
                stack.pop();
                // reset the prevNode to NULL (so that the inner loop can pick off the next TOP element from stack)
                prevNode = null;
            } while (prevNode === null);
        }
    } while (currentNode !== null);

    return result;
};

/**
 * Performs a recursive post-order traversal of the Tree
 * L-R-D:
 * 
 * 1. Process the LEFT subtree
 * 2. Process the RIGHT subtree
 * 3. Process the Node
 * 
 * @private
 * @param {TreeNode} node
 * @param {Array} result
 */

const recursivePostOrder = (node, result) => {
    if (node === null) {
        return;
    }

    recursivePostOrder(node.left, result);
    recursivePostOrder(node.right, result);

    console.log(node.data);
    result.push(node.data);

    return;
};

/**
 * @public
 * Performs a recursive post-order traversal of the Binary Tree
 * 
 * @param {TreeNode} node
 * @returns {Array} result
 */
exports.postOrderRecursive = (root) => {
    const result = new DynamicArray();
    recursivePostOrder(root, result);
    return result;
};
