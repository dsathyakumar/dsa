'use strict';

const shouldResize = (capacity, lastIndex) => (lastIndex + 1 === capacity);

const resize = () => {

};

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
            console.warn(`The dynamic list is empty!`);
            return;
        }

        this.arr.forEach(el => console.log(el));
    }

    shift() {

    }

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

    pop() {

    }

    push(data) {
        if (!data) {
            console.warn(`Data cannot be empty`);
            return;
        }

        this.arr = resizeIfFull();
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

    capacity() {
        return (this.arr.length);
    }

    size() {
        return (this.lastIndex);
    }

    isEmpty() {
        return (this.size() === -1);
    }

    isFull() {
        return (this.size() === (this.capacity() - 1));
    }
}

exports.ArrayList = ArrayList;
