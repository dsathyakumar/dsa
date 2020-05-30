'use strict';

const {
    StaticCircularArrayQueue
} = require('./static-circular-array-queue');

const scaq = new StaticCircularArrayQueue(4);

console.log(scaq.isFull());
console.log(scaq.isEmpty());
console.log(scaq.size());

console.log('\n');
scaq.print();
console.log(scaq.peek());
console.log(scaq.dequeue());
console.log(scaq.enqueue());

console.log('\n');
console.log(scaq.enqueue('GOOG'));
console.log(scaq.enqueue('AAPL'));
console.log(scaq.enqueue('MSFT'));
console.log(scaq.enqueue('PYPL'));

console.log('\n');
scaq.print();

console.log('\n');
console.log(scaq.peek());

console.log('\n');
console.log(scaq.isFull());
console.log(scaq.isEmpty());
console.log(scaq.size());

console.log(scaq.dequeue());
console.log(scaq.dequeue());
console.log(scaq.dequeue());

console.log('\n');
console.log(scaq.isFull());
console.log(scaq.isEmpty());
console.log(scaq.size());

console.log('\n');
scaq.print();

console.log('\n');
console.log(scaq.peek());

console.log(scaq.enqueue('NIKE'));
console.log(scaq.enqueue('AMZN'));
console.log(scaq.enqueue('EBAY'));

console.log('\n');
scaq.print();

console.log('\n');
console.log(scaq.peek());

console.log('\n');
console.log(scaq.isFull());
console.log(scaq.isEmpty());
console.log(scaq.size());

console.log(scaq.dequeue());
console.log(scaq.dequeue());
console.log(scaq.dequeue());

console.log('\n');
scaq.print();

console.log('\n');
console.log(scaq.peek());

console.log('\n');
console.log(scaq.isFull());
console.log(scaq.isEmpty());
console.log(scaq.size());

console.log(scaq.dequeue());

console.log('\n');
console.log(scaq.isFull());
console.log(scaq.isEmpty());
console.log(scaq.size());