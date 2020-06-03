'use strict';

const expandIfFull = (dynamicArrayStack) => {
    // no need to expand upon a first insert (just because the stack is empty)
    if (dynamicArrayStack.isEmpty()) {
        return;
    }

    const currentCapacity = dynamicArrayStack.capacity();

    // do nothing if not full.
    if (!dynamicArrayStack.isFull()) {
        return;
    }

    const newArr = new Array(2 * currentCapacity);

    // in JS, this one step is an extra cost we incur to create Static arrays
    newArr.fill(null);
    Object.seal(newArr);

    // even if the current array is smaller than newArr
    // its current occupied limit is defined by top
    for (let idx = 0; idx <= (dynamicArrayStack.top); idx++) {
        newArr[idx] = dynamicArrayStack.arr[idx];
    }

    dynamicArrayStack.arr = newArr;

    // no need to re-assign top pointer again.

    return;
};

const shrinkIfSparse = (dynamicArrayStack) => {
    // no need to shrink after last element has popped, because the occupancy factor
    // will be 0
    const currentCapacity = dynamicArrayStack.capacity();
    const occupancyFactor = (dynamicArrayStack.size() / currentCapacity);
    const shouldShrink = ((occupancyFactor > 0) && (occupancyFactor <= 0.25));

    if (!shouldShrink) {
        return;
    }

    const newArr = new Array(Math.ceil(currentCapacity / 2));

    // in JS, this one step is an extra cost we incur to create Static arrays
    newArr.fill(null);
    Object.seal(newArr);

    // even if the current array is larger than newArr
    // its current occupied limit is defined by top
    for (let idx = 0; idx <= (dynamicArrayStack.top); idx++) {
        newArr[idx] = dynamicArrayStack.arr[idx];
    }

    dynamicArrayStack.arr = newArr;

    // no need to re-assign top pointer again.

    return;
};

class DynamicArrayStack {
    constructor(capacity) {
        if (typeof capacity === 'undefined' || capacity === null || typeof capacity !== 'number') {
            throw new Error('Stack must be initialized with initial capacity as a positive non-zero number');
        }

        // to start with there are no elements (the stack is pre-filled with NULL)
        // Usually, The `lastIndex` is how we check to see how much of the Static Stack is actually filled.
        // while the `capacity` is used to create a fixed size stack, how much of it is actually filled,
        // will be decided by the `lastIndex`. When the `lastIndex` approaches the `capacity`, we decide
        // that the static stack is nearly filled and nearing capacity & needs to be resized.
        // Given that this is a dynamic array Stack, we use the stack convention of a `top` pointer
        // in place of `lastIndex`.
        this.top = -1;

        // creating a fixed size array with the initial `capacity`
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

        // seal the given instance
        Object.seal(this);
    }

    // determines if the current internal array in the stack is empty
    isEmpty() {
        return (this.top === -1);
    }

    // determines if the current internal array is full
    isFull() {
        return (this.top === (this.capacity() - 1));
    }

    // returns the number of occupied elements in the stack
    // top pointer here is similar to the lastIndex in a arrayList (dynamic array)
    // it always indicates the index upto which the internal array is currently filled.
    size() {
        return (this.top + 1);
    }

    // actual capacity of the current internal Array within the stack
    capacity() {
        return this.arr.length;
    }

    // prints top down (top element of the stack to the bottom of the stack)
    view() {
        if (this.isEmpty()) {
            console.warn(`The stack is empty. Nothing to print!`);
            return;
        }

        for(let stackCounter = this.top; stackCounter >= 0; stackCounter--) {
            console.log(this.arr[stackCounter]);
        }
    }

    // determines if the data is present in the stack and returns the index.
    // if not present, returns a -1
    find(data) {
        if (this.isEmpty()) {
            console.warn(`The stack is empty. Nothing to peek!`);
            return;
        }

        if(typeof data === 'undefined' || data === null) {
            console.warn('Data cannot be empty!');
            return;
        }

        let idx = -1;

        for(let stackCounter = 0; stackCounter <= (this.top); stackCounter++) {
            if (this.arr[stackCounter] === data) {
                idx = stackCounter;
                break;
            }
        }

        return idx;
    }

    // pushes a data to the top of the stack
    push(data) {
        if(typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty!`);
            return;
        }

        // no need to check for full here as this is a dynamic stack.
        // the condition is self contained within the method and it determines if the
        // internal array needs to be doubled (once its capacity is met)
        expandIfFull(this);

        // increments and returns the top pointer. So we set into an incremented index.
        this.arr[++this.top] = data;

        return this.size(); // same as returning the length in case of a JS .push operation.
    }

    // pops the data from the top of the stack
    pop() {
        if (this.isEmpty()) {
            console.warn(`The stack is empty. Nothing to pop!`);
            return;
        }

        // get the popped data so that it can be returned.
        let poppedData = this.arr[this.top];

        // the current top index is set to NULL and top pointer is decremented.
        this.arr[this.top--] = null;

        // will determine if the array has to be sized down if its too sparse
        shrinkIfSparse(this);

        return poppedData;
    }

    // peeks data at the top (returns the data pointed by the top pointer)
    peek() {
        if (this.isEmpty()) {
            console.warn(`The stack is empty. Nothing to peek!`);
            return;
        }

        return this.arr[this.top];
    }
}

exports.DynamicArrayStack = DynamicArrayStack;
