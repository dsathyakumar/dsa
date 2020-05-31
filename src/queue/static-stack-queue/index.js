'use strict';

const {
    StaticStackQueue
} = require('./static-stack-queue');

const ssq = new StaticStackQueue(4);

console.log('\n');
console.log(ssq.capacity());

console.log('\n');
console.log(ssq.size());
console.log(ssq.isFull());
console.log(ssq.isEmpty());

console.log('\n');
console.log(ssq.dequeue());
console.log(ssq.enqueue());
console.log(ssq.peek());

console.log('\n');
ssq.print();

console.log('\n');
// this should be the 0th element
// (last element in stack, but the 1st element to be deQ'd from Q)
console.log(ssq.enqueue('GOOG'));
console.log(ssq.enqueue('AAPL'));

// top of the stack (but the last last element of the Q)
console.log(ssq.enqueue('MSFT'));

console.log('\n');
console.log(ssq.size());
console.log(ssq.isFull());
console.log(ssq.isEmpty());

console.log('\n');
ssq.print();

console.log('\n');
console.log(ssq.enqueue('NIKE'));

console.log('\n');
console.log(ssq.size());
console.log(ssq.isFull());
console.log(ssq.isEmpty());

console.log('\n');
ssq.print();

console.log('\n');
console.log(ssq.dequeue());

console.log('\n');
console.log(ssq.size());
console.log(ssq.isFull());
console.log(ssq.isEmpty());

console.log('\n');
ssq.print();