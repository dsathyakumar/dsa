'use strict';

/**
 * Note that this is a circular static Q, which means, the elements can be wrapped
 * over back to the front of the array and fill any empty dequed indexes (if present).
 *
 * This implementation takes a static Circular Array. No resizes are involved here.
 *
 * While its not necessary to reset the empty spaces (that are not a part of the Q)
 * to NULL, we do that, so as to clearly indicate what portion of the array is filled.
 *
 * This is the most basic implementation of the Queue - FIFO ADT.
 *
 * While there may be empty slots in the array, the Q is always between front and rear
 * pointers (including both of them)
 * 
 * Ref: Jenny's Lectures and
 * http://www.mathcs.emory.edu/~cheung/Courses/171/Syllabus/8-List/array-queue2.html
 * 
 * In MathCS Emory, the write / rear pointer is incremented after its written into a given location.
 * Bt the implementation of circular Q usually updates locations and then writes.
 */
class StaticCircularArrayQueue {
    constructor(size) {
        if (typeof size !== 'number' || size <= 0) {
            throw new Error('Array must be a positive non-zero number');
        }

        this.arr = new Array(size);

        // the following 2 lines are unwanted operational cost of making the
        // array, static, fixed size. Such arrays are generally not possible in JS
        this.arr.fill(null);
        Object.seal(this.arr);

        // for a circular static Q, the starting point of both these pointers will be -1
        // indicating an empty queue. Both these pointers point to array indexes and are
        // of type Number
        this.rear = -1;
        this.front = -1;

        Object.seal(this);
    }

    // Techinically, per math cs emory (http://www.mathcs.emory.edu/~cheung/Courses/171/Syllabus/8-List/array-queue2.html)
    // the Q is EMPTY when (front === rear), while this maybe correct from a tech standpoint,
    // while implementing, we assume that front and rear start with -1. And this state of -1
    // indicates an empty Q. So here, front === rear === -1, but the Q is empty.
    // Also, just (front === rear) also indicates, that there is just 1 element left in the Q
    // and both the front and rear are pointing to the same element.
    isEmpty() {
        return ((this.front === -1) && (this.rear === -1));
    }

    // would return the occupied size of the Q
    size() {
        if (this.isEmpty()) {
            return 0;
        }

        if (this.front > this.rear) {
            return (this.capacity() - Math.abs(this.rear - this.front + 1));
        } else {
            return (this.rear - this.front + 1);
        }
    }

    // size of the array held within the class
    capacity() {
        return this.arr.length;
    }

    // this is to determine if the Q is FULL
    isFull() {
        return (((this.rear + 1) % this.capacity()) === this.front);
    }

    // updates rear pointer and inserts data in updated location.
    enqueue(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data is empty! Cannot enqueue empty data`);
            return;
        }

        // when the Q is empty, both the front and rear pointer must be incremented.
        // This is the 1st enqueue operation.
        if (this.isEmpty()) {
            ++this.front;
            this.arr[++this.rear] = data;
            return this.size();
        }

        // if the Q is not empty, then find the next place to insert by updating the rear
        this.rear = ((this.rear + 1) % this.capacity());

        // insert the data in the updated rear pointer location
        this.arr[this.rear] = data;

        // return the size
        return this.size();
    }

    // dequeues from currently pointed front location and then updates the front pointer
    dequeue() {
        if (this.isEmpty()) {
            console.warn(`The Q is empty. Nothing to dequeue!`);
            return;
        }

        // get the value into temp variable so that it can be returned.
        let tempVal = this.arr[this.front];

        // forceset the space to NULL
        this.arr[this.front] = null;

        // if this was the last element in the queue, then both the front and rear
        // would be pointing to the same index. Given that the last element was dequeued,
        // both these pointers have to be reset to -1
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
            return tempVal;
        }

        // if this was not the last element & the Q was not empty, then bump the front pointer
        // its possible that there is just 1 element now and after this update to the front
        // pointer, both the front and back are pointing to the same array index.
        this.front = ((this.front + 1) % this.capacity());

        // return the dequeued value
        return tempVal;
    }

    peek() {
        if (this.isEmpty()) {
            console.warn(`The Q is empty. Nothing to peek!`);
            return;
        }

        // return the front element that is pointed to by the front pointer
        return this.arr[this.front];
    }

    print() {
        if (this.isEmpty()) {
            console.warn(`The Q is empty. Nothing to print!`);
            return;
        }

        let idx = this.front;

        do {
            if (typeof this.arr[idx] !== 'undefined' && this.arr[idx] !== null) {
                console.log(this.arr[idx]);
            }
            idx = (idx + 1) % this.capacity();
        } while(idx !== this.front);
    }
}

exports.StaticCircularArrayQueue = StaticCircularArrayQueue;
