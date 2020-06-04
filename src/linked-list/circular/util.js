'use strict';

exports.insertFirst = (list, node) => {
    if (!list.tail) { // when tail is NULL (=> no elements in list)
        list.tail = node;
        node.next = node; // [circular ref]
    } else {
        let currentHead = list.tail.next;
        list.tail.next = node;
        node.next = currentHead;
        currentHead = undefined;
    }

    list.length++;

    return;
};

// inserts after current last index
exports.insertLast = (list, node) => {
    let currentNode = list.tail.next,
        idx = 0;

    while(currentNode) {
        // currentNode is the lastIndex node or the tail
        if ((idx + 1 === list.length) && (currentNode === list.tail)) {
            let currentTailNode = list.tail;
            node.next = currentTailNode.next;
            currentTailNode.next = node;
            list.tail = node;
            list.length++;
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }

    return;
};

exports.insertAtIndex = (list, node, index) => {
    let currentNode = list.tail.next,
        idx = 0;

    while(currentNode) {
        if (idx + 1 === index) {
            let nextNode = currentNode.next;
            currentNode.next = node;
            node.next = nextNode;
            nextNode = undefined;
            list.length++;
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }

    return;
};

exports.deleteFirst = list => {
    let deletedValue;

    // if this is the only Node left, there will be a circular ref, so just set it as NULL
    if (list.tail.next === list.tail) {
        deletedValue = list.tail.data;
        list.tail = undefined;
        list.tail = null;
    } else {
        let head = list.tail.next;
        deletedValue = head.data;
        list.tail.next = head.next;
        head = undefined;
    }

    list.length--;

    return deletedValue;
};

exports.deleteLast = list => {
    let deletedValue;

    // does not include deleteFirst (1 Node case is handled by deleteFirst)
    let currentNode = list.tail.next;

    while(currentNode) {
        // next is the last node (current tail.)
        if (currentNode.next === list.tail) {
            deletedValue = list.tail.data;
            currentNode.next = list.tail.next;
            list.tail = undefined;
            list.tail = currentNode;
            list.length--;
            break;
        }

        currentNode = currentNode.next;
    }

    return deletedValue;
};

exports.deleteAtIndex = (list, index) => {
    let deletedValue;

    let currentNode = list.tail.next,
        idx = 0,
        prevNode = list.tail;
    
    while(currentNode) {
        if (idx === index) {
            deletedValue = currentNode.data;
            prevNode.next = currentNode.next;
            currentNode = undefined;
            list.length--;
            break;
        }

        prevNode = currentNode;
        currentNode = currentNode.next;
        idx++;
    }

    return deletedValue;
};

exports.rreverse = (node, head) => {
    // return the tailNode first
    if (node !== null && (node.next === head)) {
        return node;
    }

    // if the tail node was returned, this will be the newHead
    // and the `node` in the argument is the previous node
    const reversedHead = this.rreverse(node.next, head)

    node.next.next = node;
    node.next = null;

    return reversedHead;
};
