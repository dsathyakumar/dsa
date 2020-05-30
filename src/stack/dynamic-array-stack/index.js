'use strict';

const {
    DynamicArrayStack
} = require('./dynamic-array-stack');

const das = new DynamicArrayStack(3);

console.log(das.isEmpty());
console.log(das.peek());
console.log(das.pop());
console.log(das.push());
console.log(das.size());

console.log('\n');
das.view();

console.log('\n');

das.push('GOOG');
das.push('TSLA');
das.push('PYPL');
das.push('MSFT');

console.log(das.isEmpty());
console.log(das.peek());
console.log(das.size());

console.log('\n');
das.view();

das.push('NIKE');

console.log('\n');
console.log(das.isEmpty());
console.log(das.peek());
console.log(das.size());

console.log('\n');
das.view();

das.pop();
das.pop();
das.pop();
das.pop();

console.log('\n');
das.view();

console.log('\n');
console.log(das.isEmpty());
console.log(das.peek());
console.log(das.size());


das.pop();

console.log('\n');
das.view();

console.log('\n');
console.log(das.isEmpty());
console.log(das.peek());
console.log(das.size());