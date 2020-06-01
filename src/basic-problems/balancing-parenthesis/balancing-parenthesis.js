'use strict';

const {
    StaticArrayStack
} = require('../../stack/static-array-stack/static-array-stack');

const MATCHING_MAP = {
    ']': '[',
    '}': '{',
    ')': '('
};

/**
 * For a given string,
 * - push every opening balance-able symbol liek [ { ( into the stack.
 * - When a closing balance-able symbol is encountered, pop the stack and check if its
 *   the corresponding closing symbol for a valid opening symbol in the stack.
 * - if not, error out, as its not a matching symbol.
 * - Ignore all the other chars.
 * - For the pop, check if it returns an undefined as its possible that for a given
 *   closing braces, there was never an opening brace pushed it (missing opening brace)
 * - At the end, check if the stack is empty (all opening symbols have popped), if not,
 *   then, there are opening braces, still in the stack, as there was no closing braces
 *   present, causing a pop operation to be executed.
 * - In the last 2 cases, the string with parenthesis is NOT balanced.
 */
exports.checkIfBalanced = str => {
    if (!str.length || typeof str !== 'string') {
        console.warn('Input must be non-empty & of type string');
        return;
    }

    const balancedStack = new StaticArrayStack(str.length);
    let isBalanced = true;

    for (let charCounter = 0; charCounter < str.length; charCounter++) {
        let char = str.charAt(charCounter);

        // push into the stack if its a valid opening brace
        if (char === '[' || char === '{' || char === '(') {
            balancedStack.push(char);
        } else if (char === ']' || char === '}' || char === ')') { // pop if a closing brace is seen
            let poppedElem = balancedStack.pop();

            // At start, its possible that for a given closing brace, there was no opening brace pushed at all
            // in such cases, the element would just return undefined.
            if (typeof poppedElem === 'undefined') {
                console.error(`String parenthesis is not balanced at index = ${charCounter}`);
                isBalanced = false;
                break;
            }

            // checks if the opening brace returned, is indeed the matching opening brace
            // for a given closing brace.
            if (poppedElem === MATCHING_MAP[char]) {
                continue;
            }
        } else { // ignore all otehr chars in the string
            continue;
        }
    }

    // its possible, that something that was pushed in before, was never popped out
    // because there was no closing parenthesis for it at all, so its best to check is stack is empty
    if (!balancedStack.isEmpty()) {
        isBalanced = false;
    }

    return isBalanced;
};
