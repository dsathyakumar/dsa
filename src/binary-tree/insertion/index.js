'use strict';

exports.insert = (root, size) => {
    // begin a level order traversal from the Root Node.
    let currentNode = root;

    // Store the LEFT and RIGHT in the same order.
    // So that the LEFT goes into the Q 1st and is the 1st to be deQ'd.
    // Followed by the RIGHT.
    let q = new DynamicCircularArrayQueue(size);

    while (currentNode !== null && typeof currentNode !== 'undefined') {
        // check if the LEFT is empty, and insert & break
        // else, enqueue it.
        if (currentNode.left === null) {
            currentNode.left = data;
            break;
        } else {
            q.enqueue(currentNode.left);
        }

        // check if the RIGHT is empty, and insert & break
        // else, enqueue it.
        if (currentNode.right === null) {
            currentNode.right = data;
            break;
        } else {
            q.enqueue(currentNode.right);
        }

        // to get the next node for iteration, deque the Q
        currentNode = q.dequeue();
    }

    return;
};
