'use strict';

const {
    Node
} = require('./node');

/**
 * This is a Stack implementation based on building the Stack
 * as a Linked List. The Top pointer is same as the head node.
 * So the inserts and deletes are something that happen at the first.
 * Technically such a LinkedList based implementation would not experience
 * any overflows as there is no fixed size. So an isFull() function no longer
 * makes sense to check on uppper bounds.
 */
class DynamicSinglyLinkedListStack {
    constructor() {
        this.length = 0; // > length of the Stack
        this.top = null; // > The topNode which holds a ref to the 1st element of the LL
        Object.seal(this);
    }

    isEmpty() {
        return ((this.length === 0) && (this.top === null));
    }

    size() {
        return this.length;
    }

    push(node) {
        if (typeof node === 'undefined' || (typeof node === null)) {
            console.warn(`Node cannot be empty`);
            return;
        }

        if (!(node instanceof Node)) {
            console.warn(`Node isn't of type <Node>`);
            return;
        }

        let currentHead = this.top;
        node.next = currentHead;
        this.top = node;
        this.length++;
    }

    pop() {
        if (this.isEmpty()) {
            console.warn(`Linked Stack is empty.`);
            return;
        }

        const data = this.top;
        this.top = this.top.next;

        this.length--;

        return data;
    }

    peek() {
        if (this.isEmpty()) {
            console.warn(`Linked Stack is empty.`);
            return;
        }

        return this.top.data;
    }

    view() {
        if (this.isEmpty()) {
            console.warn(`Linked Stack is empty.`);
            return;
        }

        let currentNode = this.top;

        while(currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }

    find(data) {
        if (this.isEmpty()) {
            console.warn(`Linked Stack is empty.`);
            return;
        }

        if (!data) {
            console.warn(`data is empty`);
            return;
        }

        let currentNode = this.top,
            idx = (this.length - 1);
        
        while(currentNode) {
            if (currentNode.data === data) {
                break;
            }
            currentNode = currentNode.next;
            idx--;
        }

        return idx;
    }

    modify(oldData, newData) {
        if (this.isEmpty()) {
            console.warn(`Linked Stack is empty.`);
            return;
        }

        if (!oldData || !newData) {
            console.warn(`One or both data is empty`);
            return;
        }

        let currentNode = this.top;

        while(currentNode) {
            if (currentNode.data === oldData) {
                currentNode.data = newData;
            }
            currentNode = currentNode.next;
        }
    }
}

exports.DynamicSinglyLinkedListStack = DynamicSinglyLinkedListStack;
