'use strict';

const {
    shiftLeft,
    shiftRight,
    resizeIfFull
} = require('./util');

/**
 * Array inserts and Deletes require knowledge of array shifts / rotations
 * and which in turn require knowledge of array reversals.
 */

class ArrayList {
    constructor(capacity) {
        if (typeof capacity === 'undefined' || typeof capacity !== 'number') {
            throw new Error('Cannot instantiate without initial capcacity.');
        }

        // creating a fixed size array
        this.arr = new Array(capacity);
        this.arr.fill(null);
        Object.seal(this.arr);

        // to start with there are no elements
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

        return temp;
    }

    /**
     * Does the same operation as Array.prototype.unshift
     * Adds a new element to the 0th index of the array
     * and right shifts all elements by 1
     * @param {*} data 
     */
    unshift(data) {
        if (!data) {
            console.warn(`Data cannot be empty`);
            return;
        }

        resizeIfFull(this);

        shiftRight(this, 0);

        this.arr[0] = data;

        return ++this.lastIndex;
    }

    /**
     * Deletes an element at a specific index as long as the index is not
     * greater than the lastIndex
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

        return temp;
    }

    /**
     * Inserts an element at a specific >=0 && <= lastIndex + 1
     * @param {*} data
     * @param {Number} index
     */
    insert(data, index) {
        if (!data) {
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

        resizeIfFull(this);

        shiftRight(this, index);

        this.arr[index] = data;

        return ++this.lastIndex;
    }

    /**
     * Does the same operation as Array.prototype.pop()
     * Removes the last element from the array.
     * In the case of the array list, removes the element at lastIndex
     * and decrements the lastIndex & returns the value.
     */
    pop() {
        if (this.isEmpty()) {
            console.warn(`Nothing to pop.`);
            return;
        }

        const value = this.arr[this.lastIndex];
        this.arr[this.lastIndex--] = null;
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
        if (!data) {
            console.warn(`Data cannot be empty`);
            return;
        }

        resizeIfFull(this);

        this.arr[++this.lastIndex] = data;

        return this.lastIndex;
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
     * This is the index that indicates how much of the array is filled.
     * The last filled index. If the lastIndex === capacity() - 1,
     * then the array is FULL.
     */
    size() {
        return (this.lastIndex);
    }

    /**
     * Note that, to have static arrays (fixed size arrays), we have sealed
     * the object. To set values, we have pre-assigned it to NULL. So there
     * will be filled values. The best bet here is to check the lastIndex
     */
    isEmpty() {
        return (this.size() === -1);
    }

    /**
     * The Last index should equal arr.length-1
     */
    isFull() {
        return (this.size() === (this.capacity() - 1));
    }
}

exports.ArrayList = ArrayList;
