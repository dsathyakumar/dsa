'use strict';

const pointerSwapper = node => {
    let tempNode = node.next;
    node.next = node.prev;
    node.prev = tempNode;
    tempNode = undefined;
};

exports.insertLast = (list, node) => {
    let currentNode = list.head;

    while(currentNode) {
        // then this is the last Node, there is no next node for this
        if (currentNode.next === null) {
            currentNode.next = node;
            node.prev = currentNode;
            node.next = null;
            list.length++;
            break;
        }

        currentNode = currentNode.next;
    }
};

exports.insertFirst = (list, node) => {
    node.prev = null;

    // current 1st node
    let tempNode = list.head;

    // make head to point to new Node as head node.
    list.head = node;

    node.next = tempNode;

    // GC the tempNode
    tempNode = undefined;

    // if the list was an empty list, node.next will be null
    // so have a check here, before fixing the prev pointer
    if (node.next) {
        node.next.prev = node;
    }

    list.length++;
};

exports.insertAtIndex = (list, node, index) => {
    let currentNode = list.head,
        idx = 0;

    while(currentNode) {
        if (idx === index) {
            currentNode.prev.next = node;
            node.next = currentNode;
            node.prev = currentNode.prev;
            currentNode.prev = node;
            list.length++;
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }
};

exports.deleteFirst = list => {
    list.head = list.head.next;
    list.head.prev = null;
    list.length--;
};

exports.deleteLast = list => {
    let currentNode = list.head;
    while(currentNode) {
        // if TRUE, this is the last node
        if (currentNode.next === null) {
            currentNode.prev.next = null;
            currentNode = undefined;
            list.length--;
            break;
        }
        currentNode = currentNode.next;
    }
};

exports.deleteAtIndex = (list, index) => {
    let currentNode = list.head,
        idx = 0;
    
    while(currentNode) {
        if (idx === index) {
            currentNode.prev.next = currentNode.next;
            currentNode.next.prev = currentNode.prev;
            currentNode = undefined;
            list.length--;
            break;
        }
        currentNode = currentNode.next;
        idx++;
    }
};

exports.rreverse = node => {
    if (node !== null && node.next === null ) {
        pointerSwapper(node);
        return node;
    }

    const reversedHead = this.rreverse(node.next);
    pointerSwapper(node);
    return reversedHead;
};
