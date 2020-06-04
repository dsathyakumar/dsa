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
    CLLNode
} = require('./node');

/**
 * The CLL always starts off having a tail pointer.
 * Thereby it has access to the tail Node.
 * By the prop of CLL, since tail -> next circles back to the head node,
 * it also has access to the head node.
 */
class CircularLinkedList {
    constructor() {
        this.tail = null;
        this.length = 0;
        Object.seal(this);
    }

    // determines if the CLL is empty
    isEmpty() {
        return ((this.length === 0) && (this.tail === null));
    }

    // gets the size of the CLL (number of filled elements)
    size() {
        return this.length;        
    }

    // gets the index of the last filled element.
    lastIndex() {
        return (this.length -1);
    }

    // prints the elements in the list (starting from head)
    print() {
        if (this.isEmpty()) {
            console.warn('List is empty. Nothing to print!');
            return;
        }

        // prints from headnode to tail (forward iteration)
        let currentNode = this.tail.next;

        while(currentNode) {
            console.log(currentNode.data);

            // break away when the tail node is reached.
            // it breaks away after printing the value only.
            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
        }

        return;
    }

    // finds a given value in the list
    find(value) {
        // if list is empty, error out
        if (this.isEmpty()) {
            console.warn(`List is empty!. Nothing to find.`);
            return;
        }

        // if the data is empty, error out
        if (typeof value === 'undefined' || typeof value === null) {
            console.warn(`Value must NOT be undefined or NULL`);
            return;
        }

        // start from head and proceed to the tail (forward iteration)
        let currentNode = this.tail.next,
            idx = 0;

        while(currentNode) {
            // data matches, break away & return the current idx
            if (currentNode.data === value) {
                break;
            }

            // this is the last Node and this would not execute if the value was prev found
            // or if the lastNode had it. Runs only if value not found.
            // So idx is reset here!
            // this check is needed to prevent teh CLL from cycling around infinitely
            if (currentNode === this.tail) {
                idx = -1;
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return idx;
    }

    // gets the value of the element, with a specific index
    get(index) {
        // if the list is empty, error out
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to get`);
            return;
        }

        // This will also catch undefined types here.
        // If not a number, error out
        if (typeof index !== 'number') {
            console.warn(`Index must be a number`);
            return;
        }

        // if index is out of bounds, error out
        if ((index < 0) || index > this.lastIndex()) {
            console.warn(`Index out of bounds`);
            return;
        }

        // start from head (forward iteration)
        let currentNode = this.tail.next,
            idx = 0,
            value;

        while(currentNode) {
            // if index matches, break away & return the value
            if (idx === index) {
                value = currentNode.data;
                break;
            }

            // if the tail node is reached, its time to break away.
            // else, the CLL would be cycling infinitely
            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return value;
    }

    // modifys an index data
    modify(index, newData) {
        // if the list is empty, error out or return
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to modify`);
            return;
        }

        // index must be a number, else error out
        if (typeof index !== 'number') {
            console.warn(`Index must be a postive non-zero number`);
            return;
        }

        // if index is out of bounds, error out
        if ((index < 0) || index > this.lastIndex()) {
            console.warn(`Index is out of bounds`);
            return;
        }

        // new data must not be empty
        if (typeof newData === 'undefined' || newData === null) {
            console.warn(`New data must be specified`);
            return;
        }

        // start from head and proceed to tail (forward iteration)
        let currentNode = this.tail.next,
            idx = 0;
        
        while(currentNode) {
            // if index matches, update and break away
            if (idx === index) {
                currentNode.data = newData;
                break;
            }

            // if the tail node is reached, break away.
            // this is needed to prevent the CLL from looping around infinitely
            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return;
    }

    // updates all the elements of the list (replacing oldValue with newValue)
    updateAll(oldData, newData) {
        // if the list is empty, error out
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to update`);
            return;
        }

        // if newData is empty, error out
        if (typeof newData === 'undefined' || newData === null) {
            console.warn(`New Data is empty`);
            return;
        }

        // if oldData is empty, error out
        if (typeof oldData === 'undefined' || oldData === null) {
            console.warn(`Old data is empty`);
            return;
        }

        // iterate from head to tail (forward)
        let currentNode = this.tail.next;

        while(currentNode) {
            // data matches, update and contine
            // (there may be other Nodes that have the same value and needs to be updated)
            // dont break away
            if (currentNode.data === oldData) {
                currentNode.data = newData;
            }

            // if the tail node is reached, break away.
            // this is needed to prevent the CLL from looping around infinitely
            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
        }

        return;
    }

    // destroys the list (break the circular chain first by setting tail.next = null)
    // By setting so, it helps to determine if the currentNode is the tailNode
    destroy() {
        // if the list is empty, return
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to destroy`);
            return;
        }
        
