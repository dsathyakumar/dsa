'use strict';

const {
    CircularDoublyLinkedList
} = require('./circular-doubly-linked-list');

const cdll = new CircularDoublyLinkedList();

console.log('\n');
console.log(cdll.isEmpty());
console.log(cdll.size());
console.log(cdll.lastIndex());

console.log('\n');
console.log(cdll.find('AAPL'));
console.log(cdll.get(0));

console.log('\n');
cdll.display();
cdll.destroy();

console.log('\n');
cdll.modify(0, 'MSFT');
cdll.updateAll('MSFT', 'microsoft');

console.log('\n');
cdll.insert('AAPL');
cdll.insert('GOOG');
cdll.insert('AMZN', 1);

console.log('\n');
console.log(cdll.isEmpty());
console.log(cdll.size());
console.log(cdll.lastIndex());

console.log('\n');
cdll.display();

console.log('\n');
cdll.destroy();

console.log('\n');
cdll.display();

console.log('\n');
cdll.insert('AAPL');
cdll.insert('GOOG');
cdll.insert('AMZN', 1);

console.log('\n');
cdll.reverse();

console.log('\n');
cdll.display();