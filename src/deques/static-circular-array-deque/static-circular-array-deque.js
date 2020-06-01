'use strict';

/**
 * This is a Static Circular Deque (Deck)
 * A Deque is a special kind of Q, which supports insertion and Deletion from both the ends.
 * A normal Q supports a FIFO operation, with insertion at Rear and Deletion at front.
 * Bt Deque, is something that supports insertion and Deletion at both ends.
 * Also, sometimes Deque is input restrictable (insertion happens only at one end) or
 * output restricted (deletion happens only at one end).
 * The array within this class is logically circular (elements wrap around) and the arrau
 * is not resizable.
 */
class StaticCircularArrayDeque {
    constructor(size) {
        if (typeof size !== 'number' || size <= 0) {
            throw new Error('Size must be of type number and a positive non-zero');
        }

        // basics for a Q. The Q is only between these 2 indexes.
        // Indexes that are not covered by these 2 index pointers are not part of the Q
        // and will be GC'ed.
        this.front = -1;
        this.rear = -1;
        this.arr = new Array(size);

        // in JS, this one step is an extra cost we incur to create Static arrays
        // Its pre-filled with NULL so as to create space. Else since the array is sealed
        // with `empty`, it does not let assign values to indexes. By doing this, we can
        // assign values to array indexes. However, the traditional JS .push() and .pop()
        // operations cannot be performed (as the object is sealed) and a .push() does not
        // fill up the non-empty position from the back, but rather appends the new element
        // to the back.
        this.arr.fill(null);
        Object.seal(this.arr);

        // seal the object instance
        Object.seal(this);
    }

    isFull() {
        return (((this.rear + 1) % this.capacity()) === (this.front));
    }

    isEmpty() {
        return ((this.front === -1) && (this.rear === -1));
    }

    capacity() {
        return this.arr.length;
    }

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

    display() {
        if (this.isEmpty()) {
            console.warn(`Cannot display anything in an empty Q`);
            return;
        }

        let front = this.front;

        do {
            // print non-empty spots only
            if (this.arr[front] !== null) {
                console.log(this.arr[front]);
            }
            front = (front + 1) % this.capacity();
        } while(front !== this.front);
    }

    /**
     * The point to note here is, as more and more elements are inserted into the front
     * of the Q, the front pointer which points to the front / starting point of the Q is the one
     * that is getting affected. Everytime a deQ is done, the front pointer is incremented
     * so that the deQ'd element is no longer part of the Q (its excluded from the Q). In enQFront,
     * the exact opposite happens, the front must be decremented so as to include a previous index
     * into the Q (so that it becomes part of the Q)
     * Also, usually the rear pointer decides where the enQ'd element is placed. Now the front
     * pointer decides it (as it is the one getting affected)
     * @param {Any} data
     */
    enqueueFront(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty!`);
            return;
        }

        if (this.isFull()) {
            console.warn(`Cannot enQ into a FULL Q`);
            return;
        }

        // A) When Q is empty, rear = front = 0; (enQFront is same as enQ rear)
        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            --this.front;
            if (this.front < 0) {
                this.front = (this.front + this.capacity());
            }
        }

        this.arr[this.front] = data;
        return this.size();
    }

    /**
     * This is the usual Q operation only
     */
    enqueueRear(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty!`);
            return;
        }

        if (this.isFull()) {
            console.warn(`Cannot enQ into a FULL Q`);
            return;
        }

        // A) When Q is empty, rear = front = 0; (enQFront is same as enQ rear)
        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            ++this.rear;

            if (this.rear > (this.capacity() - 1)) {
                this.rear = (this.rear - this.capacity());
            }
            // the following line can also be used (there is no equivalent of this for left shifts)
            // this.rear = ((this.rear + 1) % this.capacity());
        }

        this.arr[this.rear] = data;
        return this.size();
    }

    // This is same as the usual deQ operation in a Q
    dequeueFront() {
        if (this.isEmpty()) {
            console.warn(`Nothing to DeQ. Q is empty`);
            return;
        }

        let dequeuedValue;
        dequeuedValue = this.arr[this.front];
        this.arr[this.front] = null;

        // if its the last element in the Q, then its time to reset front and rear pointers
        // to -1
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            ++this.front;
            if (this.front > (this.capacity() - 1)) {
                this.front = (this.front - this.capacity());
            }
        }

        return dequeuedValue;
    }

    dequeueRear() {
        if (this.isEmpty()) {
            console.warn(`Nothing to deQ. Q is empty`);
            return;
        }

        let dequeuedValue;
        dequeuedValue = this.arr[this.rear];
        this.arr[this.rear] = null;

        // if its the last element in the Q, then its time to reset front and rear pointers
        // to -1
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            --this.rear;
            if (this.rear < 0) {
                this.rear = (this.rear + this.capacity());
            }
        }

        return dequeuedValue;
    }

    getFront() {
        if (this.isEmpty()) {
            console.warn(`Nothing to get at Front. Q is empty`);
            return;
        }

        return this.arr[this.front];
    }

    getRear() {
        if (this.isEmpty()) {
            console.warn(`Nothing to get at Rear. Q is empty`);
            return;
        }

        return this.arr[this.rear];
    }

    find(data) {
        if (this.isEmpty()) {
            console.warn(`Nothing to find. Q is empty`);
            return;
        }

        let front = this.front,
            idx = -1;

        do {
            if (this.arr[front] === data) {
                idx = front;
                break;
            }
            front = ((front + 1) % this.capacity());
        } while(front !== this.front);

        return idx;
    }
}

exports.StaticCircularArrayDeque = StaticCircularArrayDeque;
