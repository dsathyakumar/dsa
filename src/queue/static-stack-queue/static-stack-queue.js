'use strict';

const {
    StaticArrayStack    
} = require('../../stack/static-array-stack/static-array-stack');

/**
 * This implements a Q using Stack.
 * This will use 2 stacks internally. While Stack_1 actually holds / stores elements,
 * Stack_2 is used to perform operations such as enQ and deQ, using the stack LIFO paradigm,
 * but still achieve the Q FIFO paradigm. Stack_2 is an aux stack.
 *
 * Stack maintains the LIFO paradigm.
 * Q maintains the FIFO paradigm.
 * 
 * We are to implement a Q (FIFO) using the Stack (LIFO) paradigm.
 * In doing so, we can optimize for one of the operations only (at any given time):
 * Either ENQUEUE or DEQUEUE.
 * In Q, both insertion and deletion is O(1) constant time.
 *
 * There is no need to maintain a FRONT and REAR reference here, since if the
 * element is deQ'd, then the rest of the stack is allowed to fill (index is not important),
 * only the order is important.
 */
class StaticStackQueue {
    constructor(size) {
        // stack and aux stack have tobe of the same size as they both hold the
        // same number of elements.
        this.stack = new StaticArrayStack(size);
        this.auxStack = new StaticArrayStack(size);

        Object.seal(this);
    }

    isFull() {
        return (this.stack.isFull());
    }

    isEmpty() {
        return (this.stack.isEmpty());
    }

    size() {
        return (this.stack.size());
    }

    capacity() {
        return (this.stack.capacity());
    }

    peek() {
        return this.stack.peek();
    }

    // this is a Q that makes enQ operation cheaper
    enqueue(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`cannot enQ empty data.`);
            return;
        }

        // by pushing data into stack, without any costly operation
        // this optimizes the enQ operation (enQ is quick). Bt the consequence of this is,
        // the 1st data that is inserted here, will have to be removed first (per Q's definition).
        // Bt, by stack's rules, this will be the Last data to go out.
        return this.stack.push(data);
    }

    // since enQ is cheaper, deQ will be costly
    // since enQ was optimized, the 1st data that went in, is now deep in the stack,
    // to get the 1st data out (data at 0th index for FIFO), we will have to pop out all data
    // above it (stack's rules of LIFO), using the aux stack
    // so the 1st popped element will be the 1st element pushed into aux stack,
    // thereby, at the end of this, the 1st element in stack will become the 1st element in aux stack
    // then this 1st element will be popped out from aux stack and the rest of the elements
    // pushed back again from aux stack to stack (thereby maintaining original order)
    dequeue() {
        if (this.isEmpty()) {
            console.warn(`cannot deQ from empty Q`);
            return;
        }

        // this moves the 1st element (at 0th index, which has to be deQ'ed)
        // to the top of the aux stack
        for (let stackCounter = this.stack.top; stackCounter >= 0; stackCounter--) {
            let currentStackElement = this.stack.pop();
            this.auxStack.push(currentStackElement);
        }

        // pop the 1st element at 0th index (which is now at the top index of aux stack)
        // from aux stack
        let deQueuedValue = this.auxStack.pop();

        // push back elements from aux stack into stack (thereby maintaining original order)
        for (let auxStackCounter = this.auxStack.top; auxStackCounter >= 0; auxStackCounter--) {
            let currentAuxStackElement = this.auxStack.pop();
            this.stack.push(currentAuxStackElement);
        }

        return deQueuedValue;
    }

    print() {
        this.stack.view();
    }
}

exports.StaticStackQueue = StaticStackQueue;
