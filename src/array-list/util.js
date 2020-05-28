'use strict';

const shouldResize = (capacity, lastIndex) => (lastIndex + 1 === capacity);

const resize = arraylist => {
    if (!shouldResize(arraylist.capacity(), arraylist.lastIndex)) {
        return;
    }

    // create a new Array that is twice the size of the old array
    const newArr = new Array(2 * arraylist.capacity());
    newArr.fill(null);
    Object.seal(newArr);

    // copy elements from the old array at whatever indices they were in
    // into the new Array
    arraylist.arr.forEach((el, idx) => {
        newArr[idx] = el;
    });

    arraylist.arr = newArr;
};

// used for delete and shift operations
const shiftLeft = (arraylist, index) => {
    // this is always shift by 1 as only 1 element is deleted at any given point
    // this performs a left shift
    for (let indexCounter = index; indexCounter <= arraylist.lastIndex; indexCounter++) {
        if (indexCounter === (arraylist.lastIndex)) {
            arraylist.arr[indexCounter] = null;
            continue;
        }
        
        arraylist.arr[indexCounter] = arraylist.arr[indexCounter + 1];
    }
};

// used for insert and unshift operations
const shiftRight = (arraylist, index) => {
    // this is always shift by 1 as only 1 element is inserted at any given point
    // this performs a right shift
    for (let indexCounter = arraylist.lastIndex; indexCounter >= index; indexCounter--) {
        arraylist.arr[indexCounter + 1] = arraylist.arr[indexCounter];
    }
    // note that whatever index from which we start, it would be filled as part of the push / insert
}

exports.shiftLeft = shiftLeft;
exports.shiftRight = shiftRight;
exports.resizeIfFull = resize;
