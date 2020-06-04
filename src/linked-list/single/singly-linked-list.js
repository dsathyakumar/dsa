'use strict';

const {
    rreverse,
    insertAtIndex,
    insertFirst,
    insertLast,
    deleteAtIndex,
    deleteLast,
    deleteFirst
} = require('./utils');

const {
    SLLNode
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
        return (this.length);
    }

    /**
     * Returns the current lastIndex of the list
     */
    lastIndex() {
        return (this.size() - 1);
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
        // if the list is empty, error our
        if (this.isEmpty()) {
            console.warn(`The List is empty. Nothing to get`);
            return;
        }

        // index must be a number, else error out
        if (typeof index !== 'number') {
            console.warn(`Index is either not specified or is not a number`);
            return;
        }

        // if the specified index is > length of array - 1, its out of bounds
        // if the list is empty, there is nothing to return
        // if not the above 2 conditions, we can return some value
        if ((index > this.lastIndex()) || (index < 0)) {
            console.warn(`List bounds exceeded. Please given an index that is < list length = ${this.length}`);
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
        // if the list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty!. Nothing to Find`);
            return;
        }

        // if there is no value to search, return.
        if (typeof value === 'undefined' || value === null) {
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
        // if the list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty..`);
            return;
        }

        // if the index is not of type number (it could be undefined, and will still be caught)
        if (typeof index !== 'number') {
            console.warn('index must be a number');
            return;
        }

        // if the index is out of bounds
        if ((index < 0) || (index > this.lastIndex())) {
            console.warn(`Index is out of bounds`);
            return;
        }

        // if the data is empty
        if (typeof newData === 'undefined' || newData === null) {
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

        return;
    }

    /**
     * Updates the data of all the Nodes that match oldData with NewData
     * @param {*} oldData
     * @param {*} newData
     */
    updateAll(oldData, newData) {
        // if the list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty..`);
            return;
        }

        // if the newData is empty
        if (typeof newData === 'undefined' || newData === null) {
            console.warn(`New data must be specified`);
            return;
        }

        // if the oldData is empty
        if (typeof oldData === 'undefined' || oldData === null) {
            console.warn(`oldData data must be specified`);
            return;
        }

        let currentNode = this.head;

        while(currentNode) {
            if (currentNode.data === oldData) {
                currentNode.data = newData;
            }
            currentNode = currentNode.next;
        }

        return;
    }

    /**
     * Inserts an element at any given index.
     * If no index is given, insert at the end.
     * For a 0 length list, it should call insertFirst
     */
    insert(node, index) {
        if (typeof node === 'undefined' || node === null) {
            console.warn('Data must not be empty');
            return;
        }

        // wrap it into an instance of SLLNode
        if (!(node instanceof SLLNode)) {
            node = new SLLNode(node);
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
            return this.size();
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

        return this.size();
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

        let deletedValue;

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

        return deletedValue;
    }

    /**
     * Destroys the Singly Linked List
     */
    destroy() {
        // when list is empty, no nodes are available to destroy. So return.
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

        return;
    }

    /**
     * Reverses the given SLL iteratively.
     * The key here is to use the prevNode and nextNode
     * so that we can keep track of both.
     */
    reverse() {
        // when the list is empty, nothing is there to reverse.
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to reverse`);
            return;
        }

        // when only one element exists, nothing to reverse.
        if (this.size() === 1) {
            console.warn('Only one element in list. Nothing to reverse.');
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

        return;
    }

    /**
     * Reverses the given SLL recursively
     */
    recursiveReverse() {
        // when the list is empty, nothing is there to reverse.
        if (this.isEmpty()) {
            console.warn(`List is empty. Nothing to reverse`);
            return;
        }

        // when only one element exists, nothing to reverse.
        if (this.size() === 1) {
            console.warn('Only one element in list. Nothing to reverse.');
            return;
        }

        this.head = rreverse(this.head);
        return;
    }
}

exports.SinglyLinkedList = SinglyLinkedList;
