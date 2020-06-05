const {
    CircularLinkedList
} = require('./circular-linked-list');

const cll = new CircularLinkedList();

console.log('---------- SIZE + isEmpty ---------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log(cll.lastIndex());
console.log('---------- SIZE + isEmpty ---------');

console.log('\n');

console.log('--------------- Empty ops ------------');
cll.delete();
console.log('\n');
cll.print();
console.log('\n');
cll.find('GOOG');
console.log('\n');
cll.find();
console.log('\n');
cll.get(0);
console.log('\n');
cll.get();
console.log('\n');
cll.modify();
console.log('\n');
cll.modify(-1, 55);
console.log('\n');
cll.updateAll('PYPL', 'PAYPAL');
console.log('\n');
console.log('--------------- Empty ops ------------');

console.log('\n');

console.log(cll.insert('PYPL')); // will be index = 0 as list is empty
// PYPL (tail)
console.log(cll.insert('DOW', 0)); // will be index = 0
// DOW -> PYPL(tail)
console.log(cll.insert('GOOG')); // insert Last
// DOW -> PYPL -> GOOG (tail)
console.log(cll.insert('FB')); // inserts to the last
// DOW -> PYPL -> GOOG -> FB (tail)
console.log(cll.insert('AMZN', 2)); // insert at an index
// DOW -> PYPL -> AMZN -> GOOG -> FB (tail)
console.log(cll.insert('EBAY', 0)); // insert at 0 again
// EBAY -> DOW -> PYPL -> AMZN -> GOOG -> FB (tail)

console.log(cll.tail);
console.log('\n');
console.log(cll.tail.next);
console.log('\n');
console.log(cll.tail.next.next);
console.log('\n');
console.log(cll.tail.next.next.next);
console.log('\n');
console.log(cll.tail.next.next.next.next);
console.log('\n');
console.log(cll.tail.next.next.next.next.next);
console.log('\n');

console.log('--------------- PRINT + SIZE + isEmpty ------------');
console.log(cll.size());
console.log(cll.isEmpty());
cll.print();
console.log('--------------- PRINT + SIZE + isEmpty ------------');

console.log('\n');

console.log('--------------- FIND ------------');
console.log(cll.find('GOOG'));
console.log(cll.find('LNKDN'));
console.log('--------------- FIND ------------');

console.log('\n');

console.log('--------------- GET ------------');
console.log(cll.get(0));
console.log(cll.get(1));
console.log(cll.get(2));
console.log(cll.get(3));
console.log(cll.get(4));
console.log(cll.get(5));
console.log(cll.get(6));
console.log('--------------- GET ------------');

console.log('\n');

console.log('--------------- UPDATE + MODIFY ------------');
cll.updateAll('AMZN', 'Amazon');
cll.updateAll('GOOG', 'Google');
cll.modify(0, 'eBay');
cll.modify(2, 'PayPal');
console.log('--------------- UPDATE + MODIFY ------------');

console.log('\n');

console.log('--------------- PRINT + SIZE + isEmpty ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('--------------- PRINT + SIZE + isEmpty ------------');

cll.reverse();

console.log('\n');

console.log(cll.tail);
console.log('\n');
console.log(cll.tail.next);
console.log('\n');
console.log(cll.tail.next.next);
console.log('\n');
console.log(cll.tail.next.next.next);
console.log('\n');
console.log(cll.tail.next.next.next.next);
console.log('\n');
console.log(cll.tail.next.next.next.next.next);

console.log('\n');

console.log('--------------- PRINT + SIZE + isEmpty ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('--------------- PRINT + SIZE + isEmpty ------------');

cll.recursiveReverse();

console.log('\n');

console.log(cll.tail);
console.log('\n');
console.log(cll.tail.next);
console.log('\n');
console.log(cll.tail.next.next);
console.log('\n');
console.log(cll.tail.next.next.next);
console.log('\n');
console.log(cll.tail.next.next.next.next);
console.log('\n');
console.log(cll.tail.next.next.next.next.next);
console.log('\n');

console.log('--------------- PRINT + SIZE + isEmpty ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('--------------- PRINT + SIZE + isEmpty ------------');

console.log(cll.delete());

console.log('\n');

console.log('--------------- PRINT + SIZE + isEmpty ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('\n');
console.log(cll.tail);
console.log('--------------- PRINT + SIZE + isEmpty ------------');

console.log(cll.delete(2));

console.log('\n');

console.log('--------------- PRINT + SIZE + isEmpty ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('\n');
console.log(cll.tail);
console.log('--------------- PRINT + SIZE + isEmpty ------------');

console.log(cll.delete(0));

console.log('\n');

console.log('--------------- PRINT + SIZE + isEmpty ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('\n');
console.log(cll.tail);
console.log('--------------- PRINT + SIZE + isEmpty ------------');

console.log(cll.delete());
console.log(cll.delete());

console.log('\n');

console.log('--------------- PRINT + SIZE + isEmpty ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('\n');
console.log(cll.tail);
console.log('--------------- PRINT + SIZE + isEmpty ------------');

console.log(cll.delete(0));

console.log('\n');

console.log('--------------- PRINT + SIZE + isEmpty ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('\n');
console.log(cll.tail);
console.log('--------------- PRINT + SIZE + isEmpty ------------');

cll.insert('Dheeran');

console.log('\n');
console.log('--------------- Add new print ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('\n');
console.log(cll.tail);
console.log('--------------- Add new print ------------');

cll.destroy();

console.log('\n');
console.log('--------------- Destroy single eleme ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('\n');
console.log(cll.tail);
console.log('--------------- Destroy single eleme ------------');

console.log('\n');

console.log(cll.insert('Vada Pav'));
console.log(cll.insert('Aloo Bonda'));
console.log(cll.insert('Samosa'));

console.log('\n');
console.log('--------------- Insert 3 more ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('\n');
console.log(cll.tail);
console.log('--------------- Insert 3 more ------------');


cll.destroy();

console.log('\n');

console.log('--------------- Destroy ------------');
console.log(cll.size());
console.log(cll.isEmpty());
console.log('\n');
cll.print();
console.log('\n');
console.log(cll.tail);
console.log('--------------- Destroy ------------');

console.log('\n');
console.log(cll.insert('Waymo'));
console.log(cll.insert('Ola'));
console.log(cll.insert('Lyft'));
console.log(cll.insert('Uber'));

// iterator capabilities
for (let node of cll) {
    console.log(node);
}