'use strict';

class Stack {
    constructor(size) {
        if (size <= 0) {
            throw new Error(`Stack cannot be defined with zero or negative size`);
        }

        // sets the top pointer to -1 (per the Stack ADT)
        this.top = -1;

        // generate a fixed length array to build the stack
        this.stack = new Array(size);
        // to have a fixed size Array, it has to be sealed.
        // But when sealing a new Array with empty slots, it no longer lets to
        // assign values. So we allocated NULLs to start with & then assign values.
        this.stack.fill(null);

        // makes the array fixed size (elements can no longer be pushed)
        // a .push() operation inserts "at the end" and not "from the end to the empty slot"
        // For eg) if length of Array is 3, a .push() will insert at index = 2 and not
        // index = 0 (even if the indexes before 2 were empty)
        Object.seal(this.stack);

        // seal the instance
        Object.seal(this);
    }

    size() {
        return this.top;
    }

    push(data) {
        if (this.isFull()) {
            console.warn(`Stack Overflow!`);
            return;
        }

        this.top++;
        this.stack[this.top] = data;
    }

    pop() {
        if (this.isEmpty()) {
            console.warn(`Stack Underflow!`);
            return;
        }

        const data = this.stack[this.top];
        this.stack[this.top] = null;
        this.top--;
        return data;
    }

    peek() {
        if (this.isEmpty()) {
            console.warn(`Cannot peek into an empty stack!`);
            return;
        }

        return this.stack[this.top];
    }

    view() {
        if (this.isEmpty()) {
            console.warn(`Cannot print elements of an empty stack!`);
            return;
        }

        for (let count = this.top; count >= 0; count--) {
            console.log(this.stack[count]);
        }
    }

    find(data) {
        if (this.isEmpty()) {
            console.warn(`Cannot find elements from an empty stack!`);
            return;
        }

        let idx = -1;

        for (let count = this.top; count >= 0; count--) {
            if(this.stack[count] === data) {
                idx = count;
                break;
            }
        }

        return idx;
    }

    destroy() {

    }

    isFull() {
        return this.top === (this.stack.length - 1);
    }

    isEmpty() {
        return (this.top === -1);
    }
}

exports.Stack = Stack;
