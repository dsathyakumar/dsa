'use strict';

const {
    expandIfFull,
    shrinkIfSparse
} = require('./util');

class DynamicCircularArrayDeque {
    constructor(initialCapacity) {
        if (typeof initialCapacity !== 'number' || initialCapacity <= 0) {
            throw new Error('Initial capacity must be a non-empty positive non-zero number');
        }

        this.arr = new Array(initialCapacity);

        // Q specific pointers (numbers that point to array indexes)
        this.front = -1;
        this.rear = -1;

        // in JS, this one step is an extra cost we incur to create Static arrays
        // Its pre-filled with NULL so as to create space. Else since the array is sealed
        // with `empty`, it does not let assign values to indexes. By doing this, we can
        // assign values to array indexes. However, the traditional JS .push() and .pop()
        // operations cannot be performed (as the object is sealed) and a .push() does not
        // fill up the non-empty position from the back, but rather appends the new element
        // to the back.
        this.arr.fill(null);
        Object.seal(this.arr);

        Object.seal(this);
    }

    isFull() {
        return (((this.rear + 1) % this.capacity()) === this.front);
    }

    isEmpty() {
        return ((this.front === -1) && (this.rear === -1));
    }

    // this indicates how much of the actual capacity is filled
    size() {
        if (this.isEmpty()) {
            return 0;
        }

        if (this.front > this.rear) {
            return (this.capacity() - (Math.abs(this.rear - this.front + 1)));
        } else {
            return (this.rear - this.front + 1);
        }
    }

    // this is the capacity (actual size) of the internal array
    capacity() {
        return this.arr.length;
    }

    // prints non-empty indexes between front and rear
    display() {
        if (this.isEmpty()) {
            console.warn(`Cannot display anything. Q is empty!`);
            return;
        }

        let front = this.front;

        do { // executes atleast once for a single element present
            if (this.arr[front] !== null) {
                console.log(this.arr[front]);
            }

            front = (front + 1) % this.capacity();
        } while(front !== this.front);
    }

    // finds if an element exists and return its index, else returns a -1
    find(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn('Data should not be empty!');
            return;
        }

        if (this.isEmpty()) {
            console.warn(`Cannot find anything. Q is empty!`);
            return;
        }

        let front = this.front,
            idx = -1;

        do { // executes atleast once for a single element present
            if (this.arr[front] === data) {
                idx = front;
                break;
            }

            front = (front + 1) % this.capacity();
        } while(front !== this.front);

        return idx;
    }

    // return the element pointed by the front pointer
    getFront() {
        if (this.isEmpty()) {
            console.warn(`Cannot get front. Q is empty!`);
            return;
        }

        return this.arr[this.front];
    }

    // returns the element pointed by rear pointer
    getRear() {
        if (this.isEmpty()) {
            console.warn(`Cannot get rear. Q is empty!`);
            return;
        }

        return this.arr[this.rear];
    }

    // enQ's in the front. (this is not the usual Q operation)
    // this is something specific to deQue and will be handled by the front pointer
    // The front pointer has to decrement (to reach back a prev index) so as to include
    // the new element into the Q (as its being enqueued). This is because, the Q
    // exists only between the index pointed by front and rear.
    // Returns the new size after enQ
    enqueueFront(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn('Data should not be empty!');
            return;
        }

        // b4 enqueueing, resize if needed (assuming its expanding here)
        expandIfFull(this);

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0
        } else {
            --this.front;
            if (this.front < 0) {
                this.front = this.front + this.capacity();
            }
        }

        this.arr[this.front] = data;
        return this.size();
    }

    // enQ's in the rear (this is the usual Q operation)
    // this will be handled by the rear pointer
    // Returns the new size after enQ
    enqueueRear(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn('Data should not be empty!');
            return;
        }

        // b4 enqueueing, resize if needed (assuming its expanding here)
        expandIfFull(this);

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0
        } else {
            ++this.rear;
            if (this.rear > (this.capacity() - 1)) {
                this.rear = this.rear - this.capacity();
            }
        }

        this.arr[this.rear] = data;
        return this.size();
    }

    // deQ's in the front (this is a usual Q operation)
    // this will be handled by the front pointer.
    // Returns the deQ'd element.
    dequeueFront() {
        if (this.isEmpty()) {
            console.warn(`Cannot deQ front. Q is empty!`);
            return;
        }

        let dequeuedElement = this.arr[this.front];
        this.arr[this.front] = null;

        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            ++this.front;
            if (this.front > (this.capacity() - 1)) {
                this.front = this.front - this.capacity();
            }
        }

        // b4 dequeueing, resize if needed (assuming its shrinking here)
        shrinkIfSparse(this);

        return dequeuedElement;
    }

    // deQ's in the rear (this is not a usual Q operation)
    // this is something specific to deQue and will be handled by the rear pointer
    // The rear pointer has to decrement (to reach back a prev index) so as to exclude
    // the new element out of the Q (as its being dequeued). This is because, the Q
    // exists only between the index pointed by front and rear.
    // Returns the deQ'd element.
    dequeueRear() {
        if (this.isEmpty()) {
            console.warn(`Cannot deQ rear. Q is empty!`);
            return;
        }

        let dequeuedElement = this.arr[this.rear];
        this.arr[this.rear] = null;

        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            --this.rear;
            if (this.rear < 0) {
                this.rear = this.rear + this.capacity();
            }
        }

        // b4 dequeueing, resize if needed (assuming its shrinking here)
        shrinkIfSparse(this);

        return dequeuedElement;
    }
}

exports.DynamicCircularArrayDeque = DynamicCircularArrayDeque;
