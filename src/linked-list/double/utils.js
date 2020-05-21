'use strict';

const DoublyLinkedList = require('./doubly-linked-list');


exports.insertLast = (list, node) => {
    if (list instanceof DoublyLinkedList) {
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
    }
};

exports.insertFirst = (list, node) => {
    if (list instanceof DoublyLinkedList) {
        node.prev = null;

        // current 1st node
        let tempNode = list.head;

        // make head to point to new Node as head node.
        list.head = node;

        node.next = tempNode;
        tempNode = undefined;
        node.next.prev = node;
    }
};

exports.insertAtIndex = (list, node, index) => {
    if (list instanceof DoublyLinkedList) {
        let currentNode = list.head,
            idx = 0;

        while(currentNode) {
            if (idx === index) {
                node.prev = currentNode.prev;
                node.next = currentNode;
                currentNode.prev = node;
                this.length++;
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }
    }
};

exports.deleteFirst = list => {
    if (list instanceof DoublyLinkedList) {
        list.head = list.head.next;
        list.head.prev = null;
        list.length--;
    }
};

exports.deleteLast = list => {
    if (list instanceof DoublyLinkedList) {
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
    }
};

exports.deleteAtIndex = (list, index) => {
    if (list instanceof DoublyLinkedList) {
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
    }
};

exports.rreverse = node => {
    if (node !== null && node.next === null ) {
        return node;
    }

    const reversedHead = this.rreverse(node.next);
    let tempNode = node.next;
    node.next = node.prev;
    node.prev = tempNode;
    return reversedHead;
};
