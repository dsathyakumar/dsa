'use strict';

const {
    rreverse,
    insertAtIndex,
    insertFirst,
    insertLast,
    deleteAtIndex,
    deleteLast,
    deleteFirst
} = require('./util');

const {
  Node
} = require('./node');

/**
 * The Singly Linked List Class
 */
class SinglyLinkedList {
    constructor() {
        // the Starting point of the singly linked list
        // it holds a reference to a <Node> that would be the starting point of the List
        this.head = null;
        // the size of the LinkedList or the length
        this.length = 0;
        Object.seal(this);
    }

    /**
     * returns if the list is empty or not
     */
    isEmpty() {
        return ((this.length === 0) && (this.head === null));
    }

    /**
     * retuns the size of the List
     */
    size() {
        return this.length;
    }

    /**
     * Print all the elements from the list
     */
    print() {
        if (this.isEmpty()) {
            console.warn(`List is empty!. Nothing to print`);
            return;
        }

        let currentNode = this.head;

        while(currentNode) {
            // prints the current element value
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }

    /**
     * Gets an item at a specific index
     * 1. Check if the index is out of bounds
     * 2. Check if the list is empty
     */
    get(index) {
        if (this.isEmpty()) {
            console.warn(`The List is empty. Nothing to get`);
            return;
        }
        // if the specified index is > length of array - 1, its out of bounds
        // if the list is empty, there is nothing to return
        // if not the above 2 conditions, we can return some value
        if (index > (this.length - 1) || index < 0) {
            console.warn(`List bounds exceeded. Please given an index that is < list length = ${this.length}`);
            return;
        }

        if (typeof index !== 'undefined' || typeof index !== 'number') {
            console.warn(`Index is either not specified or is not a number`);
            return;
        }

        let value,
            currentNode = this.head,
            idx = 0;

        while(currentNode) {
            // if the index is matched, return the value of the <Node> and break
            // else loop by assigning the currentNode's Next, back to the currentNode & bump index
            if (idx === index) {
                value = currentNode.data;
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return value;
    }

    /**
     * Finds if an element is present & returns an index
     * if element is not found, returns a -1;
     */
    find(value) {
        if (this.isEmpty()) {
            console.warn(`List is empty!. Nothing to Find`);
            return;
        }

        // if there is no value to search, return.
        if (!value) {
            console.warn(`Provide a value to search.`);
            return;
        }

        let idx = 0;
        let currentNode = this.head;

        while(currentNode) {
            if (currentNode.data === value) {
                break;
            } else {
                idx = (currentNode.next) ? (idx + 1) : -1;
                currentNode = currentNode.next;
            }
        }

        return idx;
    }

    /**
     * Updates a Node at an index with a new value
     * @param {Number} index
     * @param {*} newData
     */
    modify(index, newData) {
        if (typeof index === 'undefined') {
            console.warn(`Index must be specified`);
            return;
        }

        if (index && typeof index !== 'number') {
            console.warn('index must be a number');
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

        if (this.isEmpty()) {
            console.warn(`List is empty..`);
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

    /**
     * Updates the data of all the Nodes that match oldData with NewData
     * @param {*} oldData
     * @param {*} newData
     */
    updateAll(oldData, newData) {
        if (!newData) {
            console.warn(`New data must be specified`);
            return;
        }

        if (!oldData) {
            console.warn(`oldData data must be specified`);
            return;
        }

        if (this.isEmpty()) {
            console.warn(`List is empty..`);
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

    /**
     * Inserts an element at any given index.
     * If no index is given, insert at the end.
     * For a 0 length list, it should call insertFirst
     */
    insert(node, index) {
        if (!node || !(node instanceof Node)) {
            console.warn(`Node is empty or not an instanceof Node`);
            return;
        }

        if (index && typeof index !== 'number') {
            console.warn('index must be a number');
            return;
        }

        // At max, we can insert into a position (lastIndex + 1) - which is the length
        // that is, the index, after the current last element.
        // Don't wanna allow negative indexes either.
        if ((index > this.length) || (index < 0)) {
            console.warn(`Inserting into an index that is out of bounds`);
            return;
        }

        // if the list is empty, set the head Node to point to incoming <Node>
        // No point of any index here. This is the 1st Node of the LinkedList, at 0th index.
        // Or, even if the index is 0 & its a non-empty list, then its insertFirst
        if (this.isEmpty() || (typeof index !== 'undefined' && index === 0)) {
            console.log('At 0');
            insertFirst(this, node);
            return;
        }

        // At this point, the list is certainly not empty.
        // if a valid index exists & its not equal to size of the list
        // meaning, the insertion is not for after the current last element
        // Nor, its the 0th index
        if (typeof index !== 'undefined' && (index !== this.length) && (index !== 0)) {
            console.log('At index');
            // some specific non-1st or not after last index
            insertAtIndex(this, node, index)
        } else {
            console.log('At last');
            // index is either not given (so we append to the end) or is given and is end of the list
            // iterate till the end of the list and append
            // the end of the list is reached when any <Node>'s next is NULL
            insertLast(this, node);
        }
    }

    /**
     * Delete's an element at a specific index
     * If no index is given, deletes at the end.
     * For a 1 element list, use deleteFirst
     */
    delete(index) {
        // if the list is empty, there is nothing to delete
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to delete`);
            return;
        }

        if (index && typeof index !== 'number') {
            console.warn('index must be a number');
            return;
        }

        // At max, we can delete from lastIndex, but not at an index
        // that equals to length of list (as in the case of insert)
        // Don't wanna allow negative indexes either.
        if ((index > this.length - 1) || (index < 0)) {
            console.warn(`Deletion at an index that is out of bounds`);
            return;
        }

        // At this point, List is certainly not empty.
        // Check if its delete at 0th index / last index / in between
        if ((typeof index !== 'undefined' && index === 0) || this.length === 1) {
            deleteFirst(this);
        } else if (typeof index !== 'undefined' && (index !== (this.length - 1))) {
            // at this point, its neither 0th nor last
            deleteAtIndex(this, index);
        } else {
            deleteLast(this);
        }
    }

    /**
     * Destroys the Singly Linked List
     */
    destroy() {
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to destroy!`);
            return;
        }

        let currentNode = this.head;
        this.head = null;
        let tempNode;

        while(currentNode) {
            tempNode = currentNode.next;
            // setting to undefined will make v8 GC it.
            currentNode = undefined;
            currentNode = tempNode;
            tempNode = undefined;
            this.length--;
        }
    }

    /**
     * Reverses the given SLL iteratively.
     * The key here is to use the prevNode and nextNode
     * so that we can keep track of both.
     */
    reverse() {
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to reverse`);
            return;
        }

        let currentNode = this.head,
            prevNode = null,
            nextNode,
            idx = 0;
        
        while(currentNode) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;

            if (idx === (this.length - 1)) {
                this.head = currentNode;
            }

            prevNode = currentNode;
            currentNode = nextNode;
            idx++;
        }
    }

    /**
     * Reverses the given SLL recursively
     */
    recursiveReverse() {
      this.head = rreverse(this.head);
    }
}

exports.SinglyLinkedList = SinglyLinkedList;
