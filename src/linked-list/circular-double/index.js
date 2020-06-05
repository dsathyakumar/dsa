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
console.log(cdll.insert('AAPL'));
console.log(cdll.insert('GOOG'));
console.log(cdll.insert('AMZN', 1));

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
console.log(cdll.insert('AAPL'));
console.log(cdll.insert('GOOG'));
console.log(cdll.insert('AMZN', 1));

console.log('\n');
cdll.reverse();

console.log('\n');
cdll.display();

console.log('\n');
console.log(cdll.find('AAPL'));
console.log(cdll.find('TSLA'));

console.log('\n');
console.log(cdll.get(0));
console.log(cdll.get(5));

console.log('\n');
cdll.updateAll('AMZN', 'amazon');
cdll.modify(0, 'google');

console.log('\n');
cdll.display();

console.log(cdll.delete(1));
console.log(cdll.delete());
console.log(cdll.delete());

console.log('\n');
cdll.display();

console.log('\n');
console.log(cdll.isEmpty());
console.log(cdll.size());
console.log(cdll.lastIndex());

console.log('\n');
console.log(cdll.insert('TSLA'));
console.log(cdll.insert('NIKE', 0));

console.log('\n');
cdll.display();

console.log(cdll.delete(0));
console.log(cdll.delete());

console.log('\n');
cdll.display();

console.log('\n');
console.log(cdll.insert('TSLA'));
console.log(cdll.insert('NIKE', 0));
console.log(cdll.insert('DOW', 1));

console.log('\n');
cdll.display();

console.log('\n');
cdll.recursiveReverse();

console.log('\n');
cdll.display();

// iterator capabilities
for (let node of cdll) {
    console.log(node);
}