'use strict';

/**
 * The Stack is usually implemented by visualizing an array vertically
 * setup, with the 0th index at the bottom.
 *
 * The 1st element is inserted into the 0th element & this will be the Last
 * element to be popped out of the stack. The stack thus follows the LIFO principle.
 *
 * Newer elements are pushed into the stack, from the top and they fill up the 1st, 2nd
 * 3rd.. (n-1)th index and so on. When a .pop() is done, the top most element in the stack,
 * for eh) the (n-1)th element will be popped. The top pointer always points to the top element
 * of the stack, which will 1st be popped out.
 *
 * As more elements are pushed, the top gets incremented.
 * As more elements are popped, the top gets decremented.
 *
 * Also, given that the 0th index is at the bottom, the upper indexes of the array at the top,
 * resembles a JS array with a PUSH operation (insert at the end) and POP operation (delete at the end).
 *
 * Bt, given an empty array with 3 indexes and doing a [].push(), the JS array would not
 * insert into the 1st empty position from the back, instead would just append at the back.
 * Therefore, a traditional JS .push operation cannot be used to mirror the stack push().
 */
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

        // return the popped data
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
