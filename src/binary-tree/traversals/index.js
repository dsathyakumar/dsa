'use strict';

// START : **************** BASIC ***********************
const {
    preOrder,
    preOrderRecursive
} = require('./pre-order');

const {
    inOrder,
    inOrderRecursive
} = require('./in-order');

const {
    postOrder,
    postOrderRecursive
} = require('./post-order');

const {
    levelOrder,
    levelOrderIntoSeparateArrays,
    levelOrderReverse,
    levelOrderRecursive
} = require('./level-order');
// END : **************** BASIC ***********************




// START : **************** APPLICATIONS ***********************
const {
    zigZagLevel
} = require('./zigzag-level');

const {
    zigZaglevelReverse
} = require('./zigzag-level-reverse');

const {
    verticalPreOrderTraversal
} = require('./vertical-level-pre-order');

const {
    diagonalLevel
} = require('./diagonal-level');

const {
    spiralAntiClockWise,
    spiralClockwise
} = require('./spiral-order');

const {
    boundaryLevelOrderTraversal
} = require('./boundary-level-order');
// END : **************** APPLICATIONS ***********************




// START : **************** ADVANCED TRAVERSALS ***********************
const {
    morrisInOrderTraversal
} = require('./morris-inorder');
// END : **************** ADVANCED TRAVERSALS ***********************

// DFS
exports.preOrder = preOrder;
exports.preOrderRecursive = preOrderRecursive;
exports.inOrder = inOrder;
exports.inOrderRecursive = inOrderRecursive;
exports.postOrder = postOrder;
exports.postOrderRecursive = postOrderRecursive;

// BFS
exports.levelOrder = levelOrder;
exports.levelOrderIntoSeparateArrays = levelOrderIntoSeparateArrays;
exports.levelOrderReverse = levelOrderReverse;
exports.levelOrderRecursive = levelOrderRecursive;

// Applications
exports.verticalPreOrderTraversal = verticalPreOrderTraversal;
exports.spiralAntiClockWise = spiralAntiClockWise;
exports.spiralClockwise = spiralClockwise;
exports.zigZagLevel = zigZagLevel;
exports.zigZaglevelReverse = zigZaglevelReverse;
exports.diagonalLevel = diagonalLevel;
exports.boundaryLevelOrderTraversal = boundaryLevelOrderTraversal;

// Advanced
exports.morrisInOrderTraversal = morrisInOrderTraversal;