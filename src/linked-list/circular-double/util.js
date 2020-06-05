'use strict';

exports.rReverse = (node, tail) => {
    if (node !== null && node === tail) {
        return node;
    }


};

// With the tail pointer (head is accessed) & presence of prev & next pointers, insertFirst is O(1)
// Special Cases:
//  1. When list is empty
//  2. When list has only one element which is a circular reference
exports.insertFirst = (cdll, data) => {
    // when the list is empty, this is purely [circular ref]
    if (cdll.isEmpty()) {
        cdll.tail = data;
        data.next = data;
        data.prev = data;
    } else {
        // Current Tail must not change.
        // New node must be inserted between current Tail and current head
        // 1. Get the current head.
        // 2. Set Tail's next to point to data.
        // 3. Set data's prev to point to Tail.
        // 4. Set data's next to point to head.
        // 5. Set head's prev to point to data.
        // 6. Length++
        let head = cdll.tail.next;
        cdll.tail.next = data;
        data.prev = cdll.tail;
        data.next = head;
        head.prev = data;
    }

    cdll.length++;
    return;
};

// With the tail pointer & presence of prev & next pointers, insertLast is O(1)
// special cases:
//  1. When the list has only 1 element (tail) which is a [circular ref] and we do insertLast
exports.insertLast = (cdll, data) => {
    // Current Tail will change.
    // New node must be inserted between current Tail and current head
    // tail will point to new node.
    let head = cdll.tail.next;
    cdll.tail.next = data;
    data.prev = cdll.tail;
    data.next = head;
    head.prev = data;
    // one extra line diff between insertFirst and insertLast
    cdll.tail = data;
    cdll.length++;
    return;
};

// This is O(N) and does not execute for insert at head or insert at tail
exports.insertAtIndex = (cdll, data, index) => {
    let currentNode = cdll.tail.next,
        idx = 0,
        nextNode;
    
    while(currentNode) {
        if ((idx + 1) === index) {
            // 1. Get the next Node.
            // 2. Set currentNode.next = data
            // 3. Set data.prev = currentNode.
            // 4. Set data.next = nextNode
            // 5. Set nextNode.prev = data
            // 6. Length++
            nextNode = currentNode.next;
            currentNode.next = data;
            data.prev = currentNode;
            data.next = nextNode;
            nextNode.prev = data;
            cdll.length++;
            nextNode = undefined;
            break;
        }

        // safety exit latch
        if (currentNode === cdll.tail) {
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }

    return;
};

// This is O(1) and is executed when index = 0 or when list has only 1 element.
// Special case, when the list has only 2 elements / 1 element
exports.deleteFirst = (cdll) => {
    // if there is only 1 elem left, it will be a [circular] ref to itself
    let head = cdll.tail.next;

    let deletedValue = head.data;

    if (cdll.size() === 1) {
        // remove [circular ref] and set tail pointer to NULL
        cdll.tail.next = null;
        cdll.tail.prev = null;
        cdll.tail = null;
    } else {
        // 1. Get the current Head.
        // 2. Set the Tail's next to point to head's next.
        // 3. Set the head's next's prev pointer to point back to tail.
        // 4. Decrement length
        cdll.tail.next = head.next;
        head.next.prev = cdll.tail;
    }
    
    head = undefined;
    cdll.length--;

    return deletedValue;
};

// Special case, when the list has only 2 elements
exports.deleteLast = (cdll) => {
    let deletedValue = cdll.tail.data;

    let head = cdll.tail.next;
    let prevNode = cdll.tail.prev;

    prevNode.next = head;
    head.prev = prevNode;
    cdll.tail = undefined;
    cdll.tail = prevNode;

    cdll.length--;

    return deletedValue;
};

// This is O(N)
exports.deleteAtIndex = (cdll, index) => {
    let deletedValue;

    let currentNode = cdll.tail.next,
        idx = 0;

    while(currentNode) {
        // index matches (bounds already checked)
        // method wont execute for idx = head or idx = tail
        if (idx === index) {
            deletedValue = currentNode.data;
            // 1. Set currentNode's, previous Node's (accessed as currentNode.prev), next pointer to be nextNode
            // 2. Set currentNode's, next Node's (accessed as currentNode.next), prev pointer to be prevNode
            // 3. Set currentNode as undefined
            currentNode.prev.next = currentNode.next;
            currentNode.next.prev = currentNode.prev;
            currentNode = undefined;
            cdll.length--;
            break;
        }

        // safety exit latch
        if (currentNode === cdll.tail) {
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }

    return deletedValue;
};
