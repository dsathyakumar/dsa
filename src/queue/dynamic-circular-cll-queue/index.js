'use strict';

const {
    DynamicCircularCLLQueue
} = require('./dynamic-circular-cll-queue');

const dccllq = new DynamicCircularCLLQueue();

console.log('\n');
console.log(dccllq.isEmpty());
console.log(dccllq.size());

console.log('\n');
console.log(dccllq.getFront());
console.log(dccllq.getRear());

console.log('\n');
dccllq.display();
console.log(dccllq.find('AAPL'));

console.log('\n');
dccllq.enqueue();
dccllq.dequeue();

console.log('\n');
console.log(dccllq.enqueue('GOOG'));

console.log('\n');
console.log(dccllq.getFront());
console.log(dccllq.getRear());

console.log('\n');
console.log(dccllq.enqueue('PYPL'));

console.log('\n');
console.log(dccllq.getFront());
console.log(dccllq.getRear());

console.log('\n');
console.log(dccllq.enqueue('NIKE'));

console.log('\n');
console.log(dccllq.getFront());
console.log(dccllq.getRear());

console.log('\n');
console.log(dccllq.isEmpty());
console.log(dccllq.size());

console.log('\n');
dccllq.display();

console.log('\n');
console.log(dccllq.find('AAPL'));
console.log(dccllq.find('GOOG'));

console.log('\n');
console.log(dccllq.dequeue());
console.log(dccllq.dequeue());

console.log('\n');
console.log(dccllq.isEmpty());
console.log(dccllq.size());

console.log('\n');
dccllq.display();

console.log('\n');
console.log(dccllq.dequeue());

console.log('\n');
console.log(dccllq.isEmpty());
console.log(dccllq.size());

console.log('\n');
dccllq.display();
