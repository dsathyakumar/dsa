'use strict';

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
    zigZagInverse,
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
    getFullNodeCount,
    getHalfNodeCount,
    getLeafNodeCount,
    getInternalNodeCount,
    numberOfLevels,
    numberOfNodes,
    numberOfEdges
} = require('./tree-utils/counter-utils');

const {
    TreeNode
} = require('./node');

const {
    arrayToBinaryTree,
    listOfListToBinaryTree,
    BinaryTreeToArray,
    BinaryTreeToListOfLists,
    mapToBinaryTree,
    BinaryTreeToMap
} = require('./construct/');

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
    }

    isEmpty() {
        return ((this.root === null) && (this.size === 0));
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

        return;
    }

    destroyTree() {
        return destroyTree(this.root);
    }

    delete(value) {
        if (typeof value === 'undefined') {
            console.warn(`Value to delete must be specified`);
            return false
        }

        return deleteNode(this.root, value);
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

    toArray() {
        return BinaryTreeToArray(this.root);
    }

    toListOfLists() {
        return BinaryTreeToListOfLists(this.root);
    }

    toMap() {
        return BinaryTreeToMap(this.root);
    }

    getFullNodeCount() {
        return getFullNodeCount(this.root);
    }

    getHalfNodeCount() {
        return getHalfNodeCount(this.root);
    }

    getLeafNodeCount() {
        return getLeafNodeCount(this.root);
    }

    getNumberofNodes() {
        return numberOfNodes(this.root);
    }

    getNumberOfLevels() {
        return numberOfLevels(this.root);
    }

    getNumberOfEdges() {
        return numberOfEdges(this.root);
    }

    getInternalNodeCount() {
        return getInternalNodeCount(this.root);
    }
}

// static methods are exposed to make it work on a TreeNode
// type that is a root/
BinaryTree.arrayToBinaryTree = arrayToBinaryTree;
BinaryTree.BinaryTreeToArray = BinaryTreeToArray;

BinaryTree.listOfListToBinaryTree = listOfListToBinaryTree;
BinaryTree.BinaryTreeToListOfLists = BinaryTreeToListOfLists;

BinaryTree.mapToBinaryTree = mapToBinaryTree;
BinaryTree.BinaryTreeToMap = BinaryTreeToMap;

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
BinaryTree.zigZagInverse = zigZagInverse;
BinaryTree.DiagonalTraversal = diagonalLevel;
BinaryTree.spiralClockwise = spiralClockwise;
BinaryTree.spiralAntiClockWise = spiralAntiClockWise;
BinaryTree.boundaryLevelOrderTraversal = boundaryLevelOrderTraversal;

// Node deletion
BinaryTree.deleteNode = deleteNode;
BinaryTree.destroyTree = destroyTree;

// counts
BinaryTree.getFullNodeCount = getFullNodeCount;
BinaryTree.getHalfNodeCount = getHalfNodeCount;
BinaryTree.getLeafCount = getLeafNodeCount;
BinaryTree.getInternalNodeCount = getInternalNodeCount;
BinaryTree.numberOfLevels = numberOfLevels;
BinaryTree.numberOfNodes = numberOfNodes;
BinaryTree.numberOfEdges = numberOfEdges;

exports.BinaryTree = BinaryTree;

