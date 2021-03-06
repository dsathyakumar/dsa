'use strict';

const {
    ArrayList
} = require('./array-list');

const dynamicArr_1 = new ArrayList(4);

console.log('\n');
dynamicArr_1.print();

console.log('\n');
console.log(dynamicArr_1.isFull());
console.log(dynamicArr_1.isEmpty());
console.log(dynamicArr_1.size());
console.log(dynamicArr_1.capacity());

console.log('\n');
console.log(dynamicArr_1.push('TSLA'));
console.log(dynamicArr_1.unshift('PYPL'));
console.log(dynamicArr_1.insert('GOOG', 0));
console.log(dynamicArr_1.insert('EBAY', 1));
console.log(dynamicArr_1.push('NIKE'));

console.log('\n');
console.log(dynamicArr_1.pop());
console.log(dynamicArr_1.shift());
console.log(dynamicArr_1.delete(1));

console.log('\n');
dynamicArr_1.print();

console.log('\n');
console.log(dynamicArr_1.get(0));
console.log(dynamicArr_1.get(1));
console.log(dynamicArr_1.get(2));
console.log(dynamicArr_1.get(3));
console.log(dynamicArr_1.get(4));
console.log(dynamicArr_1.get(5));

console.log('\n');
console.log(dynamicArr_1.contains('EBAY'));

const dynamicArr_2 = new ArrayList(2);