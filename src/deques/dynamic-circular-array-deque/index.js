'use strict';

const {
    DynamicCircularArrayDeque
} = require('./dynamic-circular-array-deque');

const dcad = new DynamicCircularArrayDeque(3);

console.log('\n');
console.log(dcad.isFull());
console.log(dcad.isEmpty());
console.log(dcad.size());
console.log(dcad.capacity());

console.log('\n');
console.log(dcad.getRear());
console.log(dcad.getFront());
console.log(dcad.enqueueFront());
console.log(dcad.enqueueRear());
console.log(dcad.dequeueRear());
console.log(dcad.dequeueFront());

console.log('\n');
dcad.display();

console.log(dcad.find('AAPL'));

console.log(dcad.enqueueFront('AAPL'));
console.log(dcad.enqueueFront('GOOG'));
console.log(dcad.enqueueRear('MSFT'));

console.log('\n');
dcad.display();

console.log('\n');
console.log(dcad.isFull());
console.log(dcad.isEmpty());
console.log(dcad.size());

console.log('\n');
console.log(dcad.enqueueRear('NIKE'));

console.log('\n');
dcad.display();

console.log('\n');
console.log(dcad.isFull());
console.log(dcad.isEmpty());
console.log(dcad.size());

console.log(dcad.dequeueFront());
console.log(dcad.dequeueFront());
console.log(dcad.dequeueRear());
console.log(dcad.dequeueRear());