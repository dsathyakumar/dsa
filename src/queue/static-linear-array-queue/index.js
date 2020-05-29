'use strict';

const {
    StaticLinearArrayQueue
} = require('./static-linear-array-queue');

const slaq = new StaticLinearArrayQueue(4);

console.log(slaq.isFull());
console.log(slaq.isEmpty());
console.log(slaq.size());

slaq.enqueue('AAPL');
slaq.enqueue('PYPL');
slaq.enqueue('GOOG');

console.log('\n');
console.log(slaq.isFull());
console.log(slaq.isEmpty());
console.log(slaq.size());
console.log(slaq.front);
console.log(slaq.rear);

slaq.enqueue('EBAY');

console.log('\n');
slaq.print();

slaq.enqueue('NIKE');

slaq.dequeue();
slaq.dequeue();
slaq.dequeue();

console.log('\n');
slaq.print();

console.log('\n');
console.log(slaq.isFull());
console.log(slaq.isEmpty());
console.log(slaq.size());
console.log(slaq.front);
console.log(slaq.rear);

slaq.dequeue();

console.log('\n');
console.log(slaq.isFull());
console.log(slaq.isEmpty());
console.log(slaq.size());
console.log(slaq.front);
console.log(slaq.rear);