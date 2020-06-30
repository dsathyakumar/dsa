'use strict';

/**
 * This returns the count of the internal Nodes (non-leaf nodes)
 * @param {TreeNode} root
 * @returns {Number} internalNodeCount
 */
exports.getInternalNodeCount = root => {
    if (!root) {
        console.warn('Tree is empty!');
        return -1;
    }

    // count of the number of internal nodes nodes (nodes with atleast one child)
    let internalNodeCount = 0;

    // the Q that holds the node as part of level order traversal
    const q = [root];

    // the node that is deq'd upon every iteration
    let deqNode;

    while (q.length) {
        // deQ from the Q
        deqNode = q.shift();

        // if either of left or the right subtrees exist, then its an internal node
        if ((deqNode.left !== null || deqNode.right !== null)) {
            ++internalNodeCount;
        }

        // if a LEFT exists, enQ it
        if (deqNode.left) {
            q.push(deqNode.left);
        }

        // if a RIGHT exists, enQ it
        if (deqNode.right) {
            q.push(deqNode.right);
        }
    }

    return internalNodeCount;
};

exports.getNonTerminalNodeCount = this.getInternalNodeCount;

/**
 * This gets the count of the number of Leaf nodes in a binary Tree
 * @param {TreeNode} root
 * @returns {Number} leafNodeCount
 */
exports.getLeafNodeCount = root => {
    if (!root) {
        console.warn('Tree is empty!');
        return -1;
    }

    // count of the number of leaves
    let leafCount = 0;

    // the Q that holds the node as part of level order traversal
    const q = [root];

    // the node that is deq'd upon every iteration
    let deqNode = null;

    while (q.length) {
        // deQ from the Q
        deqNode = q.shift();

        // neither left nor right, increment the count, cos the node is a LEAF
        if ((deqNode.left === null) && (deqNode.right === null)) {
            ++leafCount;
        }

        // if a LEFT exists, enQ it
        if (deqNode.left) {
            q.push(deqNode.left);
        }

        // if a RIGHT exists, enQ it
        if (deqNode.right) {
            q.push(deqNode.right);
        }
    }

    return leafCount;
};

/**
 * This returns the count of the number of Nodes that have 2 child Nodes
 * @param {TreeNode} root
 * @returns {Number} fullNodeCount
 */
exports.getFullNodeCount = root => {
    if (!root) {
        console.warn('Tree is empty!');
        return -1;
    }

    // count of the number of full nodes
    let fullNodeCount = 0;

    // the Q that holds the node as part of level order traversal
    const q = [root];

    // the node that is deq'd upon every iteration
    let deqNode;

    while (q.length) {
        // deQ from the Q
        deqNode = q.shift();

        // if both left and right subtrees exist for the given node, increment count
        if (deqNode.left !== null && deqNode.right !== null) {
            ++fullNodeCount;
        }

        // if a LEFT exists, enQ it
        if (deqNode.left) {
            q.push(deqNode.left);
        }

        // if a RIGHT exists, enQ it
        if (deqNode.right) {
            q.push(deqNode.right);
        }
    }

    return fullNodeCount;
};

/**
 * This returns the count of the number of half nodes in the Binary Tree
 * @param {TreeNode} root
 * @returns {Number} halfNodeCount
 */
exports.getHalfNodeCount = root => {
    if (!root) {
        console.warn('Tree is empty!');
        return -1;
    }

    // count of the number of half nodes (nodes with only 1 child)
    let halfNodeCount = 0;

    // the Q that holds the node as part of level order traversal
    const q = [root];

    // the node that is deq'd upon every iteration
    let deqNode;

    while (q.length) {
        // deQ from the Q
        deqNode = q.shift();

        // if only either the left or the right subtrees exist, but not both
        if ((deqNode.left === null && deqNode.right !== null)
            || (deqNode.left !== null || deqNode.right === null)) {
            ++halfNodeCount;
        }

        // if a LEFT exists, enQ it
        if (deqNode.left) {
            q.push(deqNode.left);
        }

        // if a RIGHT exists, enQ it
        if (deqNode.right) {
            q.push(deqNode.right);
        }
    }

    return halfNodeCount;
};

/**
 * Returns the number of levels in the binary tree.
 * @param {TreeNode} root
 * @returns {Number} levelCount
 */
exports.numberOfLevels = root => {
    if (!root) {
        console.warn('Tree is empty!');
        return -1;
    }

    let levelCount = 0;

    const q = [root];
    let size = q.length;
    let deqNode;

    // iterate for as long as Q is not empty
    while (q.length) {
        // increment level
        ++levelCount;

        // iterate for the current snapshot size of the Q (which is the current level)
        while (size !== 0) {
            // deQ from the Q
            deqNode = q.shift();

            // if a LEFT exists, enQ
            if (deqNode.left) {
                q.push(deqNode.left);
            }

            // if a RIGHT exists, enQ
            if (deqNode.right) {
                q.push(deqNode.right);
            }

            // decrement size of the number of elements in the level
            --size;
        }

        // reset size of the Q
        size = q.length;
    }

    return levelCount;
};

/**
 * Returns the number of Nodes in the Binary Tree.
 * Note that for N nodes of the Tree, there are (N-1) edges.
 * @param {TreeNode} root
 * @returns {Number} nodeCount
 */
exports.numberOfNodes = root => {
    if (!root) {
        console.warn('Tree is empty!');
        return -1;
    }

    // count of the number of half nodes (nodes with only 1 child)
    let nodeCount = 1;

    // the Q that holds the node as part of level order traversal
    const q = [root];

    // the node that is deq'd upon every iteration
    let deqNode;

    while (q.length) {
        // deQ from the Q
        deqNode = q.shift();

        // if a LEFT exists, enQ it
        if (deqNode.left) {
            ++nodeCount;
            q.push(deqNode.left);
        }

        // if a RIGHT exists, enQ it
        if (deqNode.right) {
            ++nodeCount;
            q.push(deqNode.right);
        }
    }

    return nodeCount;
};

/**
 * Returns the number of edges in a Tree
 * @param {TreeNode} root
 */
exports.numberOfEdges = root => {
    if (!root) {
        console.warn('Tree is empty!');
        return -1;
    }

    // if, only Root exists, the number of edges = 0
    return (this.numberOfNodes - 1);
};

// the following are other terms used to refer to Leaf Nodes
exports.getTerminalNodeCount = this.getLeafNodeCount;
exports.getExternalNodeCount = this.getLeafNodeCount;
