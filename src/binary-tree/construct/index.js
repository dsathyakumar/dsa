'use strict';

const {
    arrayToBinaryTree,
    BinaryTreeToArray
} = require('./array-representation');

const {
    listOfListToBinaryTree,
    BinaryTreeToListOfLists
} = require('./list-of-list-representation');

const {
    mapToBinaryTree,
    BinaryTreeToMap
} = require('./map-representation');

// Array Representation of Binary tree
exports.arrayToBinaryTree = arrayToBinaryTree;
exports.BinaryTreeToArray = BinaryTreeToArray;

// List of Lists representation of Binary Tree
exports.listOfListToBinaryTree = listOfListToBinaryTree;
exports.BinaryTreeToListOfLists = BinaryTreeToListOfLists;

// Map based representation of Binary Tree
exports.BinaryTreeToMap = BinaryTreeToMap;
exports.mapToBinaryTree = mapToBinaryTree;