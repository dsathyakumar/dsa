'use strict';

const {
    insertFirst,
    insertAtIndex,
    insertLast,
    deleteFirst,
    deleteAtIndex,
    deleteLast,
    rReverse
} = require('./util');

const {
    CDLLNode
} = require('./node');

class CircularDoublyLinkedList {
    constructor() {
        this.length = 0;
        this.tail = null;
    }

    isEmpty() {
        return ((this.length === 0) && (this.tail === null));
    }

    size() {
        return (this.length);
    }

    lastIndex() {
        return (this.length - 1);
    }

    display() {
        if (this.isEmpty()) {
            console.warn(`Nothing to display. List is empty!`);
            return;
        }

        let currentNode = this.tail.next;

        while(currentNode) {
            console.log(currentNode.data);

            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
        }

        return;
    }

    destroy() {
        if (this.isEmpty()) {
            console.warn(`Nothing to destroy. List is empty!`);
            return;
        }

        let currentNode = this.tail.next,
            nextNode;

        // break the ciruclar link (tail no longer points to head)
        this.tail.next = null;

        while(currentNode) {
            nextNode = currentNode.next;
            currentNode.prev = null;
            currentNode.next = null;
            currentNode = undefined;

            if (nextNode === null) {
                this.tail = null;
            }

            currentNode = nextNode;
            nextNode = undefined;
            this.length--;
        }

        return;
    }

    get(index) {
        if (this.isEmpty()) {
            console.warn(`Nothing to get. List is empty!`);
            return;
        }

        if (typeof index !== 'number') {
            console.warn(`Index must be a +ve non-zero number`);
            return;
        }

        if (index < 0 || index > this.lastIndex()) {
            console.warn(`Index out of bounds`);
            return;
        }

        let currentNode = this.tail.next,
            idx = 0,
            value;
        
        while(currentNode) {
            if (idx === index) {
                value = currentNode.data;
                break;
            }

            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return value;
    }

    find(value) {
        if (this.isEmpty()) {
            console.warn(`Nothing to find. List is empty!`);
            return;
        }

        if (typeof value === 'undefined' || value === null) {
            console.warn(`Value must not be empty!`);
            return;
        }

        let currentNode = this.tail.next,
            idx = 0;

        while(currentNode) {
            if (currentNode.data === value) {
                break;
            }

            if (currentNode === this.tail) {
                idx = -1;
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return idx;
    }

    modify(index, value) {
        if (this.isEmpty()) {
            console.warn(`Nothing to modify. List is empty!`);
            return;
        }

        if (typeof value === 'undefined' || value === null) {
            console.warn(`Value must not be empty!`);
            return;
        }

        if (typeof index !== 'number') {
            console.warn(`Index must be a +ve non-zero number`);
            return;
        }

        if (index < 0 || index > this.lastIndex()) {
            console.warn(`Index out of bounds`);
            return;
        }

        let currentNode = this.tail.next,
            idx = 0;
        
        while(currentNode) {
            if (idx === index) {
                currentNode.data = value;
                break;
            }

            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return;
    }

    updateAll(oldData, newData) {
        if (this.isEmpty()) {
            console.warn(`Nothing to update. List is empty!`);
            return;
        }

        if (typeof oldData === 'undefined' || oldData === null) {
            console.warn(`oldData must not be empty!`);
            return;
        }

        if (typeof newData === 'undefined' || newData === null) {
            console.warn(`newData must not be empty!`);
            return;
        }

        let currentNode = this.tail.next;
        
        while(currentNode) {
            if (currentNode.data === oldData) {
                currentNode.data = newData;
            }

            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
        }

        return;
    }

    reverse() {
        if (this.isEmpty()) {
            console.warn(`Nothing to reverse. List is empty!`);
            return;
        }

        if (this.size() === 1 && this.tail === this.tail.next) {
            console.warn(`Only 1 element in list. Nothing to reverse`);
            return;
        }

        // start with head node
        let currentNode = this.tail.next,
            // for the head node, the prev node is the tail
            prevNode = this.tail,
            nextNode;

        while(currentNode) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;
            currentNode.prev = nextNode;

            if (currentNode === this.tail) {
                this.tail = nextNode;
                break;
            }

            prevNode = currentNode;
            currentNode = nextNode;
        }

        return;
    }

    recursiveReverse() {
        if (this.isEmpty()) {
            console.warn(`Nothing to reverse. List is empty!`);
            return;
        }

        if (this.size() === 1 && this.tail === this.tail.next) {
            console.warn(`Only 1 element in list. Nothing to reverse`);
            return;
        }

        return;
    }

    insert(data, index) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`data must not be empty!`);
            return;
        }

        if (!(data instanceof CDLLNode)) {
            data = new CDLLNode(data);
        }

        if (typeof index !== 'undefined' && typeof index !== 'number') {
            console.warn(`Index if specified must be a +ve non-zero number`);
            return;
        }

        if ((typeof index === 'number') && (index < 0 || index > this.size())) {
            console.warn(`Index out of bounds`);
            return;
        }

        if ((typeof index === 'number' && index === 0) || this.isEmpty()) {
            insertFirst(this, data);
        } else if (typeof index === 'number' && index !== 0 && index !== this.size()) {
            insertAtIndex(this, data, index);
        } else {
            insertLast(this, data);
        }

        return this.size();
    }

    delete(index) {
        if (this.isEmpty()) {
            console.warn(`Nothing to delete. List is empty!`);
            return;
        }

        if (typeof index !== 'undefined' && typeof index !== 'number') {
            console.warn(`Index if specified must be a +ve non-zero number`);
            return;
        }

        if ((typeof index === 'number') && (index < 0 || index > this.lastIndex())) {
            console.warn(`Index out of bounds`);
            return;
        }

        let deletedValue;

        if ((typeof index === 'number' && index === 0) || (this.size() === 1)) {
            deletedValue = deleteFirst(this, data);
        } else if (typeof index === 'number' && index !== 0 && index !== this.lastIndex()) {
            deletedValue = deleteAtIndex(this, data, index);
        } else {
            deletedValue = deleteLast(this, data);
        }

        return deletedValue;
    }
}

exports.CircularDoublyLinkedList = CircularDoublyLinkedList;
