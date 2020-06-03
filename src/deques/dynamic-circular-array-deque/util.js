'use strict';

const createNewArray = (size) => {
    const newArr = new Array(size);

    // in JS, this one step is an extra cost we incur to create Static arrays
    // Its pre-filled with NULL so as to create space. Else since the array is sealed
    // with `empty`, it does not let assign values to indexes. By doing this, we can
    // assign values to array indexes. However, the traditional JS .push() and .pop()
    // operations cannot be performed (as the object is sealed) and a .push() does not
    // fill up the non-empty position from the back, but rather appends the new element
    // to the back.
    newArr.fill(null);
    Object.seal(newArr);

    return newArr;
};

const copyArray = (dynamicCircularArrayDeque, newArr) => {
    // copy elements of old array (in the same Q order) from front to rear
    let idx = 0,
        front = dynamicCircularArrayDeque.front;
    
    do { // executes atleast once for a single element present
        newArr[idx++] = dynamicCircularArrayDeque.arr[front];
        front = (front + 1) % dynamicCircularArrayDeque.capacity();
    } while (
        (dynamicCircularArrayDeque.front !== front)
        &&
        (front <= (newArr.length - 1)) // this extra condition here is for array shrink cases
    );

    return;
};

/**
 * Refer:
 * https://www2.cs.sfu.ca/CourseCentral/225/ahadjkho/lecture-notes/dynamic-arrays-link_list.pdf
 * http://www.cs.toronto.edu/~ylzhang/csc263w15/slides/lec07-amortization.pdf
 * https://www.youtube.com/watch?v=T7W5E-5mljc
 * @param {DynamicCircularArrayDeque} dynamicCircularArrayDeque 
 */
exports.expandIfFull = (dynamicCircularArrayDeque) => {
    // Nothing to expand when the array is empty and the 1st insert is happening
    if (dynamicCircularArrayDeque.isEmpty()) {
        return;
    }

    const currentCapacity = dynamicCircularArrayDeque.capacity();

    // the array will be doubled, when the current array size === capacity, dictated by isFull
    const shouldDouble = dynamicCircularArrayDeque.isFull();

    if (!shouldDouble) {
        return;
    }

    // The following new size determination is based on Dynamic Array Amortized Analysis.
    // if the array needs to be expanded, its size is doubled.
    const newArr = createNewArray(2 * currentCapacity);

    copyArray(dynamicCircularArrayDeque, newArr);

    // if doubling, the lastIndex / rear will point to old array's last index
    dynamicCircularArrayDeque.rear = (currentCapacity - 1);

    // whatever be the old array front, its now un-wrapped to be fit into a new array.
    // so it re-starts with index 0 (Expand or shrink, both cases)
    dynamicCircularArrayDeque.front = 0;

    // reasssign the new array to .arr, so that the old is GC'ed
    dynamicCircularArrayDeque.arr = newArr;

    return;
};

exports.shrinkIfSparse = (dynamicCircularArrayDeque) => {
    const currentCapacity = dynamicCircularArrayDeque.capacity();

    // current occupancy factor of the array.
    const occupiedFactor = (dynamicCircularArrayDeque.size() / currentCapacity);

    // the current array will be shrunk in size to release mmemory if its occupancy factor falls <= 0.25
    // in that case, the array will be halved in size
    const shouldShrink = (occupiedFactor > 0 && occupiedFactor <= 0.25);

    // if neither shrink nor double, return
    if (!shouldShrink) {
        return;
    }

    // if the array needs to be shrunk, the floor of half operation is done.
    // This is because doubling always results in whole number (N= odd or N=even)
    // Halving can result in a non-whole number (when N=odd). So the ceil is taken.
    const newArr = createNewArray(Math.ceil(currentCapacity / 2));

    copyArray(dynamicCircularArrayDeque, newArr);

    // if shrinking, then the lastIndex / rear will point to whatever the old array's filled
    // element index was, in that case, indicated by size-1
    dynamicCircularArrayDeque.rear = (dynamicCircularArrayDeque.size() - 1);

    // whatever be the old array front, its now un-wrapped to be fit into a new array.
    // so it re-starts with index 0 (Expand or shrink, both cases)
    dynamicCircularArrayDeque.front = 0;

    // reasssign the new array to .arr, so that the old is GC'ed
    dynamicCircularArrayDeque.arr = newArr;

    return;
};
