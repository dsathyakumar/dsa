'use strict';

// For a generic binary tree, to delete a node
// 1. Find the deepest rightmost node of the binary tree
// 2. Find the node with the value to delete.
// 3. Replace the value of the deepest rightmost node, with the node intended for deletion.
// 4. Delete the deepest rightmost node.
// As a consequence of the above exercise, the value of the deepest rightmost node is now
// swapped to the node you intended to delete. Since the value is replaced, the node you
// intended to delete is gone & so is the deepest rightmost node. The intention of the delete
// is to pull up the binary tree (reduce its depth / height)
// we will use level order traversal for this case
exports.deleteNode = (root, value) => {
    if (!root) {
        return false;
    }

    if (typeof value === 'undefined') {
        return false;
    }

    // We will do level order traversal for this, using a Q
    // As we traverse, we would anyway be able to locate the node we intended to delete
    // This just requires a placeholder to store it.
    // Its also easy to get the deepest, rightmost node (which is the last node)
    // The deepest node would be found at the last level of the level order traversal
    // In the same manner, the rightmost deepest node would be the last.
    // Bt we need to be able to store the parent of this deepest rightmost node,
    // so that its value can be swapped with the node to be deleted and this node
    // can be unlinked.

    const q = [root];

    let parent = null;
    let lastNode = null;
    let nodeToDelete = null;
    let deQNode = null;

    // iterate only the snapshot of the Q, for the current level
    let size = q.length;

    while(q.length) {
        // iterate over the current snapshot of the Q (current level)
        while (size !== 0) {
            // deQ the front of the Q
            deQNode = q.shift();

            if ((deQNode.val === value || deQNode.data === value) && !nodeToDelete) {
                nodeToDelete = deQNode;
            }

            // if the current deQNode has children, then the parent needs to be
            // updated to the deQNode as the previous parent is no longer of interest
            // since the deQNode's children occupy the following level which may be
            // the deepest and contain the rightmost element.
            if (deQNode.left || deQNode.right) {
                parent = deQNode;
            }

            // enQ if a LEFT exists
            if (deQNode.left !== null) {
                q.push(deQNode.left);
            }

            // enQ if a RIGHT exists
            if (deQNode.right !== null) {
                q.push(deQNode.right);
            }

            // if the Q is empty, that means the current Node in the current level
            // is the lastNode & the current level is the last.
            if (q.length === 0 && !lastNode) {
                lastNode = deQNode;
                break;
            }

            // decrement size to complete iteration over the currentsnapshot
            // note that, for eg) our snapshot may be sized 2, which means
            // we are deQ'ing twice. But, there may be child elements being
            // enQ'd at the same time
            --size;
        }

        // reset Q length, to fix the next level snapshot size
        size = q.length;
    }

    if (lastNode && parent && nodeToDelete) {
        if (nodeToDelete.val) {
            nodeToDelete.val = lastNode.val;
        }
        if (nodeToDelete.data) {
            nodeToDelete.data = lastNode.data;
        }
        if (parent.left === nodeToDelete) {
            parent.left = null;
        } else {
            parent.right = null;
        }
        nodeToDelete = undefined;
        return true;
    }

    return false;
};

/**
 * Destroys the tree by doing a post order traversal and deleting the
 * LEFT and RIGHT subtrees, before deleting the ROOT.
 * @param {TreeNode} root
 */
exports.destroyTree = root => {
    if (!root) {
        console.warn(`Tree is empty already`);
        return;
    }

    // Does a post order traversal,
    // deletes the child nodes before deletion of the parent.
    // Post Order Traversal follows the L-R-D order
    let currentNode = root;
    let hasLeft = false;
    let hasRight = false;
    let stack = [];
    let prevNode = null;

    while ((currentNode !== null) || (typeof currentNode !== 'undefined')) {
        hasLeft = (currentNode.left !== null);
        hasRight = (currentNode.right !== null);

        // when there is a left or right, push into the stack
        if (hasLeft || hasRight) {
            stack.unshift(currentNode);
        }

        // if there is a LEFT, process it first
        if (hasLeft) {
            currentNode = currentNode.left;
            continue;
        }

        // if a LEFT is absent, but a RIGHT exists, process it
        if (!hasLeft && hasRight) {
            currentNode = currentNode.right;
            continue;
        }

        // if a given Node has neither RIGHT nor LEFT subtree, => its a LEAF
        // then it has to be deleted from the parent
        // For this we need to retrieve the parent which is in the top of the stack
        if (!hasLeft || !hasRight) {
            // peek the top of the stack
            // don't pop it off, cos if there is a RIGHT subtree,
            // then, that will have to be processed.
            prevNode = stack[0];

            // if there isn't any on the stack => currentNode is the lastNode
            // => current is the root, per post order traversal
            // reset it to undefined and break the loop
            if (!prevNode) {
                currentNode = undefined;
                break;
            }

            // if the currentNode is the LEFT of the parent,
                // reset parent.Left to NULL,
                // proceed to check if a RIGHt exists.
                    // if a RIGHT exists, process it.
                    // if a RIGHT did not exist
                        // pop the node off the stack
                        // and process it (as it has become a LEAF now)
            // if the currentNode is teh RIGHT of the parent,
                // reset parent.RIGHT to NULL
                // pop the node off the stack
                // process the popped now (as it has become a LEAF now)
            if (prevNode.left === currentNode) {
                prevNode.left = null;
                if (prevNode.right) {
                    currentNode = prevNode.right;
                } else {
                    currentNode = stack.shift();
                }
            } else if (prevNode.right === currentNode) {
                prevNode.right = null;
                currentNode = stack.shift();
            }

            prevNode = null;
        }
    }

    return;
};
