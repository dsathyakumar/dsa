'use strict';

const {
    StaticLinearArrayDeque
} = require('./static-linear-array-deque');

const slad = new StaticLinearArrayDeque(5);

console.log(slad.isEmpty());
console.log(slad.isFull());
console.log(slad.size());
console.log(slad.capacity());

console.log('\n');
console.log(slad.getFront());
console.log(slad.getRear());
console.log(slad.find());
console.log(slad.find('AAPL'));

console.log('\n');
console.log(slad.enqueueRear());
console.log(slad.enqueueFront());
console.log(slad.dequeueRear());
console.log(slad.dequeueFront());

console.log('\n');
slad.display()

console.log('\n');
console.log(slad.enqueueFront('AAPL'));
console.log(slad.enqueueFront('EBAY'));
console.log(slad.enqueueRear('MSFT'));
console.log(slad.enqueueRear('GOOG'));
console.log(slad.enqueueRear('NIKE'));
console.log(slad.enqueueRear('EBAY'));
console.log(slad.enqueueRear('PYPL'));

console.log('\n');
slad.display()

console.log('\n');
console.log(slad.isEmpty());
console.log(slad.isFull());
console.log(slad.size());

console.log('\n');
console.log(slad.dequeueFront());
console.log(slad.dequeueFront());
console.log(slad.dequeueRear());
console.log(slad.dequeueRear());

console.log('\n');
slad.display()

console.log('\n');
console.log(slad.isEmpty());
console.log(slad.isFull());
console.log(slad.size());

console.log(slad.dequeueRear());

console.log('\n');
slad.display()

console.log('\n');
console.log(slad.isEmpty());
console.log(slad.isFull());
console.log(slad.size());

console.log(slad.enqueueFront('PYPL'));
console.log(slad.dequeueRear());

console.log('\n');
slad.display()

console.log('\n');
console.log(slad.isEmpty());
console.log(slad.isFull());
console.log(slad.size());

console.log(slad.enqueueFront('L5'));
console.log(slad.enqueueRear('L4'));
console.log(slad.enqueueRear('L3'));
console.log(slad.dequeueFront());
console.log(slad.enqueueFront('L1'));

console.log('\n');
slad.display()

console.log('\n');
console.log(slad.isEmpty());
console.log(slad.isFull());
console.log(slad.size());