'use strict';

const {
    CLLNode
} = require('./node');

class DynamicCircularCLLQueue {
    constructor() {
        this.rear = null;
        this.length = 0;
    }

    isEmpty() {
        return ((this.length === 0) && (this.rear === null));
    }

    // the number of elements in the Q
    size() {
        return this.length;        
    }

    // displays all the elements in the CLL Q
    display() {
        if (this.isEmpty()) {
            console.warn(`The list is empty. Nothing to display`);
            return;
        }

        // begin iteration from the front Node to the Rear Node.
        // The front Node is got from the rear node as rear.next (as its a CLL)
        let currentNode = this.rear.next;

        while(currentNode) {
            console.log(currentNode.data);

            // exits after printing the currentNode (if it was the rear node)
            // this check is needed, else the CLL would loop around infinitely
            if (currentNode === this.rear) {
                break;
            }

            currentNode = currentNode.next;
        }
    }

    find(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty!`);
            return;
        }

        if (this.isEmpty()) {
            console.warn(`The list is empty. Nothing to find`);
            return;
        }

        let currentNode = this.rear.next,
            idx = -1; // default case is Node does not exist.

        while(currentNode) {
            // if the currentnode's data equals the incoming data, then break.
            // whatever incremented index so far, is the currentIndex at which the Node exists
            if (currentNode.data === data) {
                break;
            }

            // if suppose the currentNode equals the rear, then its the last node.
            // this check is needed to avoid cycling around the CLL infinitely.
            // if the lastNode had the data matched, it would've broken the loop in the
            // above statement itself. It did not, meaning, that the lastNode also does
            // not have data, matching the incoming data. So the data does not exist in the CLL
            if (currentNode === this.rear) {
                idx = -1;
                break;
            }

            // proceed forward with the loop from front to rear.
            currentNode = currentNode.next;
            idx++;
        }

        return idx; // > returns the index at which the node exists
    }

    // this being a Q, has normal enQ operation performed at the rear
    enqueue(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty!`);
        }

        let newNode = data;

        if (!(data instanceof CLLNode)) {
            newNode = new CLLNode(data);
        }

        if (this.isEmpty()) {
            this.rear = newNode;
            newNode.next = newNode;
        } else {
            newNode.next = this.rear.next;
            this.rear.next = newNode;
        }

        ++this.length;

        return this.size();
    }

    // this being a Q, has normal deQ operation performed at the front
    dequeue() {
        if (this.isEmpty()) {
            console.warn(`The list is empty. Nothing to deQ`);
            return;
        }

        let dequeuedValue = this.rear.next;

        // then there is only 1 element left in the CLL dynamic Q.
        // if this is removed, then the pointers have to be reset.
        if (this.rear === this.rear.next) {
            this.rear = null;
        } else {
            let currentFrontNode = this.rear.next;
            this.rear.next = currentFrontNode.next;
            currentFrontNode.next = null;
            currentFrontNode = undefined;
        }

        --this.length;
        return dequeuedValue;
    }

    getFront() {
        if (this.isEmpty()) {
            console.warn(`The list is empty. Nothing to get from front`);
            return;
        }

        // return the Node referenced by the rear pointer's next (front pointer)
        return this.rear.next;
    }

    getRear() {
        if (this.isEmpty()) {
            console.warn(`The list is empty. Nothing to get from rear`);
            return;
        }

        // return the Node referenced by the rear pointer
        return this.rear;
    }
}

exports.DynamicCircularCLLQueue = DynamicCircularCLLQueue;
