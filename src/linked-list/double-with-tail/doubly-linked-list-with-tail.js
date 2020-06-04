'use strict';

const {
    DLLNode
} = require('./node');

const {
    insertFirst,
    insertLast,
    insertAtIndex,
    deleteAtIndex,
    deleteFirst,
    deleteLast,
    rReverse
} = require('./util');

/**
 * With the presence of a tail pointer, the insertLast and deleteLast happen in O(1) constant time
 */
class DoublyLinkedListWithTail {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    isEmpty() {
        return ((this.head === null) && (this.tail === null) && (this.size() === 0));
    }

    size() {
        return (this.length);
    }

    lastIndex() {
        return (this.length - 1);
    }

    // prints the contents of the list
    display() {
        // list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to display`);
            return;
        }

        // iterate from head to tail (fwd iter)
        let currentNode = this.head;

        while(currentNode) {
            console.log(currentNode.data);

            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
        }

        return;
    }

    // gets an element at an index
    get(index) {
        // list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to display`);
            return;
        }

        // number check
        if (typeof index !== 'number') {
            console.warn(`Index must be specified as a +ve non-zero integer`);
            return;
        }

        // out of bounds checker
        if ((index < 0) || (index > this.lastIndex())) {
            console.warn(`Index out of bounds`);
            return;
        }

        // iterate from head to tail (fwd iter)
        let currentNode = this.head,
            idx = 0,
            value;

        while(currentNode) {
            // when the index matches, get value and break
            if (idx === index) {
                value = currentNode.data;
                break;
            }

            // if the tail is reached, break anyway
            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return value;
    }

    // finds if an element is present and returns its 1st occurence index
    find(value) {
        // list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to display`);
            return;
        }

        // data empty check
        if (typeof value === 'undefined' || value === null) {
            console.warn(`Data must not be empty!`);
            return;
        }

        // iterate from head to tail (fwd iter)
        let currentNode = this.head,
            idx = 0;

        while(currentNode) {
            // if the value matches, break and return the index
            if (currentNode.data === value) {
                break;
            }

            // if the tail node is reached and still the value has not matched
            // then reset index to -1 and break, indicating that the value isn't present
            if (currentNode === this.tail) {
                idx = -1;
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return idx;
    }

    // updates all nodes that match a particular data, with new data
    updateAll(oldData, newData) {
        // list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to display`);
            return;
        }

        // data empty check
        if (typeof oldData === 'undefined' || oldData === null) {
            console.warn(`oldData must not be empty!`);
            return;
        }

        // data empty check
        if (typeof newData === 'undefined' || newData === null) {
            console.warn(`newData must not be empty!`);
            return;
        }

        // iterate from head to tail (fwd iter)
        let currentNode = this.head;

        while(currentNode) {
            // if the data matches, modify it with newData and continue looping
            // as there maybe other nodes that need to be modified as well.
            if (currentNode.data === oldData) {
                currentNode.data = newData;
            }

            currentNode = currentNode.next;
        }

        return;
    }

    // modifys the value of a node at a specific index
    modify(index, value) {
        // list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to display`);
            return;
        }

        // number check
        if (typeof index !== 'number') {
            console.warn(`Index must be specified as a +ve non-zero integer`);
            return;
        }

        // out of bounds checker
        if ((index < 0) || (index > this.lastIndex())) {
            console.warn(`Index out of bounds`);
            return;
        }

        // data empty check
        if (typeof value === 'undefined' || value === null) {
            console.warn(`Data must not be empty!`);
            return;
        }

        // iterate from head to tail (fwd iter)
        let currentNode = this.head,
            idx = 0;

        while(currentNode) {
            if (idx === index) {
                currentNode.data = value;
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return;
    }

    // destroys the DLL (deletes all nodes)
    destroy() {
        // list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to display`);
            return;
        }

        // iterate from head to tail (fwd iter)
        let currentNode = this.head,
            nextNode;
        
        // after the head is got at the start, into currentNode, reset head pointer
        this.head = null;

        while(currentNode) {
            nextNode = currentNode.next;
            currentNode.next = null;
            currentNode.prev = null;
            currentNode = undefined;
            currentNode = nextNode;

            // this is the next node with which the iteration will happen
            // if this was null, it means the end of the list is reached.
            // so, reset the tail pointer
            if (currentNode === null) {
                this.tail = null;
            }

            // after every node is destroyed, decrement the length
            this.length--;
        }

        return this;
    }

    // inserts an element at a given index.
    // Does insertFirst, insertLast and insertAtIndex
    insert(data, index) {
        // data empty check
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data must not be empty!`);
            return;
        }

        // if node is not an instance of DLLNode, wrap it
        if (!(data instanceof DLLNode)) {
            data = new DLLNode(data);
        }

        // number check (number arg exists bt is not a number)
        if (typeof index !== 'undefined' && typeof index !== 'number') {
            console.warn(`Index must be specified as a +ve non-zero integer`);
            return;
        }

        // out of bounds checker (when index is a number)
        // note that for insert we can insert at index=length (same as .add or .append operatio)
        // where a new node gets appended to the end of the list (after current lastindex)
        // and the index after current last index is the index=length
        if ((typeof index === 'number') && (index < 0 || index > this.size())) {
            console.warn(`Index out of bounds`);
            return;
        }

        // 1. When index = 0 or if list is empty, do insertFirst
        // 2. When index > 0 but index < length, do insertAtIndex
        // 3. Else, whatever index, append to the end of the list
        // if no index is mentioned, default is insertLast
        if ((typeof index === 'number' && index === 0) || this.isEmpty()) {
            insertFirst(this, data);
        } else if ((typeof index === 'number' && (index > 0) && (index < this.size()))) {
            insertAtIndex(this, data);
        } else {
            insertLast(this, data);
        }

        return this.size();
    }

    // Deletes an element at a given index
    // Does deleteFirst, deleteLast, deleteAtIndex
    delete(index) {
        // list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to display`);
            return;
        }

        // number check (when arg number exists, but its not of type number)
        if (typeof index !== 'undefined' && typeof index !== 'number') {
            console.warn(`Index must be specified as a +ve non-zero integer`);
            return;
        }

        // out of bounds checker (when arg number exists as typeof number)
        if ((typeof index === 'number') && (index < 0 || index > this.lastIndex())) {
            console.warn(`Index out of bounds`);
            return;
        }

        let deletedValue;

        // if index = 0 or there is only 1 element left, do deleteFirst
        // if index > 0 but index < lastIndex, then do a deleteAtIndex
        // Else, whatever index (only left is lastIndex), do deleteLast
        // If no index is mentioned, by default do deleteLast
        if ((typeof index === 'number' && index === 0) || (this.size() === 1)) {
            deletedValue = deleteFirst(this);
        } else if ((typeof index === 'number' && (index > 0) && (index < this.lastIndex()))) {
            deletedValue = deleteAtIndex(this, index);
        } else {
            deletedValue = deleteLast(this);
        }

        return deletedValue;
    }

    // Reverses the list
    reverse() {
        // list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to display`);
            return;
        }

        // when there is only 1 element, nothing to reverse
        if (this.size() === 1 && (this.head === this.tail)) {
            console.warn(`List has only 1 element. Nothing to reverse`);
            return;
        }

        let currentNode = this.head,
            prevNode = null,
            nextNode;
        
        // make the currentHead as the tail
        this.tail = this.head;

        while(currentNode) {
            // 1. Set currentNode's next to point to prevNode
            // 2. Set currentNode's prev to point to nextNode
            // 3. Set the nextNode as currentNode (to proceed with iteration)
            // 4. If the nextNode ever matches NULL, this means the currentNode is the lastNode
            // 5. Reset the head pointer to point to the lastNode
            nextNode = currentNode.next;
            currentNode.next = prevNode;
            currentNode.prev = nextNode;

            if (nextNode === null) {
                this.head = currentNode;
            }

            currentNode = nextNode;
        }

        return;
    }

    // Does a recursive Reverse
    recursiveReverse() {
        // list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to display`);
            return;
        }

        // when there is only 1 element, nothing to reverse
        if (this.size() === 1 && (this.head === this.tail)) {
            console.warn(`List has only 1 element. Nothing to reverse`);
            return;
        }
        this.tail = this.head;

        this.head = rReverse(this.head);

        return;
    }
}

exports.DoublyLinkedListWithTail = DoublyLinkedListWithTail;
