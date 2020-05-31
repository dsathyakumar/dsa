'use strict';

const {
    DynamicCircularArrayQueue
} = require('./dynamic-circular-array-queue');

const dcaq = new DynamicCircularArrayQueue(4);

console.log(dcaq.isEmpty());
console.log(dcaq.isFull());
console.log(dcaq.size());
console.log(dcaq.capacity());
console.log(dcaq.peek());
console.log(dcaq.enqueue());
console.log(dcaq.dequeue());

console.log('\n');
dcaq.print();

console.log(dcaq.enqueue('AAPL'));
console.log(dcaq.enqueue('GOOG'));
console.log(dcaq.enqueue('MSFT'));

console.log('\n');
console.log(dcaq.isEmpty());
console.log(dcaq.isFull());
console.log(dcaq.size());
console.log(dcaq.peek());

console.log('\n');
dcaq.print();

console.log('\n');
console.log(dcaq.enqueue('NIKE'));

console.log('\n');
console.log(dcaq.isEmpty());
console.log(dcaq.isFull());
console.log(dcaq.size());
console.log(dcaq.peek());

console.log('\n');
dcaq.print();

// at this point the Q is full, next enqueue will cause it to resize dynamically

console.log('\n');
console.log(dcaq.enqueue('AMZN'));

console.log('\n');
console.log(dcaq.isEmpty());
console.log(dcaq.isFull());
console.log(dcaq.size());
console.log(dcaq.capacity());
console.log(dcaq.peek());

console.log('\n');
dcaq.print();

console.log('\n');
console.log(dcaq.find('AMZN'));
console.log(dcaq.find('EBAY'));

const dcaq_2 = new DynamicCircularArrayQueue(4);

console.log(dcaq_2.enqueue('AAPL'));
console.log(dcaq_2.enqueue('GOOG'));
console.log(dcaq_2.enqueue('MSFT'));
console.log(dcaq_2.enqueue('NIKE'));

console.log('\n');
console.log(dcaq_2.isEmpty());
console.log(dcaq_2.isFull());
console.log(dcaq_2.size());
console.log(dcaq_2.peek());

console.log('\n');
dcaq_2.print();

console.log('\n');
console.log(dcaq_2.dequeue());
console.log(dcaq_2.dequeue());
console.log(dcaq_2.dequeue());

console.log('\n');
console.log(dcaq_2.isEmpty());
console.log(dcaq_2.isFull());
console.log(dcaq_2.size());
console.log(dcaq_2.peek());

console.log('\n');
dcaq_2.print();

console.log('\n');
console.log(dcaq_2.dequeue());

console.log('\n');
console.log(dcaq_2.isEmpty());
console.log(dcaq_2.isFull());
console.log(dcaq_2.size());
console.log(dcaq_2.peek());

console.log('\n');
dcaq_2.print();