        // if there is only 1 element, there will be a [circular] ref
        // This is a special case of CLL
        if ((this.length === 1) && (this.tail.next === this.tail)) {
            this.tail = null;
            this.length--;
            return;
        }

        // start from head node and proceed to tail (iter forward)
        let currentNode = this.tail.next,
            nextNode;

        // all other cases, break the circular chain
        // as we iterate, the currentNode's next pointer will be set to NULL
        // at the end we would need to reset the tail node's next. So doing it.
        this.tail.next = null;

        while(currentNode) {
            nextNode = currentNode.next;
            currentNode = undefined;
            this.length--;

            // since tail.next is already set to NULL
            // it can be used to check the tail.
            // as next is NULL, there is not a need to explicitly break the loop
            // it no longer cycles around infinitely
            // if nextnode is null => current node is the tail and so tail can be reset
            if (nextNode === null) {
                this.tail = null;
            }

            currentNode = nextNode;
            nextNode = undefined;
        }

        return;
    }

    // deletes an element at start, middle or end
    delete(index) {
        // when the list is empty
        if (this.isEmpty()) {
            console.warn(`Cannot delete from empty list`);
            return;
        }

        // if its present but not a number
        if (typeof index !== 'undefined' && typeof index !== 'number') {
            console.warn('Index must be a positive non-zero number');
        }

        // if the index is out of bounds.
        if ((index > this.lastIndex()) || (index < 0)) {
            console.warn(`Deletion at an index that is out of bounds`);
            return;
        }

        let deletedValue;

        // 1. DeleteFirst - When there is only 1 element or when index = 0
        // 2. DeleteAtIndex - when index is neither 0 nor the lastIndex
        // 3. DeleteLast - when index == lastIndex or no index is specified
        if ((typeof index === 'number' && index === 0) || (this.length === 1)) {
            deletedValue = deleteFirst(this);
        } else if (typeof index === 'number' && (index !== (this.length - 1))) {
            deletedValue = deleteAtIndex(this, index);
        } else {
            deletedValue = deleteLast(this);
        }

        return deletedValue;
    }

    // inserts an element either at start, middle or end
    insert(node, index) {
        // when data is empty
        if (typeof node === 'undefined' || node === null) {
            console.warn(`Data cannot be empty`);
            return;
        }

        // if node is not an instance of CLLNode, then wrap it with one
        if (!(node instanceof CLLNode)) {
            node = new CLLNode(node);
        }

        // if index is present bt is not a number
        if (typeof index !== 'undefined' && typeof index !== 'number') {
            console.warn('Index must be specified as a non-zero +ve number');
            return;
        }

        // check for out of bound indexes
        // here we dont check lastIndex as upper bound.
        // upper bound becomes index = length (since a .append or .add would add after current LastIndex)
        if ((index < 0) || (index > this.length)) {
            console.warn(`Index is out of bounds of insertion`);
            return;
        }

        // insert at 0th index when index = 0 or when list is empty
        if ((this.length === 0) || (typeof index === 'number' && index === 0)) {
            console.log('At 0');
            insertFirst(this, node);
            return this.size();
        }

        // if index is neither 0 nor the lastIndex + 1
        if ((typeof index === 'number') && (index !== 0) && (index !== this.length)) {
            console.log('At index');
            insertAtIndex(this, node, index);
        } else { // insert at lastIndex + 1
            console.log('At last');
            insertLast(this, node);
        }

        return this.size();
    }

    // reverses the elements in the list
    reverse() {
        // when the list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Cannot reverse an empty list`);
            return;
        }

        // when there is only 1 element in the list
        if (this.length === 1) {
            console.warn(`List has only 1 element. Cannot reverse`);
            return;
        }

        // iterate from head to tail (forward iteration)
        let currentNode = this.tail.next,
            prevNode = this.tail,
            nextNode;

        while(currentNode) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;

            // if the current node is the tail
            // then this should become the head.
            // so the nextNode is the tailNode
            if (currentNode === this.tail) {
                this.tail = nextNode;
                break;
            }

            // update variables for next iteration
            prevNode = currentNode;
            currentNode = nextNode;
        }

        return;
    }

    // recursively reverses the element in the list
    recursiveReverse() {
        // when the list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty. Cannot reverse an empty list`);
            return;
        }

        // when there is only 1 element in the list
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

        return;
    }
}

exports.CircularLinkedList = CircularLinkedList;
