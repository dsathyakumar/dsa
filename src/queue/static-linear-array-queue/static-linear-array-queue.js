'use strict';

/**
 * Note that this is a linear Queue and so cannot be wrapped over to fill
 * the empty spaces (like a circular queue).
 *
 * While its not necessary to reset the empty spaces (that are not a part of the Q)
 * to NULL, we do that, so as to clearly indicate what portion of the array is filled.
 *
 * This is a Linear Queue, built out of a static array. There is no resizing involved.
 *
 * This is the most basic implementation of the Queue - FIFO ADT.
 *
 * While there may be empty slots in the array, the Q is always between front and rear
 * pointers (including both of them)
 */
class StaticLinearArrayQueue {
    constructor(size) {
        if (typeof size !== 'number' || size <= 0) {
            throw new Error('Array must be a positive non-zero number');
        }

        this.arr = new Array(size);

        // the following 2 lines are unwanted operational cost of making the
        // array, static, fixed size. Such arrays are generally not possible in JS
        this.arr.fill(null);
        Object.seal(this.arr);

        // for a linear static Q, the starting point of both these pointers will be -1
        // indicating an empty queue
        this.rear = -1;
        this.front = -1;

        Object.seal(this);
    }

    isEmpty() {
        // this is the initial state of the queue, where there are no elements
        // and both the front and rear point to no indixes.
        return ((this.front === -1) && (this.rear === -1));
    }
    
    isFull() {
        // Here a full Q means that the rear pointer has reached the (arr.length - 1).
        // because this is a static array, there is no wrap around of elements nor is
        // there dynamic resizing. So when rear reaches the lastIndex, its automatically
        // assumed to be full, as nothing more can be enqueued.
        // Also, when there is only 1 element left, Front & read will point to same index.
        // The next dequeue operation will cause front to exceed rear (front > rear)
        return (this.rear === (this.arr.length - 1));
    }

    size() {
        // while the size of the array that holds the queue is indicated by the `size`
        // param in constructor or arr.length, the size of the queue is only the bounds
        // included by the read and front pointer.
        return this.isEmpty() ? 0 : Math.abs((this.rear - this.front) + 1);
    }

    enqueue(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empyty`);
            return;
        }

        if (this.isFull()) {
            console.warn(`Overflow. The Queue is full. Cannot insert`);
            return;
        }

        if (this.isEmpty()) {
            // when the Q is empty, inserting the 1st element will cause it to
            // be set to 0th index. In that case, even front has to be bumped
            // to point to the 0th index. Subsequent insertions, will not bump the
            // value of front. Only rear will be bumped for subsequent insertions.
            this.front++;
        }

        // increment rear pointer and set the data in the incremented index.
        this.arr[++this.rear] = data;
    }

    dequeue() {
        if (this.isEmpty()) {
            console.warn(`Underflow. The Queue is empty. Cannot delete`);
            return;
        }

        let temp = this.arr[this.front];

        this.arr[this.front++] = null; // force set it to NULL here.
        
        // when the last element has been dequeued, while the Q is full.        
        // it does not mean that the Q is filled fully. Bt at this point, when
        // newer elements are inserted, they can very well start at the beginnning
        // rather than move them to this.read+1 and waste space in front.
        if ((this.front > this.rear)) {
            this.front = this.rear = -1;
        }

        return temp;
    }

    peek() {
        if (this.isEmpty()) {
            console.warn(`Underflow. The Queue is empty. Cannot peek`);
            return;
        }

        return this.arr[this.front];
    }

    print() {
        if (this.isEmpty()) {
            console.warn(`Underflow. The Queue is empty. Cannot print`);
            return;
        }

        // an operational Queue is only those elements within the range of the
        // front and rear pointer. So the iteration should involve only that range.
        for(let count = this.front; count <= (this.rear); count++) {
            console.log(this.arr[count]);
        }
    }
}

exports.StaticLinearArrayQueue = StaticLinearArrayQueue;
