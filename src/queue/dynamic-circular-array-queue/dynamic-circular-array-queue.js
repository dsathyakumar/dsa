'use strict';

const resize = (dynamicCircularArrayQueue) => {
    if (dynamicCircularArrayQueue instanceof DynamicCircularArrayQueue) {
        // if not full, return
        if (!dynamicCircularArrayQueue.isFull()) {
            return;
        }

        // else, proceed to resize the array at double the current capacity
        let newArr = new Array(2 * (dynamicCircularArrayQueue.capacity()));

        // the old arr => dynamicCircularArrayQueue.arr
        // The resize is being done because it did not have space.
        // Now, we will unfurl the circular wrap and fit it linearly into the new array.
        // In the new Array, the elements are filled from 0th index onwards unlike the old array
        // the iteration starts from old array's FRONT, so that the order of elements is preserved
        let idx = 0,
            front = dynamicCircularArrayQueue.front;
        
        do {
            newArr[idx++] = front;
            front = (front + 1) % dynamicCircularArrayQueue.capacity();
        } while (idx !== front);

        dynamicCircularArrayQueue.front = 0;
        dynamicCircularArrayQueue.rear = (dynamicCircularArrayQueue.capacity() - 1);
        dynamicCircularArrayQueue.arr = newArr;
    }
};

/**
 * This is an implementation of circular Q using dynamic arrays.
 * The array will resize itself (doubling in size) when its limit is reached.
 * So, technically, there is no full. But the function is included so as to check
 * internally if the limit is reached and resize the arry. When we talk of dynamic arrays
 * or ArrayList, the lastIndex holds the index of the filled element and can be used to check
 * if the Array within the ArrayList has filled its capacity. In the same way, for a Dynamic
 * Array Stack, the TOP pointer is used to determine the last filled element index and whether
 * or not the Dynamic Stack should be resized. Here, the isFull function would take care of it.
 */
class DynamicCircularArrayQueue {
    constructor(initialCapacity) {
        if (typeof initialCapacity !== 'number' || initialCapacity <= 0) {
            throw new Error('initial capacity of the Q must be a positive non-zero number');
        }

        this.arr = new Array(initialCapacity);

        // for a circular dynamic Q, the starting point of both these pointers will be -1
        // indicating an empty queue. Both these pointers point to array indexes and are
        // of type Number
        this.front = -1;
        this.rear = -1;

        // the following 2 lines are unwanted operational cost of making the
        // array, static, fixed size. Such arrays are generally not possible in JS
        this.arr.fill(null);
        Object.seal(this.arr);

        Object.seal(this);
    }

    isFull() {
        return (((this.rear + 1) % this.capacity()) === this.front);
    }

    capacity() {
        return (this.arr.length);
    }

    isEmpty() {
        return ((this.rear === -1) && (this.front === -1));
    }

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

    enqueue(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn('Data cannot be empty for dequeue');
            return;
        }

        // will do a resize if FULL
        resize(this);

        // increment the front pointer from -1 to 0
        if (this.isEmpty()) {
            ++this.front;
        }

        // increment and set the data into rear & return the size.
        this.rear = (this.rear + 1) % this.capacity();
        this.arr[this.rear] = data;

        return this.size();
    }

    dequeue() {
        if (this.isEmpty()) {
            console.warn(`Q is empty! Nothing to dequeue`);
            return;
        }

        let dequeuedValue = this.arr[this.front];
        this.arr[this.front] = null;

        // this means, this was the last element in the Q, reset pointers
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
            return dequeuedValue;
        }

        this.front = (this.front + 1) % this.capacity();
        return dequeuedValue;
    }

    peek() {
        if (this.isEmpty()) {
            console.warn(`Q is empty! Nothing to peek`);
            return;
        }

        return this.arr[this.front];
    }

    print() {
        if (this.isEmpty()) {
            console.warn(`Q is empty! Nothing to print`);
            return;
        }

        let idx = this.front,
            currentElement;

        do {
            currentElement = this.arr[idx++];

            if ((currentElement !== null) && (typeof currentElement !== 'undefined')) {
                console.log(currentElement);
            }

            idx = (idx + 1) % this.capacity();
        } while(idx !== this.front);
    }
}

exports.DynamicCircularArrayQueue = DynamicCircularArrayQueue;
