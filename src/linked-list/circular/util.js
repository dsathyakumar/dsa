'use strict';

exports.insertFirst = (list, node) => {
    let nextNode = list.head;

    if (nextNode === null) { // no first was there
        node.next = node;
    } else { // there was already a first
        node.next = nextNode;
    }

    list.head = node;
    list.length++;
    nextNode = undefined;
};

exports.insertLast = (list, node) => {
    let currentNode = list.head;

    while(currentNode) {
        // this is the last Node
        if (currentNode.next === list.head) {
            currentNode.next = node;
            node.next = list.head;
            list.length++;
            break;
        }
        currentNode = currentNode.next;
    }
};

exports.insertAtIndex = (list, node, index) => {
    let currentNode = list.head,
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

        if (currentNode.next === list.head) {
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }
};

exports.deleteFirst = list => {
    let currentNode = list.head;
    list.head = currentNode.next;
    currentNode = undefined;
    list.length--;
};

exports.deleteLast = list => {
    let currentNode = list.head,
        prevNode = null;

    while(currentNode) {
        if (currentNode.next === list.head) {
            prevNode.next = list.head;
            currentNode = undefined;
            list.length--;
            break;
        }

        prevNode = currentNode;
        currentNode = currentNode.next;
    }
};

exports.deleteAtIndex = (list, index) => {
    let currentNode = list.head,
        idx = 0,
        prevNode = null;
    
    while(currentNode) {
        if (idx === index) {
            prevNode.next = currentNode.next;
            currentNode = undefined;
            list.length--;
            break;
        }

        if (currentNode.next === list.head) {
            break;
        }

        prevNode = currentNode;
        currentNode = currentNode.next;
        idx++;
    }
};

exports.rreverse = node => {
    if (node !== null && (node.next === list.head)) {
        return node;
    }

    const reversedHead = this.rreverse(node.next)

    node.next.next = node;
    node.next = null;

    return reversedHead;
};
