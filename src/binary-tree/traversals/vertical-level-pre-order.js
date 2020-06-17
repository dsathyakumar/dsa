'use strict';

/**
 * The most important point to note about vertical order traversal is
 * the Root is assumed to be at (0, 0)
 * So the LEFT child would be considered to be at horizontal distance of unit -1
 * The Right Child would be considered at a horizontal distance of unit +1.
 * So the Left child of the root would be considered to be at (X-1, Y-1)
 * The Right Child of the root would be considered to be at (X+1, Y-1).
 * The Level or Y is also decremented as the child is at the next level.
 * 
 * So, in terms of solving this, we could do it using the pre-order traversal.
 * We maintain a map of the current horizontal distance units.
 * 
 * In normal pre-order traversal, we do not push the NODE onto the stack,
 * unless it had both LEFT and RIGHT. Thereby, if we popped out a NODE from the 
 * stack, its guaranteed to have a RIGHT.
 * 
 * Instead, we push it onto the stack, if it has a LEFT or RIGHT (similar to post-order traversal)
 * Thereby, we are able to backtrack, one node at a time & consequently reduce or increment
 * our currentHorizontalDistance unit. So, when a Node is popped off the stack, it may or may
 * not have a right. So,
 * Peek from Stack, If a node exists,
 *      => Stack is not empty
 *      => Fix the currentHorizontal DIstance (as we have backtracked from Child to parent)
 *      => Check if it has a right,
 *          => If Yes, set it as currentNode
 *          => Fix the currentHorizontal distance unit again.
 *      => If it did not have a right
 *          => Pop it off the stack
 *          => Set currentNode as the prevNode
 *          => Reset prevNode to NULL (so that it can continue popping next element off the stack)
 */
exports.verticalPreOrderTraversal = root => {
    if (root === null) {
        return null;
    }

    const stack = [];
    const result = {};
    
    let high = 0;
    let low = 0;
    let currentHorizontalDistance = 0;

    let currentNode = root;
    let hasLeft = false;
    let hasRight = false;
    let prevNode = null;

    while(currentNode !== null && typeof currentNode !== 'undefined') {
        // if an array was not set for the mapIndex, create one
        if (!result[currentHorizontalDistance]) {
            result[currentHorizontalDistance] = [];
        }

        // process the currentNode
        result[currentHorizontalDistance].push(currentNode.data || currentNode.val);

        // check for Left and Right subtrees
        hasLeft = (currentNode.left !== null);
        hasRight = (currentNode.right !== null);

        // if it either had a RIGHT or LEFT, then push it onto the stack
        if (hasLeft || hasRight) {
            stack.unshift(currentNode);
        }

        // if a left exists, process it
        // compute the new HD, its less than the currentlow, reset the low
        // for left, its a move from x,y to x-1, y-1, so decrement
        if (hasLeft) {
            // A move from root to LEFT would be from x to x-1 => decrement
            currentHorizontalDistance = currentHorizontalDistance - 1;
            if (currentHorizontalDistance < low) {
                low = currentHorizontalDistance;
            }

            currentNode = currentNode.left;
            continue;
        }

        // if a Right exists, in the absence of LEFt, only then process it.
        // For a RIGHT, its a move from x,y to (x+1, y-1), so increment
        // reset the HD & if it exceeds the High, reset the high
        if (!hasLeft && hasRight) {
            // A move from root to RIGHT would be from x to x+1 => increment
            currentHorizontalDistance = currentHorizontalDistance + 1;
            if (currentHorizontalDistance > high) {
                high = currentHorizontalDistance;
            }

            currentNode = currentNode.right;
            continue
        }

        // neither LEft nor right => LEAF
        // the node in stack is not guaranteed to have a RIGHT.
        if (!hasLeft && !hasRight) {
            while (prevNode === null) {
                // Peek from stack. Do not pop.
                // If it had a right, we would moved forward and have to backtrack again
                // Only if it did not have a right, we pop it from stack
                prevNode = stack[0];

                // First check if the Node exists, else the stack is empty, break inner and outer loop.
                if (!prevNode) {
                    currentNode = null;
                    break;
                }

                // While backtracking to a ROOT node (immediate ancestor or any ancestor)
                // A move from LEFT CHILD to root would be from x-1 to x => increment
                // A move from RIGHT child to root would be from x+1 to x => decrement
                if (prevNode.left === currentNode) {
                    currentHorizontalDistance = currentHorizontalDistance + 1;
                } else if (prevNode.right === currentNode) {
                    currentHorizontalDistance = currentHorizontalDistance - 1;
                }

                // if a right exists and its not the currentNode, process it
                // Reset HD.
                if ((prevNode.right !== null) && (currentNode !== prevNode.right)) {
                    currentHorizontalDistance = currentHorizontalDistance + 1;
                    currentNode = prevNode.right;
                    prevNode = null;
                    break;
                }

                // Right (if existed would have equalled currentNode) or may not have existed.
                // So pop it out of stack
                stack.shift();
                // backtrack to set currentNode as the prevNode
                // thereby we are backtracking one step at a time (HD) to the node which has a RIGHt
                currentNode = prevNode;
                prevNode = null;
            }
        }
    }

    return result;
};
