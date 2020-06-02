'use strict';

// Note that both expandIfFull and shrinkIfSparse were in one method before.
// By usual practice, the array would be expanded before an insert
// & shrunk after a delete (if it satisfied the conditions). But having both the logic
// in one method caused issues. For eg) for a list of size 4, when a 2nd insert was attempted,
// after the 1st insert, the resize was called before the 2nd insert & the occupancy factor was = 0.25,
// making it a suitable candidate for a shrink which was incorrect.
// So the expandIfFull method is called for insert, push and unshift and will do an expand
// only if the internal array was full. Amortized cost in this way is O(1).
// In the same way, shrinkIfSparse is called for delete, pop and shift and will do a shrink
// only if the internal array had a occupancy of >-=0 and <=0.25 (its 1/4th full and so can be halved)
const expandIfFull = (arraylist) => {
    // if the list is empty, nothing needs to be done. Return
    if (arraylist.isEmpty()) {
        return;
    }

    const shouldExpand = arraylist.isFull();

    if (!shouldExpand) {
        return;
    }

    const currentCapacity = arraylist.capacity();

    // double the capacity for an expansion
    let newArr = new Array(2 * currentCapacity);
    newArr.fill(null);
    Object.seal(newArr);

    // when there is an expansion, the newArr's lastIndex will definitely be more than current
    // array's last index. So its safe to keep the limit as current array's capacity.
    const limit = currentCapacity;

    // copy over elements from old array to the new array
    for (let idx = 0; idx < limit; idx++) {
        newArr[idx] = arraylist.arr[idx];
    }

    // reset references
    arraylist.arr = newArr;
    arraylist.lastIndex = arraylist.lastIndex;

    return;
};

const shrinkIfSparse = (arraylist) => {
    const currentCapacity = arraylist.capacity();
    const occupancyFactor = (arraylist.size() / currentCapacity);
    const shouldShrink = ((occupancyFactor > 0) && (occupancyFactor <= 0.25));

    if (!shouldShrink) {
        return;
    }

    // 1/2 the capacity for a shrink, if the occupancy factor falls below 0.25
    let newArr = new Array(Math.ceil(currentCapacity / 2));
    newArr.fill(null);
    Object.seal(newArr);

    // when there is a shrink, the newArr's lastIndex will be lesser than current
    // array's lastIndex. So the limit will have to be the newArr's lastIndex, to avoid a index
    // out of bounds.
    const limit = newArr.length;

    // copy over elements from old array to the new array
    for (let idx = 0; idx < limit; idx++) {
        newArr[idx] = arraylist.arr[idx];
    }

    // reset references
    arraylist.arr = newArr;
    arraylist.lastIndex = arraylist.lastIndex;

    return;
};

// used for delete and shift operations
// For eg) if we have to shift Left by 1, from index =1 to index = 0
// For eg) the index = 0 th element was deleted. If lastIndex = 3
// we have to shift value in index=3 to index=2, 2 to 1, 1 to 0.
// If we start this from Right extreme and do a decrement iteration, then the value
// in index=3 will be copied over to index=2, but the value at index=2 would be erased.
// For this case, the iteration is forward here. It starts from index = 0 (or whatever index specified)
// so that element at index+1 can be copied over to index
// This can be either used to shift the whole array or a portion of the array.
// This does not do circular shifts
// <----- PULL LEFT
// -----> iTER RIGHT
const shiftLeft = (arraylist, index) => {
    // this is always shift by 1 as only 1 element is deleted at any given point
    // this performs a left shift
    for (let indexCounter = index; indexCounter <= (arraylist.lastIndex); indexCounter++) {
        // since this is pulling elements up, the lastIndex will be left and has to be assigned NULL
        if (indexCounter === (arraylist.lastIndex)) {
            arraylist.arr[indexCounter] = null;
            continue;
        }
        
        arraylist.arr[indexCounter] = arraylist.arr[indexCounter + 1];
    }
};

// used for insert and unshift operations
// For eg) if we have to shift Right by 1, from 0th index (that is the value at 0 must move to 1)
// its wrong to start iteration from 0, because forward iteration will only copy value from
// index = 0 to index = 1. This will erase the value in index=1. So, the best way is to iterate
// starting from lastIndex. By starting from lastIndex, we can pull from lastIndex to lastIndex+1
// This shiftRight operation assumes that the array has already resized if full.
// This can be either used to shift the whole array or a portion of the array.
// This does not do circular shifts
// -----> PULL RIGHT
// <---- iTER LEFT
const shiftRight = (arraylist, index) => {
    // this is always shift by 1 as only 1 element is inserted at any given point
    // this performs a right shift
    for (let indexCounter = (arraylist.lastIndex); indexCounter >= index; indexCounter--) {
        arraylist.arr[indexCounter + 1] = arraylist.arr[indexCounter];
    }
    // note that whatever index from which we start, it would be filled as part of the push / insert
    // so there is no need to check and assign a NULL here.
}

exports.shiftLeft = shiftLeft;
exports.shiftRight = shiftRight;
exports.expandIfFull = expandIfFull;
exports.shrinkIfSparse = shrinkIfSparse;
