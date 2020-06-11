'use strict';

const {
    TreeNode
} = require('./node');

const {
    BinaryTree
} = require('./binary-tree');

const bt = new BinaryTree();

// root @ level - 0
console.log(bt.insert(7));

// Level - 1
console.log(bt.insert(5));
console.log(bt.insert(10));

// level - 2
const node3 = new TreeNode(3);
node3.right = new TreeNode(21);
console.log(bt.insert(node3));

console.log(bt.insert(6));

const node9 = new TreeNode(9);
node9.left = new TreeNode(44);
console.log(bt.insert(node9));


const node77 = new TreeNode(77);
node77.left = new TreeNode(67);

const node12 = new TreeNode(12);
node12.right = node77;

console.log(bt.insert(node12));

console.log(bt.preOrder());
console.log(bt.inOrder());
console.log(bt.postOrder());
console.log(bt.levelOrder())
