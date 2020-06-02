const {
    DynamicLinearDLLDeque
} = require('./dynamic-linear-dll-deque');
const {
    DLLNode
} = require('./node');

const dldlldq = new DynamicLinearDLLDeque();

console.log('\n');
console.log(dldlldq.isEmpty());
console.log(dldlldq.size());

console.log('\n');
dldlldq.display();

console.log('\n');
dldlldq.find();
dldlldq.find('AAPL');

console.log('\n');
dldlldq.getFront();
dldlldq.getRear();

console.log('\n');
dldlldq.enqueueFront();
dldlldq.enqueueRear();
dldlldq.dequeueFront();
dldlldq.dequeueRear();

console.log('\n');
console.log(dldlldq.enqueueFront(new DLLNode('AAPL')));
console.log(dldlldq.enqueueFront(new DLLNode('GOOG')));
console.log(dldlldq.enqueueRear(new DLLNode('MSFT')));
console.log(dldlldq.enqueueRear(new DLLNode('PYPL')));

console.log('\n');
console.log(dldlldq.isEmpty());
console.log(dldlldq.size());

console.log('\n');
dldlldq.display();

console.log('\n');
console.log(dldlldq.dequeueRear());

console.log('\n');
dldlldq.display();

console.log('\n');
console.log(dldlldq.dequeueFront());

console.log('\n');
dldlldq.display();

console.log('\n');
console.log(dldlldq.dequeueFront());

console.log('\n');
dldlldq.display();

console.log('\n');
console.log(dldlldq.dequeueRear());

console.log('\n');
console.log(dldlldq.isEmpty());
console.log(dldlldq.size());

console.log('\n');
dldlldq.display();