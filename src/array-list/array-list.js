'use strict';

const {

} = require('../array/rotations')

const shouldResize = (capacity, lastIndex) => (lastIndex + 1 === capacity);

const resize = (arr, lastIndex) => {
    if (!shouldResize(arr.length, lastIndex)) {
        return arr;
    }

    // create a new Array that is twice the size of the old array
    const newArr = new Array(2 * arr.length);
    newArr.fill(null);
    Object.seal(newArr);

    // copy elements from the old array at whatever indices they were in
    // into the new Array
    arr.forEach((el, idx) => {
        newArr[idx] = el;
    });

    return newArr;
};

/**
 * Array inserts and Deletes require knowledge of array shifts / rotations
 * and which in turn require knowledge of array reversals.
 */

class ArrayList {
    constructor(capacity) {
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

        this.arr.forEach(el => console.log(el));
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

        this.arr = resizeIfFull();
    }

    delete(index) {

    }

    insert(index, data) {
        if (typeof index === 'undefined' || typeof index !== 'number') {
            console.warn(`Index must be specified as a number`);
            return;
        }

        this.arr = resizeIfFull();
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
        this.arr[--this.lastIndex] = null;
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

        this.arr = resizeIfFull();

        this.arr[++this.lastIndex] = data;
        return this.lastIndex;
    }

    get(index) {
        if (index < 0 || index > (this.capacity() - 1)) {
            console.warn(`Index out of bounds!`);
            return;
        }

        if (typeof index === 'undefined' || typeof index !== 'number') {
            console.warn(`Index must be specified as a number`);
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
     * The last filled index
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
