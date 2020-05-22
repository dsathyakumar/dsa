'use strict';

const {
    insertFirst,
    insertAtIndex,
    insertLast,
    deleteFirst,
    deleteAtIndex,
    deleteLast,
    rreverse
} = require('./util');

const {
    Node
} = require('./node');

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
        Object.seal(this);
    }

    isEmpty() {
        return ((this.head === null) && (this.length === 0));
    }

    size() {
        return this.length;
    }

    print() {
        if (!this.length && this.head === null) {
            console.warn(`List is empty!`);
            return;
        }

        let currentNode = this.head;

        while(currentNode) {
            console.log(currentNode.data);

            if (currentNode.next === this.head) {
                break;
            }

            currentNode = currentNode.next;
        }
    }

    find(value) {
        if (!this.length && this.head === null) {
            console.warn(`List is empty!`);
            return;
        }

        if (typeof value === 'undefined' || typeof value === 'null') {
            console.warn(`Value must NOT be undefined or NULL`);
            return;
        }

        let currentNode = this.head,
            idx = 0;

        while(currentNode) {
            if (currentNode.data === value) {
                break;
            }

            if (currentNode.next === this.head) {
                idx = -1;
                break;
            }

            currentNode = currentNode.next;
            idx = (currentNode) ? (idx + 1) : -1;
        }

        return idx;
    }

    get(index) {
        if (!this.length && this.head === null) {
            console.warn(`List is empty!`);
            return;
        }

        if (typeof index !== 'number') {
            console.warn(`Index must be a number`);
            return;
        }

        if (index < 0 || index > (this.length - 1)) {
            console.warn(`Index out of bounds`);
            return;
        }

        let currentNode = this.head,
            idx = 0,
            value;

        while(currentNode) {
            if (index === idx) {
                value = currentNode.data;
                break;
            }

            if (currentNode.next === this.head) {
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return value;
    }

    modify(index, newData) {
        if (!this.length && this.head === null) {
            console.warn(`List is empty`);
            return;
        }

        if (typeof index === 'undefined') {
            console.warn(`Index must be specified`);
            return;
        }

        if (index < 0 || index > (this.length - 1)) {
            console.warn(`Index is out of bounds`);
            return;
        }

        if (!newData) {
            console.warn(`New data must be specified`);
            return;
        }

        let currentNode = this.head,
            idx = 0;
        
        while(currentNode) {
            if (currentNode.next === this.head) {
                break;
            }

            if (idx === index) {
                currentNode.data = newData;
                break;
            }

            currentNode = currentNode.next;
        }
    }

    updateAll(oldData, newData) {
        if (!this.length && (this.head === null)) {
            console.warn(`List is empty`);
            return;
        }

        if (!newData) {
            console.warn(`New Data is empty`);
            return;
        }

        if (!oldData) {
            console.warn(`Old data is empty`);
            return;
        }

        let currentNode = this.head;

        while(currentNode) {
            if (currentNode.data === oldData) {
                currentNode.data = newData;
            }

            if (currentNode.next === this.head) {
                break;
            }

            currentNode = currentNode.next;
        }
    }

    destroy() {
        if (!this.length && (this.head === null)) {
            console.warn(`List is empty`);
            return;
        }

        let currentNode = this.head,
            tempNode;

        while(currentNode) {
            tempNode = currentNode.next;
            currentNode = undefined;
            currentNode = tempNode;
            tempNode = undefined;
        }
    }

    delete(index) {
        if (!this.length && this.head === null) {
            console.warn(`Cannot delete from empty list`);
            return;
        }

        if ((index > this.length - 1) || (index < 0)) {
            console.warn(`Deletion at an index that is out of bounds`);
            return;
        }

        if ((typeof index !== 'undefined' && index === 0) || (this.length === 1)) {
            deleteFirst(this);
        } else if (typeof index !== 'undefined' && (index !== (this.length - 1))) {
            deleteAtIndex(this, index);
        } else {
            deleteLast(this);
        }
    }

    insert(node, index) {
        if (!node || !(node instanceof Node)) {
            console.warn(`Node is empty or not an instanceof CLL Node`);
            return;
        }

        // check for out of bound indexes
        if ((index < 0) || (index > this.length)) {
            console.warn(`Index is out of bounds of insertion`);
            return;
        }

        if (!this.length || (typeof index !== 'undefined' && index === 0)) {
            insertFirst(this, node);
            return;
        }

        if ((typeof index !== 'undefined') && (index !== 0) && (index !== this.length)) {
            insertAtIndex(this, node, index);
        } else {
            insertLast(this, node);
        }
    }

    reverse() {
        if (!this.length && this.head === null) {
            console.warn(`List is empty`);
            return;
        }

        let currentNode = this.head,
            nextNode,
            prevNode = null;

        while(currentNode) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;

            if (nextNode === this.head) {
                break;
            }

            prevNode = currentNode;
            currentNode = nextNode;
        }
    }

    recursiveReverse() {
        const newHead = rreverse(this.head);
        this.head.next = newHead;
        this.head = newHead;
    }
}

exports.CircularLinkedList = CircularLinkedList;
