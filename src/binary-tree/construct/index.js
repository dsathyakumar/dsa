'use strict';

const {
    arrayToBinaryTree,
    BinaryTreeToArray
} = require('./array-to-binary-tree');

const {
    listOfListToBinaryTree,
    BinaryTreeToListOfLists
} = require('./list-of-list-to-binary-tree');

const {
    mapToBinaryTree,
    BinaryTreeToMap
} = require('./map-to-binary-tree');

// Array Representation of Binary tree
exports.arrayToBinaryTree = arrayToBinaryTree;
exports.BinaryTreeToArray = BinaryTreeToArray;

// List of Lists representation of Binary Tree
exports.listOfListToBinaryTree = listOfListToBinaryTree;
exports.BinaryTreeToListOfLists = BinaryTreeToListOfLists;

// Map based representation of Binary Tree
exports.BinaryTreeToMap = BinaryTreeToMap;
exports.mapToBinaryTree = mapToBinaryTree;