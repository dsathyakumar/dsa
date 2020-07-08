'use strict';

/**
 * Gets the TOP view of the Binary Tree
 * By the TOP view, we mean the nodes that are visible when the tree is viewed from the TOP
 * This can be got via Vertical Order Traversal, with the 1st Node in each vertical making it to the
 * view.
 * 
 * Vertical order Traversa internally uses pre-order traversal.
 * Instead of pushing into a stack for only those nodes that have a LEFT && RIGHT subtree,
 * now we push if LEFT || RIGHT existed. This will help reduce lengths as we backtrack.
 * Pre-order traversal is used here, so that the node is first visited w.r.t. top.
 * 
 * Moving forward:
 * - Here, the root node is assumed to be at (x, y) = (0, 0)
 * - Going left, would be (X - 1, Y - 1) => decrement
 * - Going right, would be (X + 1, Y - 1) => increment
 * 
 * LoopBack:
 * - Looping back to a parent from a left child, would be moving from (X-1, Y-1) to (X, Y)
 *      => increment
 * - Looping back to a parent from a right child, would be moving from (X+1, Y-1) to (X, Y)
 *      => decrement
 * @param {TreeNode} root
 * @returns {Array} result
 */
exports.topView = root => {
    const result = [];

    if (!root) {
        console.warn(`Tree is empty!`);

    }

    const stack = [];
    const distanceMap = {};

    let currentHorizontalDistance = 0;
    let maxHD = 0;
    let minHD = 0;

    let currentNode = root;
    let hasLeft = false;
    let hasRight = false;
    let prevNode = null;

    while (currentNode !== null && typeof currentNode !== 'undefined') {
        if (!distanceMap[currentHorizontalDistance]) {
            distanceMap[currentHorizontalDistance] = (currentNode.data || currentNode.val);
        }

        hasLeft = (currentNode.left !== null);
        hasRight = (currentNode.right !== null);

        if (hasLeft || hasRight) {
            stack.unshift(currentNode);
        }

        if (hasLeft) {
            currentHorizontalDistance = (currentHorizontalDistance - 1);
            minHD = Math.min(minHD, currentHorizontalDistance);
            currentNode = currentNode.left;
            continue;
        }

        if (!hasLeft && hasRight) {
            currentHorizontalDistance = (currentHorizontalDistance + 1);
            maxHD = Math.max(maxHD, currentHorizontalDistance);
            currentNode = currentNode.right;
            continue;
        }

        if (!hasLeft && !hasRight) {
            while (prevNode === null) {
                prevNode = stack[0];

                if (!prevNode) {
                    currentNode = null;
                    break;
                }

                currentHorizontalDistance = (prevNode.left === currentNode) ? (currentHorizontalDistance + 1) : (currentHorizontalDistance - 1);

                if ((prevNode.right !== null) && (prevNode.right !== currentNode)) {
                    currentHorizontalDistance = (currentHorizontalDistance + 1);
                    maxHD = Math.max(maxHD, currentHorizontalDistance);
                    currentNode = prevNode.right;
                    prevNode = null;
                    break;
                }

                stack.shift();
                currentNode = prevNode;
                prevNode = null;
            }
        }
    }

    for (let count = minHD; count <= maxHD; count++) {
        result.push(distanceMap[count]);
    }

    return result;
};

/**
 * Gets the BOTTOM view of the Binary Tree
 * By the BOTTOM view, we mean the nodes that are visible when the tree is viewed from the BOTTOM
 * This can be got via Vertical Order Traversal, with the Last Node in each vertical making it to the
 * view.
 * 
 * Vertical order Traversal internally uses post-order traversal.
 * Post-order traversal is used here, so that the child node is first visited w.r.t. bottom.
 * 
 * Moving forward:
 * - Here, the root node is assumed to be at (x, y) = (0, 0)
 * - Going left, would be (X - 1, Y - 1) => decrement
 * - Going right, would be (X + 1, Y - 1) => increment
 * 
 * LoopBack:
 * - Looping back to a parent from a left child, would be moving from (X-1, Y-1) to (X, Y)
 *      => increment
 * - Looping back to a parent from a right child, would be moving from (X+1, Y-1) to (X, Y)
 *      => decrement
 * @param {TreeNode} root
 * @returns {Array} result
 */
