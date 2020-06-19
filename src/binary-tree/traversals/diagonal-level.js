'use strict';

exports.diagonalLevel = (root) => {
    if (!root) {
        return null;
    }

    const stack = [];
    const slopeDistanceMap = {};

    let currentNode = root;
    let hasLeft = false;
    let hasRight = false;
    let prevNode = null;

    let slope = 0;

    while ((currentNode !== null) && (typeof currentNode !== 'undefined')) {
        // check for left and right subtrees
        hasLeft = (currentNode.left !== null);
        hasRight = (currentNode.right !== null);

        if (!slopeDistanceMap[slope]) {
            slopeDistanceMap[slope] = [];
        }

        // push it into the resultant map at the appropriate slope
        slopeDistanceMap[slope].push(currentNode.data || currentNode.val);

        // Left or right exists, push it onto a stack
        if (hasLeft || hasRight) {
            stack.unshift(currentNode);
        }

        // if a LEFT exists, begin processing left subtree
        // increment slope
        if (hasLeft) {
            currentNode = currentNode.left;
            ++slope;
            continue;
        }

        // for a given subtree root, if a right exists,
        // process it only if the LEFT subtree is absent
        // Since the right stays at same level as root, no changes to slope
        if (!hasLeft && hasRight) {
            currentNode = currentNode.right;
            continue;
        }

        // neither left nor right => LEAF
        // pop previous ancestor from stack
        // this popped element may or may not have a RIGHT subtree
        // Since we are pushing it with the condition that a child exists.
        // This is done cos it helps backtrack one slope step at a time.
        // Bt this node is already processed (due to pre-order)
        if (!hasLeft && !hasRight) {
            while (prevNode === null) {
                prevNode = stack[0];

                if (!prevNode) {
                    currentNode = null;
                    break;
                }

                // if we are bactracking to an ancestor from a left subtree
                // then its a decrement over the slope.
                // However, if we are backtracking from a right
                if (prevNode.left === currentNode) {
                    --slope;
                }

                if ((prevNode.right !== null) && (prevNode.right !== currentNode)) {
                    currentNode = prevNode.right;
                    break;
                }

                stack.shift();
                currentNode = prevNode;
                prevNode = null;
            }
        }
    }

    return result;
};
