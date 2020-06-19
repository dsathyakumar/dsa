'use strict';

exports.morrisInOrderTraversal = root => {
    if (root === null) {
        return null;
    }

    // store the result here
    const result = [];

    // start iteration with CurrentNode as Root which will NOT be NULL at this point
    let currentNode = root;
    let hasLeft = false;
    let hasRight = false;

    // Iterate as long as currentNode is not NULL
    while (currentNode !== null) {
        // check for existence of LEFT, RIGHT
        hasLeft = (currentNode.left !== null);
        hasRight = (currentNode.right !== null);

        if (hasLeft) {
            // At this point
            let inOrderPredecessor = (currentNode.left);

            while (inOrderPredecessor !== null) {
                // if NULL => this is the last node
                // => The rightmost node of the LEFT subtree
                // => The in-order predecessor we are looking for
                if (inOrderPredecessor.right === null) {
                    inOrderPredecessor.right = currentNode;
                    currentNode = currentNode.left;
                    break;
                } else if (inOrderPredecessor.right === currentNode) {
                    inOrderPredecessor.right = null;
                    result.push(currentNode.val || currentNode.data);
                    currentNode = currentNode.right;
                    break;
                } else {
                    inOrderPredecessor = inOrderPredecessor.right;
                    continue;
                }
            }
        }

        if (!hasLeft && hasRight) {
            result.push(currentNode.val || currentNode.data);
            currentNode = currentNode.right;
            continue;
        }

        if (!hasLeft && !hasRight) {
            result.push(currentNode.val || currentNode.data);
            break;
        }
    }

    return result;
};
