'use strict';

/**
 * The Depth of a Tree and the Height of a Tree are same.
 * Although, their meanings vary w.r.t a Node.
 * 
 * HEIGHT:
 * Its computed from bottom to top. A tree is represented top-down, or grows
 * downward and the height is computed bottom to top. Its the number of edges
 * along a path from the farthest leaf to the root node. So, it can also be called
 * length of the path from the farthest leaf to the root.
 * 
 * DEPTH:
 * Its computed top-down. A tree is represented top-down and the depth is computed
 * top-down. Its the number of edges along a path from the root to the farthest leaf.
 * 
 * Since the number of levels ultimately gives the length of the longest path,
 * when computing iteratively, level order traversal can also be used to return the
 * height / depth of the tree.
 * 
 * There are two conventions to define the height of a Binary Tree:
 * ------------------------------------------------------------------------------
 * 1) Number of nodes on the longest path from the root to the deepest node.
 * 2) Number of edges on the longest path from the root to the deepest node.
 * 
 * Some take the height of the empty tree is -1. In which case, a tree with only Root
 * will have a height of 0. (One Node and 0 edges => computes height in terms of edges)
 * 
 * Some take the height of the empty tree as 0. In which case, a tree with only Root
 * will have a height of 1. This follows the convention of the number of nodes along
 * the longest path from root to a leaf. For a tree with only the Root, since its the
 * one and only node, this convention returns a 1.
 * 
 * Which ever means taken, follow the suitable convention associated with it.
 * 
 * Note that height of a node and depth of a node are not the same as height / depth 
 * of a tree.
 */

/**
 * Recursively computes the height / depth of the Binary Tree
 * @param {*} node 
 */
const recursiveComputation = (node) => {
    // Recursive base case
    if (node === null) {
        return -1;
    }
    // For any given node, compute the height/depth of the left subtree
    // Then the Right subtree, take the max of it
    // By taking max, we exclude those paths with less height
    // Finally add a 1 to account for the current node
    // which is one level above
    return (Math.max(
        recursiveComputation(node.left),
        recursiveComputation(node.right)
        ) + 1
    );
};

/**
 * Given a Root Node, determines the height / depth of the Binary Tree
 * Recursively
 * @param {TreeNode} root
 * @returns {Number} height
 */
exports.getHeightRecursively = exports.getDepthRecursively = (root) => {
    return recursiveComputation(root);
}

/**
 * Given a Root Node, determines the Height / Depth of the Binary Tree.
 * This makes use of Level order Traversal as the Height can also be said as
 * the number of levels in a tree.
 * @param {TreeNode} root
 * @returns {Number} height
 */
exports.getHeightIteratively = exports.getDepthIteratively = (root) => {
    // Starts off with the height of the empty tree which is -1
    const height = -1;

    // if empty tree, return -1.
    if (!root) {
        console.warn(`Tree is empty!`);
        return height;
    }

    const q = [root];
    let size = q.length;
    let deqNode = null;
    
    // proceed for as long as the Q is empty
    while (q.length) {
        // incremement height for the new level
        // if only a root existed, it would return height of 0
        // in terms of number of edges.
        // if this was about computing height in terms of number of nodes,
        // then the height could be set with a start value of 0 (for empty tree)
        // and then be 1 (for a tree with only 1 node, the root)
        ++height;

        // collect all the child nodes of the nodes of this level
        while (size !== 0) {
            // deQ from the front of the Q
            deqNode = q.shift();

            // enQ if a LEFT exists
            if (deqNode.left) {
                q.push(deqNode.left);
            }

            // enQ if a RIGHT exists
            if (deqNode.right) {
                q.push(deqNode.right);
            }

            // reduce the snapshost size
            --size;
        }

        // reset the Q snapshot size
        size = q.length;
    }

    // return height
    return height;
};
