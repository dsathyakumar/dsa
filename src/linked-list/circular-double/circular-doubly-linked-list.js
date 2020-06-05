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

        // provides an iterator for the CDLL (this is possible because the range is known)
        // since CLL has a tail pointer. This iteration is fwd.
        // Its technically possible to have a reverse iterator.
        // The same kind of iterator would be possible in a CLL & a SLL with tail & DLL with tail
        // It would otherwise not be possible in a normal SLL / DLL
        // This will execute in a for-of (where there is no range based iteration)
        this[Symbol.iterator] = function() {
            let head = this.tail.next;
            let tempNode;
            let count = 0;
            return {
                current: this.tail.next,
                last: this.tail,
                next() {
                    // will execute only when CLL cycles back to the head
                    // will not execute for the 1st case when count = 0 and current = head
                    // even if CLL had only 1 node (in which case head & tail would be a self ref)
                    // it would enter this loop only the 2nd time, when count is 1
                    if ((this.current === head) && (count > 0)) {
                        tempNode = undefined;
                        count = 0;
                        return {
                            done: true
                        };
                    } else {
                        tempNode = this.current;
                        this.current = this.current.next;
                        count++;
                        return {
                            done: false,
                            value: tempNode
                        };
                    }
                }
            };
        }

        Object.seal(this);
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

        let oldHead = this.tail.next;

        // oldTail is returned with its next and prev swapped
        const oldTail = rReverse(this.tail.next, this.tail);

        oldHead.next = oldTail;

        this.tail = oldHead;

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
            deletedValue = deleteFirst(this);
        } else if (typeof index === 'number' && index !== 0 && index !== this.lastIndex()) {
            deletedValue = deleteAtIndex(this, index);
        } else {
            deletedValue = deleteLast(this);
        }

        return deletedValue;
    }
}

exports.CircularDoublyLinkedList = CircularDoublyLinkedList;
