'use strict';

const {
    DynamicCircularArrayQueue
} = require('../queue/dynamic-circular-array-queue/dynamic-circular-array-queue');

const {
    preOrder,
    preOrderRecursive,
    inOrder,
    inOrderRecursive,
    postOrder,
    postOrderRecursive,
    levelOrder,
    levelOrderIntoSeparateArrays,
    levelOrderRecursive,
    levelOrderReverse,
    verticalPreOrderTraversal,
    zigZagLevel,
    zigZaglevelReverse,
    spiralAntiClockWise,
    spiralClockwise,
    diagonalLevel,
    boundaryLevelOrderTraversal,
    morrisInOrderTraversal
} = require('./traversals');

const {
    insert
} = require('./insertion');

const {
    deleteNode,
    destroyTree
} = require('./deletion');

const {
    TreeNode
} = require('./node');

const {
    arrayToBinaryTree
} = require('./construct/array-to-binary-tree')

/**
 * A tree with atmost 2 children is a Binary Tree.
 * The 2 child nodes are named as Left Child and Right Child & are referenced by pointers
 * LEFT and RIGHT.
 * Every Binary Tree has only 1 unique root Node.
 * Every Node in the Binary Tree can be reached via 1 unique path from root.
 * If there is no unique path to a node from root, or, if there is more than 1, the structure
 * is a graph.
 * This is the LEFT - DATA - RIGHT linked representation of the Binary Tree.
 */
class BinaryTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    isEmpty() {
        return ((this.root === null) && (this.size === 0));
    }

    numberOfNodes() {
        return this.size;
    }

    numberOfEdges() {
        return (this.size - 1);
    }

    insert(data) {
        // if data is empty, return
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data cannot be empty!`);
            return;
        }

        // if data is not an instanceof TreeNode, wrap it and continue
        if (!(data instanceof TreeNode)) {
            data = new TreeNode(data);
        }

        // if the root is null, then, this is the 1st node in the Tree.
        // Assign and increment size and exit
        if (this.isEmpty()) {
            this.root = data;
        } else {
            insert(this.root, this.size)
        }

        // it is possible that there are elements in the Q
        // TODO, destroy Q if its not empty

        return ++this.size;
    }

    destroyTree() {

    }

    delete() {

    }

    preOrder() {
        if (this.isEmpty()) {
            console.warn(`Tree is empty. Nothing to traverse`);
            return;
        }

        return preOrder(this.root, this.size);
    }

    preOrderRecursive() {
        if (this.isEmpty()) {
            console.warn(`Tree is empty. Nothing to traverse`);
            return;
        }

        return preOrderRecursive(this.root);
    }

    inOrder() {
        if (this.isEmpty()) {
            console.warn(`Tree is empty. Nothing to traverse`);
            return;
        }

        return inOrder(this.root, this.size);
    }

    inOrderRecursive() {
        if (this.isEmpty()) {
            console.warn(`Tree is empty. Nothing to traverse`);
            return;
        }

        return inOrderRecursive(this.root);
    }

    postOrder() {
        if (this.isEmpty()) {
            console.warn(`Tree is empty. Nothing to traverse`);
            return;
        }

        return postOrder(this.root, this.size);
    }

    postOrderRecursive() {
        if (this.isEmpty()) {
            console.warn(`Tree is empty. Nothing to traverse`);
            return;
        }

        return postOrderRecursive(this.root);
    }

    levelOrder() {
        if (this.isEmpty()) {
            console.warn(`Tree is empty. Nothing to traverse`);
            return;
        }

        return levelOrder(this.root, this.size);
    }

    height() {

    }

    depth() {
        
    }

    heightOfNode() {

    }

    depthOfNode() {

    }

    find() {

    }

    get() {

    }
}

// static methods.
BinaryTree.arrayToBinaryTree = arrayToBinaryTree;

// TRAVERSALS - DFS
BinaryTree.inOrder = inOrder;
BinaryTree.inOrderRecursive = inOrderRecursive;
BinaryTree.postOrder = postOrder;
BinaryTree.postOrderRecursive = postOrderRecursive;

// TRAVERSALS - BFS
BinaryTree.levelOrder = levelOrder;
BinaryTree.levelOrderIntoSeparateArrays = levelOrderIntoSeparateArrays;
BinaryTree.levelOrderRecursive = levelOrderRecursive;
BinaryTree.levelOrderReverse = levelOrderReverse;

// Morris TRAVERSALS
BinaryTree.morrisInOrderTraversal = morrisInOrderTraversal;

// Other Traversals
BinaryTree.verticalPreOrderTraversal = verticalPreOrderTraversal;
BinaryTree.zigZagTraversal = zigZagLevel;
BinaryTree.zigZagReverse = zigZaglevelReverse;
BinaryTree.DiagonalTraversal = diagonalLevel;
BinaryTree.spiralClockwise = spiralClockwise;
BinaryTree.spiralAntiClockWise = spiralAntiClockWise;
BinaryTree.boundaryLevelOrderTraversal = boundaryLevelOrderTraversal;

exports.BinaryTree = BinaryTree;
