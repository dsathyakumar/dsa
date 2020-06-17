'use strict';

const {
    DynamicCircularArrayQueue
} = require('../../queue/dynamic-circular-array-queue/dynamic-circular-array-queue');

const {
    DynamicArray
} = require('../../array-list/array-list');

// This traverses the TREE based on levels & with each level traversed from Left to Right
const levelOrder = (root, size) => {
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

exports.levelOrder = levelOrder;

exports.levelOrderRecursive = () => {};
exports.levelOrderReverse = () => {};
