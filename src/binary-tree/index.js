'use strict';

const {
    BinaryTree
} = require('./binary-tree');

const bt = new BinaryTree();

console.log(bt.insert(55));
console.log(bt.insert(89));
console.log(bt.insert(100));

console.log(bt.preOrder());
console.log(bt.inOrder());
console.log(bt.postOrder());
console.log(bt.levelOrder())
