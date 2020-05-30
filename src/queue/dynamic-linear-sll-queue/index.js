'use strict';

const {
    Node
} = require('./node');
const {
    DynamicLinearLLQueue
} = require('./dynamic-linear-sll-queue');

const dlllq = new DynamicLinearLLQueue();

console.log(dlllq.isEmpty());
console.log(dlllq.size());
console.log(dlllq.peek());
dlllq.display();

console.log('\n');
console.log(dlllq.enqueue(new Node('PYPL')));
console.log(dlllq.enqueue(new Node('MSFT')));
console.log(dlllq.enqueue(new Node('GOOG')));

console.log('\n');
console.log(dlllq.isEmpty());
console.log(dlllq.size());
console.log(dlllq.peek());

console.log('\n');
dlllq.display();

console.log('\n');
console.log(dlllq.peek());

console.log('\n');
console.log(dlllq.dequeue());
console.log(dlllq.dequeue());
console.log(dlllq.dequeue());

console.log('\n');
console.log(dlllq.isEmpty());
console.log(dlllq.size());
console.log(dlllq.isEmpty());