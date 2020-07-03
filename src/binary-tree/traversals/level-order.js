'use strict';

const {
    DynamicCircularArrayQueue
} = require('../../queue/dynamic-circular-array-queue/dynamic-circular-array-queue');

const {
    DynamicArray
} = require('../../array-list/array-list');

/**
 * This traverses the TREE based on levels & with each level traversed from Left to Right
 * The entire result is returned aggregated into 1 array
 * @param {TreeNode} root
 * @param {Number} size
 */
exports.levelOrder = (root, size) => {
    // Q to store the elements (for further processing of child nodes)
    const q = new DynamicCircularArrayQueue(size);
    const result = new DynamicArray(size);

    let currentNode = root;

    // proceed until the currentNode is NOT null
    // when its NULL, the Q will also be empty.
    // if there was only 1 Node, then it will stop after the 1st iteration
    while (currentNode !== null && typeof currentNode !== 'undefined') {
        // process currentNode
        console.log(currentNode.data);
        result.push(currentNode.data);

        // push LEFT into Q
        if (currentNode.left) {
            q.enqueue(currentNode.left);
        }

        // push RIGHT into Q
        if (currentNode.right) {
            q.enqueue(currentNode.right);
        }

        // next element got by a deQ
        currentNode = q.dequeue();
    }

    return result;
};

// LC 102
exports.levelOrderIntoSeparateArrays = (root) => {
    if (!root) {
        console.warn(`Tree is empty`);
        return;
    }

    let q = [];
    let result = [];

    q.push(root);

    let deQElement,
        level = 0;

    while (q.length) {
        if (!result[level]) {
            result[level] = [];
        }

        while (q.length) {
            result[level].push(q.shift());
        }

        for (let count = 0; count < result[level].length; count++) {
            let currentElement = result[level][count];
            if (currentElement.left) {
                q.push(currentElement.left);
            }

            if (currentElement.right) {
                q.push(currentElement.right);
            }
        }
    }
};

exports.levelOrderRecursive = root => {
    // if the tree is empty, return
    if (!root) {
        console.warn(`Tree is empty!`);
        return;
    }

    let level = 0;
    const result = [];

    // recursive function
    const traverseLevel = (node, level) => {
        if (level === 0) {
            result.push(node.data || node.val);
            return true;
        }

        if (node === null) {
            return;
        }

        const left = traverseLevel(node.left, level - 1);
        const right = traverseLevel(node.right, level - 1);

        return (left || right);
    }

    while(traverseLevel(root, level)) {
        ++level;
    }

    return result;
};

// The problem with this recursion approach is that it needs
// an extra array to store all the nodes of a level which bumps space complexity
// Already the call stack stores the recursive stages of the calls, so we dont
// want to further burder it.
// exports.levelOrderRecursive = (root) => {
//     if (!root) {
//         console.warn(`Tree is empty!`);
//         return;
//     }

//     // holds the result of all levels
//     const level = [];

//     const printLevel = (arrOfNodes) => {
//         let size = arrOfNodes.length;
//         let node;
//         let next = [];

//         if (!size) {
//             return;
//         }
        
//         while(size !== 0) {
//             node = arrOfNodes.shift();
//             level.push(node);

//             if (node.left) {
//                 next.push(node.left);
//             }

//             if (node.right) {
//                 next.push(node.right);
//             }

//             --size;
//         }

//         return printLevel(next);
//     };

//     printLevel([root]);

//     return level;
// };

/**
 * Performs level order traversal and puts the result of each level
 * into separate Arrays, in the reverse manner.
 * Each level is traversed from Left to Right
 * @param {TreeNode} root
 * @returns {Array}
 */
exports.levelOrderReverse = (root) => {
    // if the Tree was empty!...
    if (!root) {
        console.warn(`Tree is empty`);
        return;
    }

    // enQ the 1st element as the ROOT
    const q = [root];

    // An array of arrays (2D)
    const result = [];

    // currently deQ'd node from the Q
    let deqNode = null;

    // current snapshot size of the Q
    let size = q.length;

    // A new level array (holding the result of every level order traversal)
    let level = null;

    // iterate for as long as Q is not empty!
    while (q.length) {
        level = [];

        // iterate for the current snapshot size
        while (size !== 0) {
            // deQ from Q
            deqNode = q.shift();

            // push into current level result array
            level.push(deqNode.val || deqNode.data);

            // if current has a LEFT subtree, enQ it
            if (deqNode.left) {
                q.push(deqNode.left);
            }

            // if current has a RIGHT subtree, enQ it
            if (deqNode.right) {
                q.push(deqNode.right);
            }

            // decrement current Q snapshot size
            // (which represents number of elements in current lebel)
            --size;
        }

        // by unshifting, the 1st level gets pushed to the bottom
        // and the last level appears 1st in the result (2D array)
        result.unshift(level);

        // reset Q snapshot size to represent the number of elements in next level
        size = q.length;
    }

    return result;
};
