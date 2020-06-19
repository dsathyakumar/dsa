'use strict';

const {
    TreeNode
} = require('./node');

const {
    BinaryTree
} = require('./binary-tree');

// const bt = new BinaryTree();

// // root @ level - 0
// console.log(bt.insert(7));

// // Level - 1
// console.log(bt.insert(5));
// console.log(bt.insert(10));

// // level - 2
// const node3 = new TreeNode(3);
// node3.right = new TreeNode(21);
// console.log(bt.insert(node3));

// console.log(bt.insert(6));

// const node9 = new TreeNode(9);
// node9.left = new TreeNode(44);
// console.log(bt.insert(node9));


// const node77 = new TreeNode(77);
// node77.left = new TreeNode(67);

// const node12 = new TreeNode(12);
// node12.right = node77;

// console.log(bt.insert(node12));

// console.log(bt.preOrder());
// console.log(bt.inOrder());
// console.log(bt.postOrder());
// console.log(bt.levelOrder())


// const root = BinaryTree.arrayToBinaryTree([3, null, 4, null, null, null, 5, null, null, null, null, null, null, null, 6]);
// const root = BinaryTree.arrayToBinaryTree([1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, 8, null, 9]);
// console.log(root);
// console.log(BinaryTree.verticalPreOrderTraversal(root));
// console.log('hi');

// picked from Tushar Roy's video example
// const morrisInOrderTreeSample = [
//     10, 
//     5, 30,
//     -2, 6, null, 20,
//     null, 2, null, 8, null, null, null, null,
//     null, null, -1, null, null, null, null, null, null, null, null, null, null, null, null, null
// ];
// const morrisInOrderTree = BinaryTree.arrayToBinaryTree(morrisInOrderTreeSample);
// console.log(BinaryTree.morrisInOrderTraversal(morrisInOrderTree))

// picked from GFG
// const deleteionTree = [
//     10,
//     20, 30,
//     null, null, null, 40
// ];
// const sampleTreeForDelete = BinaryTree.arrayToBinaryTree(deleteionTree);
// BinaryTree.deleteNode(sampleTreeForDelete, 20);

// picked from GFG
const boundaryLevelOrderTree = [
    1,
    12, 13,
    11, 6, 4, 11,
    23, null, 7, 9, null, null, 2, 4
];
const sampleBoundaryLevelOrderTree = BinaryTree.arrayToBinaryTree(boundaryLevelOrderTree);
console.log(BinaryTree.boundaryLevelOrderTraversal(sampleBoundaryLevelOrderTree));
