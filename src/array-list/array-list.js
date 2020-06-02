'use strict';

const {
    shiftLeft,
    shiftRight,
    expandIfFull,
    shrinkIfSparse
} = require('./util');

/**
 * Array inserts and Deletes require knowledge of array shifts / rotations
 * and which in turn require knowledge of array reversals.
 *
 * This implementation is based on the blog on Dynamic Arrays by InterviewCake
 * and by videos of William Fiset and DaveFeinberg on youtube.
 *
 * The Amortized time complexity of an insert (with a resize) is o(1).
 * Check out Nerd's youtube video regarding this for Amortized time complexity
 * calculation of ArrayList resize.
 */
class ArrayList {
    constructor(capacity) {
        if (typeof capacity === 'undefined' || typeof capacity !== 'number') {
            throw new Error('Cannot instantiate without initial capcacity. Must be a positive non-zero number');
        }

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

        // to start with there are no elements (the array is pre-filled with NULL)
        // The lastIndex is how we check to see how much of the Static Array is actually filled.
        // while the capacity is used to create a fixed size array, how much of it is actually filled,
        // will be decided by the lastIndex. When the lastIndex approaches the capacity, we decide
        // that the static array is nearly filled and nearing capacity & needs to be resized.
        this.lastIndex = -1;
    }
  
    print() {
        if (this.isEmpty()) {
            console.warn(`The dynamic list is empty! Nothing to print.`);
            return;
        }

        for (let indexCounter = 0; indexCounter <= (this.lastIndex); indexCounter++) {
            console.log(this.arr[indexCounter]);
        }
    }

    /**
     * Does the same operation as Array.prototype.shift
     * Removes the element at zeroth index and left
     * shifts the full array
     */
    shift() {
        if (this.isEmpty()) {
            console.warn(`Cannot do operation shift on empty list`);
            return;
        }

        let temp = this.arr[0];

        shiftLeft(this, 0);

        --this.lastIndex;

        shrinkIfSparse(this);

        return temp;
    }

    /**
     * Does the same operation as Array.prototype.unshift
     * Adds a new element to the 0th index of the array
     * and right shifts all elements by 1 (done before adding the new element)
     * @param {*} data 
     */
    unshift(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty`);
            return;
        }

        expandIfFull(this);

        shiftRight(this, 0);

        this.arr[0] = data;

        ++this.lastIndex;

        return this.size();
    }

    /**
     * Deletes an element at a specific index as long as the index is not
     * greater than the lastIndex. The other elements in indexes after it
     * are pulled up
     * @param {Number} index
     */
    delete(index) {
        if (this.isEmpty()) {
            console.warn(`Cannot do operation delete on empty list`);
            return;
        }

        if (typeof index === 'undefined' || typeof index !== 'number') {
            console.warn(`Index must be specified as a number`);
            return;
        }

        if (index > this.lastIndex) {
            console.warn('Cannot delete beyound the lastIndex');
            return;
        }

        let temp = this.arr[index];
        
        shiftLeft(this, index);

        --this.lastIndex;

        shrinkIfSparse(this);

        return temp;
    }

    /**
     * Inserts an element at a specific >=0 && <= lastIndex + 1.
     * The elements from the index are pushed down.
     * @param {*} data
     * @param {Number} index
     */
    insert(data, index) {
        if (typeof data === 'undefined' || data === null) {
            console.log('Data must not be empty!');
            return;
        }

        if (typeof index === 'undefined' || typeof index !== 'number') {
            console.warn(`Index must be specified as a number`);
            return;
        }

        // inserts can at max be done at the lastIndex or after the lastIndex
        // in which case lastIndex + 1 (same as push)
        if ((index > this.lastIndex + 1) || (index < 0)) {
            console.warn('Cannot insert beyond last+1 or index < 0');
            return;
        }

        expandIfFull(this);

        shiftRight(this, index);

        this.arr[index] = data;

        ++this.lastIndex;

        return this.size();
    }

    /**
     * Does the same operation as Array.prototype.pop()
     * Removes the last element from the array.
     * In the case of the array list, removes the element at lastIndex
     * and decrements the lastIndex & returns the value.
     */
    pop() {
        if (this.isEmpty()) {
            console.warn(`Nothing to pop. List is empty!`);
            return;
        }

        // get the value from current lastIndex & return it.
        const value = this.arr[this.lastIndex];
        this.arr[this.lastIndex--] = null;

        shrinkIfSparse(this);

        return value;
    }

    /**
     * Does the same operation as Array.prototype.push
     * Adds an element to the end of the array.
     * In the case of the array list, adds the element at lastIndex + 1
     * and increments the lastIndex & returns the new length
     * @param {*} data
     */
    push(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty`);
            return;
        }

        expandIfFull(this);

        this.arr[++this.lastIndex] = data;

        return this.size();
    }

    /**
     * Returns the element at a specific index
     * @param {Number} index
     */
    get(index) {
        if (typeof index === 'undefined' || typeof index !== 'number') {
            console.warn(`Index must be specified as a number`);
            return;
        }

        // consumer should be accessing only slots that are filled
        if (index < 0 || index > this.lastIndex) {
            console.warn(`Index out of bounds!`);
            return;
        }

        return this.arr[index];
    }

    /**
     * This is the actual cacpacity of the static array internally.
     */
    capacity() {
        return (this.arr.length);
    }

    /**
     * This indicates how much of the array is filled.
     * Its value is lastIndex + 1
     */
    size() {
        return ((this.isEmpty()) ? 0 : (this.lastIndex + 1));
    }

    /**
     * Note that, to have static arrays (fixed size arrays), we have sealed
     * the object. To set values, we have pre-assigned it to NULL. So there
     * will be filled values. The best bet here is to check the lastIndex
     */
    isEmpty() {
        return (this.lastIndex === -1);
    }

    /**
     * The Last index should equal arr.length-1
     */
    isFull() {
        return (this.lastIndex === (this.capacity() - 1));
    }
}

exports.ArrayList = ArrayList;
exports.DynamicArray = ArrayList;
