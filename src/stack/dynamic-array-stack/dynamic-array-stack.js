'use strict';

// capacity is the internal arr length.
// so (top + 1) means the lastIndex
const shouldResize = (top, capacity) => (top + 1 === capacity);

const resize = (dynamicStack) => {
    if (dynamicStack instanceof DynamicArrayStack) {
        if (!shouldResize(dynamicStack.top, dynamicStack.arr.length)) {
            return;
        }
    
        let tempArr = new Array(2 * dynamicStack.arr.length);

        // in JS, this one step is an extra cost we incur to create Static arrays
        tempArr.fill(null);
        Object.seal(tempArr);
    
        for (let stackCounter = 0; stackCounter <= (dynamicStack.top); stackCounter++) {
            tempArr[stackCounter] = dynamicStack.arr[stackCounter];
        }
    
        dynamicStack.arr = tempArr;
    }
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

        Object.seal(this);
    }

    size() {
        return (this.top + 1);
    }

    view() {
        if (this.isEmpty()) {
            console.warn(`The stack is empty. Nothing to print!`);
            return;
        }

        for(let stackCounter = this.top; stackCounter >= 0; stackCounter--) {
            console.log(this.arr[stackCounter]);
        }
    }

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

    push(data) {
        if(typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty!`);
            return;
        }

        // no need to check for full here as this is a dynamic stack.
        resize(this);

        // increments and returns the top pointer. So we set into an incremented index.
        this.arr[++this.top] = data;

        return this.top; // same as returning the length in case of a JS .push operation.
    }

    pop() {
        if (this.isEmpty()) {
            console.warn(`The stack is empty. Nothing to pop!`);
            return;
        }

        // get the popped data so that it can be returned.
        let poppedData = this.arr[this.top];

        // the current top index is set to NULL and top pointer is decremented.
        this.arr[this.top--] = null;
        return poppedData;
    }

    peek() {
        if (this.isEmpty()) {
            console.warn(`The stack is empty. Nothing to peek!`);
            return;
        }

        return this.arr[this.top];
    }

    isEmpty() {
        return (this.top === -1);
    }
}

exports.DynamicArrayStack = DynamicArrayStack;
