'use strict';

const {
    Node
} = require('./node');

class DynamicLinearLLQueue {
    constructor() {
        // note that front and rear are not holding any index values here.
        // so there is no need to do a ++front or a ++rear. They instead hold
        // reference to the Node of a SLL.
        this.front = null;
        this.rear = this.front;
        this.length = 0;
    }

    isEmpty() {
        return ((this.front === null) && (this.rear === null) && (this.length === 0));
    }

    size() {
        return this.length;
    }

    display() {
        if (this.isEmpty()) {
            console.warn(`Nothing to print. Q is empty!`);
            return;
        }

        let currentNode = this.front;

        while(currentNode) {
            console.log(currentNode.data);

            // run the loop until the currentNode is same as the node that
            // the rear pointer was pointing to.
            if (currentNode === this.rear) {
                break;
            }

            currentNode = currentNode.next;
        }
    }

    peek() {
        if (this.isEmpty()) {
            console.warn(`Nothing to peek. Q is empty!`);
            return;
        }

        // return the data part of whatever reference the FRONT pointer points to.
        return this.front.data;
    }

    enqueue(node) {
        if (typeof node === 'undefined' || node === null) {
            console.warn(`Data must not be empty!`);
            return;
        }

        if (!(node instanceof Node)) {
            console.warn(`node must be instance of Node`);
            return;
        }

        if (this.isEmpty()) {
            this.front = node;
            this.rear = node;
            return ++this.length;
        }

        this.rear.next = node;
        node.next = null;
        this.rear = node;

        return ++this.length; // return the length after an enqueue
    }

    dequeue() {
        if (this.isEmpty()) {
            console.warn(`Nothing to delete. Q is empty!`);
            return;
        }

        // if this is the only node or the last node, next will be NULL.
        let headNode = this.front;

        // set the front to point to the next of the headNode
        this.front = headNode.next;

        --this.length;

        // the only 2 cases when Front and rear point to the same reference.
        // we could have checked for this.isEmpty in place of this.length === 0
        // bt only front has been set to NULL, rear is yet to be set to NULL.
        // so using this.length === 0 check here.
        if (this.length === 1 || this.length === 0) {
            // set rear also to point to 
            this.rear = headNode.next;
        }

        // break the link between headNode and the nextNode (so that only that can be returned)
        headNode.next = null;

        return headNode; // return the dequeued Node
    }
}

exports.DynamicLinearLLQueue = DynamicLinearLLQueue;
