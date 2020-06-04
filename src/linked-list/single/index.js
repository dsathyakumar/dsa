'use strict';

const {
    SinglyLinkedList
} = require('./singly-linked-list');

const sll = new SinglyLinkedList();

console.log('\n');
console.log(sll.isEmpty());
console.log(sll.size());
console.log(sll.lastIndex());

console.log('\n');
sll.print();

console.log('\n');
console.log(sll.find());
console.log(sll.find('AAPL'));

console.log('\n');
console.log(sll.get());
console.log(sll.get('AAPL'));
console.log(sll.get(0));

console.log('\n');
console.log(sll.modify('AAPL'));
console.log(sll.modify('AAPL', 0));

console.log('\n');
console.log(sll.updateAll('AAPL'));
console.log(sll.updateAll('AAPL', 'GOOG'));

console.log('\n');
console.log(sll.insert());
// nothing in list, so inserts at 0
console.log(sll.insert('AAPL'));

console.log('\n');
// no index, so does an insertlast
console.log(sll.insert('GOOG'));
// again runs insertfirst
console.log(sll.insert('PYPL', 0));
// inserts at index
console.log(sll.insert('MSFT', 1));
// inserts at last (same as append operation)
console.log(sll.insert('NIKE', (sll.lastIndex() + 1)));
// inserts at index
console.log(sll.insert('san jose', 2));
// inserts at index
console.log(sll.insert('san jose', 2));

console.log('\n');
console.log(sll.isEmpty());
console.log(sll.size());
console.log(sll.lastIndex());

console.log('\n');
sll.print();

console.log('\n');
console.log(sll.find('GOOG'));

console.log('\n');
console.log(sll.get(0));

console.log('\n');
console.log(sll.modify('microsoft', 1));

console.log('\n');
console.log(sll.updateAll('san jose', 'SJC'));

console.log('\n');
console.log(sll.isEmpty());
console.log(sll.size());
console.log(sll.lastIndex());

console.log('\n');
sll.print();

console.log('\n');
sll.reverse();

console.log('\n');
sll.print();

console.log('\n');
console.log(sll.delete());
console.log(sll.delete(0));
console.log(sll.delete(2));

console.log('\n');
console.log(sll.isEmpty());
console.log(sll.size());
console.log(sll.lastIndex());

console.log('\n');
sll.print();

console.log(sll.delete());
console.log(sll.delete(1));
console.log(sll.delete());
console.log(sll.delete());

console.log('\n');
console.log(sll.isEmpty());
console.log(sll.size());
console.log(sll.lastIndex());

console.log('\n');
sll.print();

console.log(sll.insert('Uber'));
console.log(sll.insert('Lyft'));
console.log(sll.insert('Ola'));
console.log(sll.insert('Waymo'));

console.log('\n');
sll.print();

sll.recursiveReverse();

console.log('\n');
sll.print();