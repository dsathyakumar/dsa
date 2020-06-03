'use strict';

const {
    SinglyLinkedListWithTail
} = require('./singly-linked-list-with-tail');

const sllwt = new SinglyLinkedListWithTail();

console.log('\n');
console.log(sllwt.isEmpty());
console.log(sllwt.size());
console.log(sllwt.lastIndex());

console.log('\n');
console.log(sllwt.getHead());
console.log(sllwt.getTail());

console.log('\n');
sllwt.display();

console.log('\n');
console.log(sllwt.find());
console.log(sllwt.find('AAPL'));

console.log('\n');
console.log(sllwt.get());
console.log(sllwt.get('AAPL'));
console.log(sllwt.get(0));

console.log('\n');
console.log(sllwt.modify('AAPL'));
console.log(sllwt.modify('AAPL', 0));

console.log('\n');
console.log(sllwt.updateAll('AAPL'));
console.log(sllwt.updateAll('AAPL', 'GOOG'));

console.log('\n');
console.log(sllwt.insert());
// nothing in list, so inserts at 0
console.log(sllwt.insert('AAPL'));

console.log('\n');
console.log(sllwt.getHead());
console.log(sllwt.getTail());

console.log('\n');
// no index, so does an insertlast
console.log(sllwt.insert('GOOG'));
// again runs insertfirst
console.log(sllwt.insert('PYPL', 0));
// inserts at index
console.log(sllwt.insert('MSFT', 1));
// inserts at last (same as append operation)
console.log(sllwt.insert('NIKE', (sllwt.lastIndex() + 1)));
// inserts at index
console.log(sllwt.insert('san jose', 2));
// inserts at index
console.log(sllwt.insert('san jose', 2));

console.log('\n');
console.log(sllwt.isEmpty());
console.log(sllwt.size());
console.log(sllwt.lastIndex());

console.log('\n');
sllwt.display();

console.log('\n');
console.log(sllwt.getHead());
console.log(sllwt.getTail());

console.log('\n');
console.log(sllwt.find('GOOG'));

console.log('\n');
console.log(sllwt.get(0));

console.log('\n');
console.log(sllwt.modify('microsoft', 1));

console.log('\n');
console.log(sllwt.updateAll('san jose', 'SJC'));

console.log('\n');
console.log(sllwt.isEmpty());
console.log(sllwt.size());
console.log(sllwt.lastIndex());

console.log('\n');
sllwt.display();

console.log('\n');
sllwt.reverse();

console.log('\n');
sllwt.display();