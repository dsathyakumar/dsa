'use strict';

const {
    StaticCircularArrayDeque
} = require('./static-circular-array-deque');

const scad = new StaticCircularArrayDeque(5);

console.log(scad.isEmpty());
console.log(scad.isFull());
console.log(scad.size());
console.log(scad.capacity());

console.log('\n');
console.log(scad.find('AAPL'));
console.log(scad.enqueueFront());
console.log(scad.enqueueRear());
console.log(scad.dequeueFront());
console.log(scad.dequeueRear());
scad.display();

console.log('\n');

console.log(scad.enqueueFront('AAPL'));
console.log(scad.enqueueFront('GOOG'));
console.log(scad.enqueueRear('MSFT'));
console.log(scad.enqueueRear('EBAY'));
console.log(scad.enqueueFront('NIKE'));

console.log('\n');
console.log(scad.isEmpty());
console.log(scad.isFull());
console.log(scad.size());

console.log('\n');
console.log(scad.find('AAPL'));

console.log('\n');
scad.display();

console.log('\n');
console.log(scad.getFront());
console.log(scad.getRear());

console.log(scad.enqueueFront('TSLA'));

console.log(scad.dequeueFront());
console.log(scad.dequeueRear());
console.log(scad.dequeueFront());
console.log(scad.dequeueRear());

console.log('\n');
console.log(scad.isEmpty());
console.log(scad.isFull());
console.log(scad.size());

console.log('\n');
scad.display();

console.log('\n');
console.log(scad.dequeueRear());

console.log('\n');
console.log(scad.isEmpty());
console.log(scad.isFull());
console.log(scad.size());

console.log('\n');
scad.display();