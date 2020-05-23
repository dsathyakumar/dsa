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
        this.tail = null;
        this.length = 0;
        Object.seal(this);
    }

    isEmpty() {
        return ((this.length === 0) && (this.tail === null));
    }

    size() {
        return this.length;        
    }

    print() {
        if (this.isEmpty()) {
            console.warn('List is empty. Nothing to print!');
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
    }

    find(value) {
        if (this.isEmpty()) {
            console.warn(`List is empty!. Nothing to find.`);
            return;
        }

        if (typeof value === 'undefined' || typeof value === 'null') {
            console.warn(`Value must NOT be undefined or NULL`);
            return;
        }

        let currentNode = this.tail.next,
            idx = 0;

        while(currentNode) {
            if (currentNode.data === value) {
                break;
            }

            // this is the last Node and this would not execute if the value was prev found
            // or if the lastNode had it. Runs only if value not found.
            if (currentNode === this.tail) {
                idx = -1;
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return idx;
    }

    get(index) {
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to get`);
            return;
        }

        if (typeof index !== 'number') {
            console.warn(`Index must be a number`);
            return;
        }

        if ((index < 0) || index > (this.length - 1)) {
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

    modify(index, newData) {
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to modify`);
            return;
        }

        if (typeof index === 'undefined') {
            console.warn(`Index must be specified`);
            return;
        }

        if ((index < 0) || index > (this.length - 1)) {
            console.warn(`Index is out of bounds`);
            return;
        }

        if (!newData) {
            console.warn(`New data must be specified`);
            return;
        }

        let currentNode = this.tail.next,
            idx = 0;
        
        while(currentNode) {
            if (idx === index) {
                currentNode.data = newData;
                break;
            }

            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }
    }

    updateAll(oldData, newData) {
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to update`);
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
    }

    destroy() {
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to destroy`);
            return;
        }
        
        // if there is only 1 element, there will be a [circular] ref
        if ((this.length === 1) && (this.tail.next === this.tail)) {
            this.tail = null;
            this.length--;
            return;
        }

        // all other cases, break the circular chain
        let currentNode = this.tail.next,
            nextNode;
        this.tail.next = null;

        while(currentNode) {
            nextNode = currentNode.next;
            currentNode = undefined;
            this.length--;
            if (nextNode === null) {
                this.tail = null;
            }
            currentNode = nextNode;
            nextNode = undefined;
        }
    }

    delete(index) {
        if (this.isEmpty()) {
            console.warn(`Cannot delete from empty list`);
            return;
        }

        if ((index > (this.length - 1)) || (index < 0)) {
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

        // insert at 0th index
        if (!this.length || (typeof index !== 'undefined' && index === 0)) {
            console.log('At 0');
            insertFirst(this, node);
            return;
        }

        // if index is neither 0 nor the lastIndex + 1
        if ((typeof index !== 'undefined') && (index !== 0) && (index !== this.length)) {
            console.log('At index');
            insertAtIndex(this, node, index);
        } else { // insert at lastIndex + 1
            console.log('At last');
            insertLast(this, node);
        }
    }

    reverse() {
        if (this.isEmpty()) {
            console.warn(`List is empty. Cannot reverse an empty list`);
            return;
        }

        if (this.length === 1) {
            console.warn(`List has only 1 element. Cannot reverse`);
            return;
        }

        let currentNode = this.tail.next,
            prevNode = this.tail,
            nextNode;

        while(currentNode) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;

            if (currentNode === this.tail) {
                this.tail = nextNode;
                break;
            }

            // update variables for next iteration
            prevNode = currentNode;
            currentNode = nextNode;
        }
    }

    recursiveReverse() {
        if (this.isEmpty()) {
            console.warn(`List is empty. Cannot reverse an empty list`);
            return;
        }

        if (this.length === 1) {
            console.warn(`List has only 1 element. Cannot reverse`);
            return;
        }

        // get the old head node
        const oldHeadNode = this.tail.next;
        // returns the old tail node, which is the head now
        const oldTailNode = rreverse(this.tail.next, this.tail.next);
        this.tail = oldHeadNode;
        // console.log(this.tail.next); // must print NULL now
        this.tail.next = oldTailNode;
    }
}

exports.CircularLinkedList = CircularLinkedList;
