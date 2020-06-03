'use strict';

const {
    SLLNode
} = require('./node');
const {
    insertFirst,
    insertLast,
    insertAtIndex,
    deleteFirst,
    deleteLast,
    deleteAtIndex
} = require('./utils');

class SinglyLinkedListWithTail {
    constructor() {
        // pointer to head node (usual, per List ADT)
        this.head = null;

        // length of the list (number of elements)
        this.length = 0;

        // pointer to tail node (new, will make do insertion at the end in O(1))
        // this is specifically used to implement a dynamic linear Q
        this.tail = null;
    }

    isEmpty() { // checks if the list is empty
        return ((this.length === 0) && (this.head === null) && (this.tail === null));
    }

    size() { // returns the number of elements in the list
        return (this.length);
    }

    lastIndex() { // returns the lastIndex of the list
        return (this.length - 1);
    }

    display() { // displays the contents of the list from head to tail
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to display`);
            return;
        }

        // forward iteration, loop from head to tail and print data props
        let currentNode = this.head;

        while(currentNode) {
            console.log(currentNode.data);

            // if the currentNode is the tail, break away as the value is already printed.
            // since there is the tail, there is no need to get the next which would be NULL
            // and then check and break off.
            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
        }

        return;
    }

    // modifies the data at a specified index
    modify(data, index) {
        // when list is empty
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to modify`);
            return;
        }

        // when data is empty
        if (typeof data === 'undefined' || data === null) {
            console.warn('data cannot be empty!');
            return;
        }

        // when index is not a number
        if (typeof index !== 'number') {
            console.warn('Index must be specified as a positive non-zero number');
            return;
        }

        // when index is a number but not within bounds.
        // here the upper bound is the lastIndex
        if (index < 0 || index > this.lastIndex()) {
            console.warn('Index out of bounds!');
            return;
        }

        // start from head to tail (forward iteration)
        // starting index is 0, incremented at the end of every loop execution
        let currentNode = this.head,
            idx = 0;

        while(currentNode) {
            // when index matches, modify data and break away
            if (idx === index) {
                currentNode.data = data;
                break;
            }

            // if tail is reached and this executes, then it means the end is reached
            // so break away.
            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return;
    }

    // checks if a value is present accross nodes and modifies it.
    updateAll(oldData, newData) {
        // if list is empty, return
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to update`);
            return;
        }

        // if olddata is empty, return
        if (typeof oldData === 'undefined' || oldData === 'null') {
            console.warn('oldData cannot be empty!');
            return;
        }

        // if newdata is empty, return
        if (typeof newData === 'undefined' || newData === 'null') {
            console.warn('newData cannot be empty!');
            return;
        }

        let currentNode = this.head;

        while(currentNode) {
            // if olddata matches, then update its data prop with newData
            // dont break away here as there could be other nodes with the matching data
            if (currentNode.data === oldData) {
                currentNode.data = newData;
            }

            // if lastnode is reached and this executes, then it means the above has been completed.
            // break away.
            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
        }

        return;
    }

    // destroys the list (makes it empty)
    destroy() {
        // check if the list is non-empty. ELse, return
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to destroy`);
            return;
        }

        // begin from head to tail (forward iteration)
        let currentNode = this.head,
            nextNode;

        // first reset the head and tail pointers (after the head is got)
        this.head = null;
        this.tail = null;

        while(currentNode) {
            // 1. get the next node of current node.
            // 2. current node;'s next pointer is set to null
            // 3. set currentNode to undefined.
            // 4. set currentNode to the nextNode (so that loop continues)
            // 5. Decrement length
            nextNode = currentNode.next;
            currentNode.next = null;
            currentNode = undefined;
            currentNode = nextNode;
            this.length--;
        }

        // finally GC nextNode
        nextNode = undefined;

        return;
    }

    // finds if an element is present in the list
    find(data) {
        // if the list is empty, return
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to find`);
            return;
        }

        // check if data is empty!
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty!`);
            return;
        }

        let currentNode = this.head,
            idx = -1; // > -1 indicates that the element is not available

        // presence of tail pointer helps cut the loop check by 1
        while(currentNode) {
            idx++; // increment at start, to indicate 1st element

            // if the data matches, break away
            if (currentNode.data === data) {
                break;
            }

            // if the last element is reached, this will execute only if
            // the last element also did not match.
            // reset index and break away.
            if (currentNode === this.tail) {
                idx = -1;
                break;
            }

            currentNode = currentNode.next;
        }

        return idx;
    }

    get(index) {
        // if the list is empty, return
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to get`);
            return;
        }

        // if index is not a number, return
        if (typeof index !== 'number') {
            console.warn('Index must be specified as a positive non-zero number');
            return;
        }

        // its a number but out of bounds, so return
        // upper bound is that index should not exceed current lastIndex
        if (index < 0 || index > this.lastIndex()) {
            console.warn('Index out of bounds!');
            return;
        }

        let currentNode = this.head,
            idx = 0,
            value;

        while(currentNode) {
            // index value matched, so get value and break
            if (idx === index) {
                value = currentNode.data;
                break;
            }

            // if the tail is reached, then break, instead of getting the next
            // which would be null and then stopping loop execution.
            if (currentNode === this.tail) {
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return value;
    }

    // inserts data at a given index.
    // allowed inserts are from index = 0 to index=length
    // when index = length, that index is empty at the moment
    // the last filled index is indicated by lastIndex
    insert(data, index) {
        // check if data is empty!
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty!`);
            return;
        }

        // if data is present and if its not a SLLNode type, wrap it with a SLLNode
        if (!(data instanceof SLLNode)) {
            data = new SLLNode(data);
        }

        // index if present, must be a number, else error out
        if ((typeof index !== 'undefined') && (typeof index !== 'number')) {
            console.warn('Index if specified must be a positive non-zero number');
            return;
        }

        // index must be within bounds. We cannot insert at index < 0
        // nor can we insert at index > length.
        // insert at lastIndex means the current lastIndex moves after it.
        // insert at index=current lenth means an .append or .add operation.
        // so there is no way we can insert at index greater than length, as index = length
        // itself is currently empty.
        if (typeof index === 'number' && (index < 0 || index > this.length)) {
            console.warn('index is out of bounds. Specify a non-zero & <= length');
            return;
        }

        // at this point if index is present, its got to be a number, within the range.
        // insertFirst is used when index= 0 or the list is empty
        if ((typeof index === 'number' && index === 0) || this.isEmpty()) {
            insertFirst(this, data);
        } else if ((typeof index === 'number') && (index !== 0) && (index < this.length)) { // for any index !== 0 and index < length
            insertAtIndex(this, data, index);
        } else { // index = length (append or add operation) => append to end of the list
            insertLast(this, data);
        }

        return this.size();
    }

    delete(index) {
        // if list is empty, nothing to delete
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to delete`);
            return;
        }

        // index if present, must be a number, else error out
        if ((typeof index !== 'undefined') && (typeof index !== 'number')) {
            console.warn('Index if specified must be a positive non-zero number');
            return;
        }

        // after this, if index is present, its a number
        // only for insert, we can insert at an index = length, which is current lastIndex + 1
        // for delete, the max we can delete is the current lastIndex
        if ((typeof index === number) && (index < 0 || index > this.lastIndex())) {
            console.warn('Index out of bounds!');
            return;
        }

        let deletedValue;

        // when there is only 1 element present, do a deleteFirst (same as index = 0)
        if (this.length === 1 || index === 0) {
            deletedValue = deleteFirst(this);
        } else if (index !== 0 && index !== this.lastIndex()) {
            // when index is not 0 & is neither the lastIndex (anything < lastIndex is ok)
            deletedValue = deleteAtIndex(this, index);
        } else { // lastIndex deletion
            deletedValue = deleteLast(this);
        }

        return deletedValue;
    }

    // returns the element pointed by the head pointer
    getHead() {
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to get from head`);
            return;
        }

        return this.head;
    }

    // returns the element pointed by the tail pointer
    getTail() {
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to get from tail`);
            return;
        }

        return this.tail;
    }

    // reverses the list
    reverse() {
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to reverse`);
            return;
        }

        if ((this.head === this.tail) && (this.size() === 1)) {
            console.warn(`Only one element present. Nothing to reverse`);
            return;
        }

        let currentNode = this.head,
            prevNode = null,
            nextNode;
        
        // reset the tail to point to current head.
        // This is because currentHead will be reversed.
        this.tail = this.head;
        
        while(currentNode) {
            // this means this is the lastNode in the list
            if (currentNode.next === null) {
                // lastNode becomes the headNode
                currentNode = this.head;
            }

            // the next property of currentNode should point to prevNode
            // set prevNode to be currentNode (currentNode becomes prevNode for nextNode)
            nextNode = currentNode.next;
            currentNode.next = prevNode;
            prevNode = currentNode;
            currentNode = nextNode;
            nextNode = undefined;
        }

        return;
    }

    // recursively reverses the list
    recursiveReverse() {
        if (this.isEmpty()) {
            console.warn(`List is empty! Nothing to recursively reverse`);
            return;
        }
    }
}

exports.SinglyLinkedListWithTail = SinglyLinkedListWithTail;
