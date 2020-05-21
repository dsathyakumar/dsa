'use strict';

const {
    insertAtIndex,
    insertFirst,
    insertLast,
    deleteFirst,
    deleteLast,
    deleteAtIndex,
    rreverse
} = require('./utils');

/**
 * The Doubly Linked List (DLL) class
 */
class DoublyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        Object.seal(this);
    }

    isEmpty() {
        return (this.length === 0 && this.head === null);
    }

    /**
     * Iteratively walks the DLL to print the value of every Node
     * Gets the Next node by following <Node.next>
     */
    print() {
        if (!this.length) {
            console.warn(`List is empty! Nothing to print`);
            return;
        }

        let currentNode = this.head;
        while(currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }

    find(value) {
        // if there is no value to search, return.
        if (!value) {
            console.warn(`Provide a value to search.`);
            return;
        }

        // if the list is empty, return
        if (!this.length) {
            console.warn(`List is empty...`);
            return;
        }

        // else proceed, if data is found, return the index
        // if not, return -1
        let idx = 0,
            currentNode = this.head;

        while(currentNode) {
            if (value === currentNode.data) {
                break;
            } else {
                currentNode = currentNode.next;
                idx = (currentNode) ? (idx + 1) : -1;
            }
        }

        return idx;
    }

    size() {
        return this.length;
    }

    get(index) {
        if (!index || typeof index !== 'number') {
            console.warn(`Index is either not specified or is not a number`);
            return;
        }

        if (index < 0 || index > (this.length - 1)) {
            console.warn(`Index specified is out of bounds`);
            return;
        }

        if (!this.length && this.head === null) {
            console.warn(`List is empty`);
            return;
        }

        let currentNode = this.head,
            idx = 0,
            value;
        
        while(currentNode) {
            if (idx === index) {
                value = currentNode.data;
                break;
            }
            currentNode = currentNode.next;
            idx++;
        }

        return value;
    }

    insert(node, index) {
        if (!node || !(node instanceof Node)) {
            console.warn(`Node is empty or not an instanceof Node`);
            return;
        }

        if (index < 0 || index > this.length) {
            console.warn(`Index is out of bounds of insertion`);
            return;
        }

        if (!this.length || (typeof index !== 'undefined' && index === 0)) {
            insertFirst(this, node);
            return;
        }

        if ((typeof index !== undefined) && (index !== 0) && (index !== this.length)) {
            insertAtIndex(this, node, index);
        } else {
            insertLast(this, node);
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

    modify(index, newData) {
        if (!this.length && this.head === null) {
            console.warn(`List is empty`);
            return;
        }

        if (!index) {
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
            if (idx === index) {
                currentNode.data = newData;
                break;
            }
            currentNode = currentNode.next;
            idx++;
        }
    }

    reverse() {
        if (!this.length && this.head === null) {
            console.warn(`List is empty`);
            return;
        }

        let currentNode = this.head,
            idx = 0,
            tempNode;
        
        while(currentNode) {
            if (currentNode.next === null && idx === (this.length - 1)) {
                this.head = currentNode;
            }
            // hold next in temp
            tempNode = currentNode.next;
            // assign next to be prev
            currentNode.next = currentNode.prev;
            // assign prev to be next
            currentNode.prev = tempNode;
            // assign next to currentNode
            currentNode = tempNode;
            tempNode = undefined;
            idx++;
        }
    }

    recursiveReverse() {
        if (!this.length && this.head === null) {
            console.warn(`List is empty`);
            return;
        }
        this.head = rreverse(this.head);
    }

    destroy() {
        if (!this.length && this.head === null) {
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
            this.length--;
        }
    }

    updateAll(oldData, newData) {
        if (!this.length && this.head === null) {
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
            currentNode = currentNode.next;
        }
    }
}

exports.DoublyLinkedList = DoublyLinkedList;