exports.bottomView = root => {
    const result = [];

    if (!root) {
        console.warn(`Tree is empty!`);

    }

    const stack = [];
    const distanceMap = {};

    let currentHorizontalDistance = 0;
    let maxHD = 0;
    let minHD = 0;

    let currentNode = root;
    let hasLeft = false;
    let hasRight = false;
    let prevNode = null;

    while (currentNode !== null && typeof currentNode !== 'undefined') {
        hasLeft = (currentNode.left !== null);
        hasRight = (currentNode.right !== null);

        if (hasLeft || hasRight) {
            stack.unshift(currentNode);
        }

        if (hasLeft) {
            currentHorizontalDistance = (currentHorizontalDistance - 1);
            minHD = Math.min(minHD, currentHorizontalDistance);
            currentNode = currentNode.left;
            continue;
        }

        if (!hasLeft && hasRight) {
            currentHorizontalDistance = (currentHorizontalDistance + 1);
            maxHD = Math.max(maxHD, currentHorizontalDistance);
            currentNode = currentNode.right;
            continue;
        }

        if (!hasLeft && !hasRight) {
            if (!distanceMap[currentHorizontalDistance]) {
                distanceMap[currentHorizontalDistance] = (currentNode.data || currentNode.val);
            }

            while (prevNode === null) {
                prevNode = stack[0];

                if (!prevNode) {
                    currentNode = null;
                    break;
                }

                currentHorizontalDistance = (prevNode.left === currentNode) ? (currentHorizontalDistance + 1) : (currentHorizontalDistance - 1);

                if ((prevNode.right !== null) && (prevNode.right !== currentNode)) {
                    currentHorizontalDistance = (currentHorizontalDistance + 1);
                    maxHD = Math.max(maxHD, currentHorizontalDistance);
                    currentNode = prevNode.right;
                    prevNode = null;
                    break;
                }

                stack.shift();
                currentNode = prevNode;
                prevNode = null;
            }
        }
    }

    for (let count = minHD; count <= maxHD; count++) {
        result.push(distanceMap[count]);
    }

    return result;
};

/**
 * Gets the LEFT view of the Binary Tree
 * By the LEFT view, we mean the nodes that are visible when the tree is viewed from the LEFT
 * This can be got via Level Order Traversal, with the 1st Node in each level making it to the
 * view
 * @param {TreeNode} root
 * @returns {Array} result
 */
exports.leftView = (root) => {
    const result = []

    if (!root) {
        console.warn(`Tree is empty!`);
        return result;
    }

    // Q to hold child nodes of current level (in next level)
    // starts with Root
    const q = [root];
    
    let size = q.length;
    let deqNode;

    // default is TRUE at the start of every level (here it starts with root)
    let isFirstNodeInLevel = true;

    // proceed as long as Q is not empty
    while (q.length) {
        // iterate over current Q size snapshot
        // (holds the current elements for the level)
        while (size !== 0) {
            // deQ from front of Q
            deqNode = q.shift();

            // if its the 1st node in every level, then 
            if (isFirstNodeInLevel) {
                result.push(deqNode.data || deqNode.val);
                isFirstNodeInLevel = false;
            }

            // if LEFT, enQ LEFT into Rear of Q
            if (deqNode.left) {
                q.push(deqNode.left);
            }

            // if RIGHT, enQ RIGHT into Rear of Q
            if (deqNode.right) {
                q.push(deqNode.right);
            }

            // reduce size counter for current snapshot
            --size;
        }

        // reset Q snapshot size
        size = q.length;

        // reset the isFirstNodeInLevel variable
        isFirstNodeInLevel = true;
    }

    return result;
};

/**
 * Gets the RIGHT view of the Binary Tree
 * By the RIGHT view, we mean the nodes that are visible when the tree is viewed from the RIGHT
 * This can be got via Level Order Traversal, with the last Node in each level making it to the
 * view
 * @param {TreeNode} root
 * @returns {Array} result
 */
exports.rightView = root => {
    const result = []

    if (!root) {
        console.warn(`Tree is empty!`);
        return result;
    }

    // Q to hold child nodes of current level (in next level)
    // starts with Root
    const q = [root];
    
    let size = q.length;
    let deqNode;

    // proceed as long as Q is not empty
    while (q.length) {
        // iterate over current Q size snapshot
        // (holds the current elements for the level)
        while (size !== 0) {
            // deQ from front of Q
            deqNode = q.shift();

            // then this is the last node in the Q snapshot
            if ((size - 1) === 0) {
                result.push(deqNode.val || deqNode.data);
            }

            // if LEFT, enQ LEFT into Rear of Q
            if (deqNode.left) {
                q.push(deqNode.left);
            }

            // if RIGHT, enQ RIGHT into Rear of Q
            if (deqNode.right) {
                q.push(deqNode.right);
            }

            // reduce size counter for current snapshot
            --size;
        }

        // reset Q snapshot size
        size = q.length;
    }

    return result;
};
