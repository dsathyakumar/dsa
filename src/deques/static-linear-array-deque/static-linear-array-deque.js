'use strict';

/**
 * This is a Static Linear Deque (Deck)
 * A Deque is a special kind of Q, which supports insertion and Deletion from both the ends.
 * A normal Q supports a FIFO operation, with insertion at Rear and Deletion at front.
 * Bt Deque, is something that supports insertion and Deletion at both ends.
 * Also, sometimes Deque is input restrictable (insertion happens only at one end) or
 * output restricted (deletion happens only at one end).
 * The array within this class is LINEAR (elements DO NOT wrap around) and the array
 * is not resizable.
 */
class StaticLinearArrayDeque {
    constructor(capacity) {
        if (typeof capacity !== 'number' || capacity <= 0) {
            throw new Error('Capacity must be a positive non-zero number');
        }

        // basics for a Q. The Q is only between these 2 indexes.
        // Indexes that are not covered by these 2 index pointers are not part of the Q
        // and will be GC'ed.
        this.front = -1;
        this.rear = -1;
        this.arr = new Array(capacity);

        // in JS, this one step is an extra cost we incur to create Static arrays
        // Its pre-filled with NULL so as to create space. Else since the array is sealed
        // with `empty`, it does not let assign values to indexes. By doing this, we can
        // assign values to array indexes. However, the traditional JS .push() and .pop()
        // operations cannot be performed (as the object is sealed) and a .push() does not
        // fill up the non-empty position from the back, but rather appends the new element
        // to the back.
        this.arr.fill(null);
        Object.seal(this.arr);

        // seal the whole object.
        Object.seal(this);
    }

    isFull() {
        return (this.rear === this.capacity() - 1);
    }

    isEmpty() {
        return ((this.front === -1) && (this.rear === -1));
    }

    // this is the size of the Q (while the whole array is available, Q may not occupy
    // the full of the array. This keeps track of Array size between front and rear pointers.
    // The count of number of elements between the front and rear pointers
    size() {
        if (this.isEmpty()) {
            return 0;
        }

        return (this.rear - this.front + 1);
    }

    // capacity of the internal array
    capacity() {
        return this.arr.length;
    }

    // this is special to deQ (its not a part of normal Q operations)
    // only the front pointer has to take care of this.
    enqueueFront(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data must not be empty!`);
            return;
        }

        if (this.front === 0) {
            console.warn('Cannot insert in front. Will underflow.');
            return;
        }

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            --this.front;
        }

        this.arr[this.front] = data;
        return this.size();
    }

    enqueueRear(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data must not be empty!`);
            return;
        }

        if (this.isFull()) {
            console.warn(`Overflow. The Queue is full. Cannot insert`);
            return;
        }

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            ++this.rear;
        }

        this.arr[this.rear] = data;
        return this.size();
    }

    dequeueFront() {
        if (this.isEmpty()) {
            console.warn(`Q is empty. Nothing to deQ`);
            return;
        }

        let dequedValue = this.arr[this.front];
        this.arr[this.front] = null;

        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            ++this.front;
        }

        return dequedValue;
    }

    // this is special to deQ. (Not a part of normal Q)
    // only the rear pointer has to deal with this.
    dequeueRear() {
        if (this.isEmpty()) {
            console.warn(`Q is empty. Nothing to deQ`);
            return;
        }

        let dequedValue = this.arr[this.rear];
        this.arr[this.rear] = null;

        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            --this.rear;
        }

        return dequedValue;
    }

    find(data) { // finds if an element is present in the Q
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data must not be empty!`);
            return;
        }

        if (this.isEmpty()) {
            console.warn(`Q is empty. Nothing to find`);
            return;
        }

        let front = this.front,
            idx = -1;

        do { // will execute atleast once.
            if (this.arr[front] === data) {
                idx = front;
                break;
            }
        } while(front <= this.rear);

        return idx;
    }

    getFront() { // gets the front element
        if (this.isEmpty()) {
            console.warn(`Q is empty!`);
            return;
        }

        return this.arr[this.front];
    }

    getRear() { // gets the rear element
        if (this.isEmpty()) {
            console.warn(`Q is empty!`);
            return;
        }

        return this.arr[this.rear];
    }

    display() { // displays the Q between the front and rear pointers.
        if (this.isEmpty()) {
            console.warn(`Q is empty. Nothing to display`);
            return;
        }

        let front = this.front;

        do { // will execute atleast once.
            if (this.arr[front] !== null) {
                console.log(this.arr[front++]);
            }
        } while(front <= this.rear);
    }
}

exports.StaticLinearArrayDeque = StaticLinearArrayDeque;
