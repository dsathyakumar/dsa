'use strict';

/**
 * The diameter of a tree (sometimes called the width) is the number of nodes
 * on the longest path between two leaves in the tree.
 * 
 * Some questions also express this length as the count of the number of edges
 * along the longest path between two nodes in a tree.
 * 
 * Some definitions also include the width of the tree as the level of the tree
 * which has max number of nodes. (Quora)
 * https://www.quora.com/What-is-width-of-a-binary-tree-And-what-is-its-diameter
 * For this, level order traversal can be used to compute the level which has
 * max number of nodes & the value of that max node count per level.
 * 
 * To compute the diameter, we need to know that, the max diameter can occur
 * - along a path that includes the root node (under consideration)
 * - along a path that does not include the root node (under consideration)
 * 
 * This brings us to 3 cases:
 * --------------------------------------------------------------------------------
 * - CASE A: Its the diameter of the LEFT subtree (OR)
 *      This does not include the current Node
 * 
 * - CASE B: Its the diameter of the RIGHT subtree (OR)
 *      This does not include the current Node
 * 
 * - CASE C: Its along a path that is via the current node
 *      (which can be computed via heights of left subtree and rigt subtree)
 * 
 * POINTS to REMEMBER:
 * ---------------------------------------------------------------------------------
 * Height of a node => (Math.max(Height_LEFT, Height_RIGHT) + 1)
 * Diameter of a node => Math.max(
 *                          (Height_LEFT + Height_RIGHT + 1),
 *                          Math.max(Diameter_LEFT, Diameter_RIGHT)
 *                      );
 */

 /**
  * Computes the Diameter of the Given Tree recursively
  * We assume a null node to return a 0.
  * Diameter computation requires knowledge of computing the height as well.
  * Per the assumption, an empty tree would be a 0 and a Tree with only the root
  * would have a height 1.
  * @param {TreeNode} root
  * @returns {Number} diameter
  */
exports.recursiveDiameter = (root) => {
    // indirect recursion here.
    const computeDimensions = (node) => {
        // In the same computation we return both the height and diameter.
        // Ultimate base case of recursion. There is no looping back here.
        if (node === null || typeof node === 'undefined') {
            return {
                h: 0,
                d: 0
            };
        }
        
        // recursive dimenions compute for LEFT subtree
        const leftDimensions = computeDimensions(node.left);

        // recursive dimenions compute for RIGHT subtree
        const rightDimensions = computeDimensions(node.right);
        
        // return the height and diameter for every node
        return {
            h: (Math.max(leftDimensions.h, rightDimensions.h) + 1),
            d: (Math.max(
                // accounts for paths that go via the root
                (leftDimensions.h + rightDimensions.h + 1),
                // accounts for paths that dont go via the Root
                Math.max(leftDimensions.d, rightDimensions.d)
            ))
        }
    }

    // begin the recursion from the root
    let diameter = computeDimensions(root);
    return (diameter !== 0) ? (diameter - 1) : (diamter);
};

/**
  * Computes the Diameter of the Given Tree Iteratively
  * @param {TreeNode} root
  * @returns {Number} diameter
  */
exports.diamter = (root) => {
    // when the tree is NULL
    if (!root) {
        console.warn(`Tree is empty!`);
        return;
    }

    // stack to hold post order traversal
    const stack = [];

    // map to store dimensions of subtrees
    const nodeDimensionsMap = new Map();

    // default Node and LeafNode dimensions
    const defaultLeafDimensions = {h: 1, d: 1};
    const defaultDimensions = {h: 0, d: 0};

    let currentNode = null;
    let hasLeft = false;
    let hasRight = false;
    let prevNode = null;
    let leftDimensions;
    let rightDimensions;

    // returnable maxDiameter
    let maxDiameter = 0;

    while (currentNode !== null) {
        hasLeft = (currentNode.left !== null);
        hasRight = (currentNode.right !== null);

        if (hasLeft || hasRight) {
            stack.unshift(currentNode);
        }

        if (hasLeft) {
            currentNode = currentNode.left;
            continue;
        }

        if (!hasLeft && hasRight) {
            currentNode = currentNode.right;
            continue
        }

        if (!hasLeft && !hasRight) {
            nodeDimensionsMap.set(currentNode, defaultLeafDimensions);

            while (prevNode === null) {
                // peek the previous ancestor from the stack
                prevNode = stack[0];

                if (!prevNode) {
                    currentNode = null;
                    maxDiameter = nodeDimensionsMap.get(currentNode).d;
                    break;
                }

                // if it has a right and if that right is not the same as currentNode
                // process it. This is the usual step.
                if (prevNode.right !== null && prevNode.right !== currentNode) {
                    currentNode = prevNode.right;
                    prevNode = null;
                    break;
                }

                // if neither a right existed or if the currentNode that was processed is the right
                // time to pop it off the stack.
                // when its popped off the stack, its time to compute the
                // LH (left subtree max-height), RH (right subtree max-height), LD (left diameter), RD (right diameter)
                // push those details into the nodeDimensionsMap
                // remove the details of its child nodes from the map

                // pop it from stack and assign to currentNode (so that it backtracks)
                currentNode = stack.shift();

                // get left and right dimensions from the map
                leftDimensions = nodeDimensionsMap.get(currentNode.left) || defaultDimensions;
                rightDimensions = nodeDimensionsMap.get(currentNode.right) || defaultDimensions;

                // delete the data stored for the left
                if (nodeDimensionsMap.has(currentNode.left)) {
                    nodeDimensionsMap.delete(currentNode.left);
                }

                // delete the data stored for the right
                if (nodeDimensionsMap.has(currentNode.right)) {
                    nodeDimensionsMap.delete(currentNode.right);
                }

                // set the dimensions for the currentNode (compute it)
                nodeDimensionsMap.set(currentNode, {
                    h: (Math.max(leftDimensions.h, rightDimensions.h) + 1),
                    d: (Math.max(
                        (leftDimensions.h + rightDimensions.h + 1),
                        Math.max(leftDimensions.d, rightDimensions.d)
                    ))
                })

                // reset prevNode to NULL, so that it can pick off the next ancestor from the stack
                prevNode = null;
            }
        }
    }

    return maxDiameter;
};

