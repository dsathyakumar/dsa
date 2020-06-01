'use strict';

const {
    checkIfBalanced
} = require('./balancing-parenthesis');

console.log(checkIfBalanced('(A+B)+(C+D)'));
console.log(checkIfBalanced('((A+B)+(C+D)'));
console.log(checkIfBalanced('(A+B)+(C+D))'));
console.log(checkIfBalanced('((A+B)+[C+D])'));
console.log(checkIfBalanced('((A+B)+[C+D}'));