'use strict';

const {
    DoublyLinkedListWithTail
} = require('./doubly-linked-list-with-tail');

const dllwt = new DoublyLinkedListWithTail();


console.log('\n');
console.log(dllwt.size());
console.log(dllwt.lastIndex());
console.log(dllwt.isEmpty());

console.log('\n');
dllwt.display();

console.log('\n');
console.log(dllwt.get());
console.log(dllwt.find());
console.log(dllwt.updateAll());
console.log(dllwt.modify());
console.log(dllwt.recursiveReverse());
console.log(dllwt.reverse());
console.log(dllwt.delete());
console.log(dllwt.insert());

console.log('\n');
console.log(dllwt.insert('AAPL'));
console.log(dllwt.insert('GOOG'));
console.log(dllwt.insert('MSFT', 0));
console.log(dllwt.insert('NIKE', 1));
console.log(dllwt.insert('AMZN', dllwt.lastIndex() + 1));

console.log('\n');
dllwt.display();

console.log('\n');
console.log(dllwt.size());
console.log(dllwt.lastIndex());
console.log(dllwt.isEmpty());

console.log('\n');
console.log(dllwt.find('GOOG'));
console.log(dllwt.find('TSLA'));
console.log(dllwt.get(0));
console.log(dllwt.get(3));

console.log('\n');
dllwt.reverse();

console.log('\n');
dllwt.display();

dllwt.recursiveReverse();

console.log('\n');
dllwt.display();

console.log('\n');
dllwt.updateAll('AMZN', 'amazon');
dllwt.modify(0, 'microsoft');

console.log('\n');
dllwt.display();

console.log('\n');
console.log(dllwt.delete());
console.log(dllwt.delete(2));
console.log(dllwt.delete(0));
console.log(dllwt.delete(2));

console.log('\n');
dllwt.display();

console.log('\n');
console.log(dllwt.size());
console.log(dllwt.lastIndex());
console.log(dllwt.isEmpty());

console.log('\n');
console.log(dllwt.delete());

console.log('\n');
dllwt.display();

console.log('\n');
console.log(dllwt.size());
console.log(dllwt.lastIndex());
console.log(dllwt.isEmpty());

console.log('\n');
console.log(dllwt.delete());

console.log('\n');
dllwt.display();

console.log('\n');
console.log(dllwt.size());
console.log(dllwt.lastIndex());
console.log(dllwt.isEmpty());