/**
 * Computes the Width of the Binary Tree Iteratively
 * using Level Order Traversal.
 * The Width of the Binary Tree is the max node count in a level (among all levels).
 * @param {TreeNode} root
 * @returns {Number} count
 */
exports.width = (root) => {
    if (!root) {
        console.warn(`Tree is empty!`);
        return;
    }

    // start iteration with the rootNode into the Q
    const q = [root];

    // initial snapshot size of the Q
    let size = q.length;

    // result - max node count per level
    let maxNodeCount = 1;
    let deqNode = null;

    // proceed until Q is empty
    while (q.length) {
        // iterate upto the current snapshot size
        while (size !== 0) {
            // deQ from front of Q
            deqNode = q.shift();

            // if LEFT, enQ into rear of Q
            if (deqNode.left) {
                q.push(deqNode.left);
            }

            // if RIGHT, enQ into rear of Q
            if (deqNode.right) {
                q.push(deqNode.right);
            }

            // decrement size
            --size;
        }

        // reset size to hold the count current size of Q
        size = q.length;

        // if the maxNodeCount is < new size, update maxNodeCount
        maxNodeCount = Math.max(maxNodeCount, size);
    }

    return maxNodeCount;
};

/**
 * Computes the width of the Binary Tree Recursively
 * Using Level Order Traversal. Here Width is the count of the max
 * number of Nodes in a tree (among all levels of the tree).
 * @param {TreeNode} root
 * @retuns {Number} maxNodeCount
 */
exports.widthRecursive = (root) => {
    // when the tree is empty.
    if (!root) {
        console.warn(`Tree is empty!`);
        return -1;
    }

    let maxNodeCount = 0;
    let level = 0;
    let sizePerLevel = -1;

    // loop back progressive, branched recursion
    const recursiveWidth = (root, lvl) => {
        // ultimate base case that stops the recursion
        if (!root)  {
            return false;
        }

        // base case for a pass
        if (lvl === 0) {
            ++sizePerLevel;
        }

        // compute LEFT
        const left = recursiveWidth(root.left);

        // compute RIGHT
        const right = recursiveWidth(root.right);

        // even if one of them returned a TRUE, there exists a next level
        return (left || right);
    };

    while (recursiveWidth(root, level)) {
        ++level;
        maxNodeCount = Math.max(maxNodeCount, sizePerLevel);
        sizePerLevel = 0;
    }

    return maxNodeCount;
};

/**
 * Returns the Level which has the max node count (iteratively)
 * @param {TreeNode} root
 * @returns {Number} levelWithMaxNodeCount
 */
exports.getLevelWithMaxNodeCount = (root) => {
    if (!root) {
        console.warn(`Tree is empty!`);
        return;
    }

    // start iteration with the rootNode into the Q
    const q = [root];

    // initial snapshot size of the Q
    let size = q.length;

    // result - max node count per level
    let maxNodeCount = 1;
    let deqNode = null;
    let currentLevel = -1;

    let levelWithMaxCount = -1;

    // proceed until Q is empty
    while (q.length) {
        // every loop entry is a new level
        ++currentLevel;

        // iterate upto the current snapshot size
        // basically enQ's the childNode's of current level into the Q
        // deQ's the current Node's off the Q, once their child nodes are enQ'd
        while (size !== 0) {
            // deQ from front of Q
            deqNode = q.shift();

            // if LEFT, enQ into rear of Q
            if (deqNode.left) {
                q.push(deqNode.left);
            }

            // if RIGHT, enQ into rear of Q
            if (deqNode.right) {
                q.push(deqNode.right);
            }

            // decrement size
            --size;
        }

        // reset size to hold the count current size of Q
        size = q.length;

        // if the maxNodeCount is < new size, update maxNodeCount
        if (size > maxNodeCount) {
            levelWithMaxCount = currentLevel;
        }
    }

    return levelWithMaxCount;
};
