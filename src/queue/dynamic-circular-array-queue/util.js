'use strict';

const createNewArray = (size) => {
    const newArr = new Array(size);
    newArr.fill(null);
    Object.seal(newArr);
    return newArr;
};

const copyArray = (dynamicCircularArrayQueue, newArr) => {
    const currentCapacity = dynamicCircularArrayQueue.capacity();

    let front = dynamicCircularArrayQueue.front,
        idx = 0;

    do {
        newArr[idx++] = dynamicCircularArrayQueue.arr[front];
        front = ((front + 1) % currentCapacity);
    } while(
        (dynamicCircularArrayQueue.front !== front)
        &&
        (front < (newArr.length - 1))
    );

    return;
};

exports.expandIfFull = (dynamicCircularArrayQueue) => {
    if (dynamicCircularArrayQueue.isEmpty()) {
        return;
    }

    const shouldExpand = dynamicCircularArrayQueue.isFull();

    if (!shouldExpand) {
        return;
    }
    const currentCapacity = dynamicCircularArrayQueue.capacity();

    const newArr = createNewArray(2 * currentCapacity);

    copyArray(dynamicCircularArrayQueue, newArr);

    dynamicCircularArrayQueue.rear = (dynamicCircularArrayQueue.capacity() - 1);

    dynamicCircularArrayQueue.front = 0;

    dynamicCircularArrayQueue.arr = newArr;

    return;
};

exports.shrinkIfSparse = (dynamicCircularArrayQueue) => {
    const currentCapacity = dynamicCircularArrayQueue.capacity();
    const occupancyFactor = (dynamicCircularArrayQueue.size() / currentCapacity);
    const shouldShrink = ((occupancyFactor > 0) && (occupancyFactor <= 0.25));

    if (!shouldShrink) {
        return;
    }

    const newArr = createNewArray(Math.ceil(currentCapacity / 2));

    copyArray(dynamicCircularArrayQueue, newArr);

    dynamicCircularArrayQueue.rear = (dynamicCircularArrayQueue.size() - 1);

    dynamicCircularArrayQueue.front = 0;

    dynamicCircularArrayQueue.arr = newArr;

    return;
};
