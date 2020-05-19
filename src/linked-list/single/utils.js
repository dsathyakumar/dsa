'use strict';

/**
 * Performs a recursive reverse of the given Singly Linked List
 * @param {Node} node 
 * @returns {Node} reversedHead (the reversed Head Node)
 */
const rreverse = node => {
    if (node !== null && node.next === null) {
        return node;
    }

    // first time this will ever execute will be for the last Node in the list
    // in that case, reverse will be the last node
    // and, <node> will be the (last node - 1).
    const reversedHead = rreverse(node.next);
    // at the moment, 
    // - (last node - 1).next = lastNode
    // - (last node - 1).next.next => lastNode.next => NULL
    // by doing, (last node - 1).next.next = node, we are moving the (lastNode - 1)
    // as to be the 2nd Node after the head Node (which is now the Last Node)
    // and we set its next to NULL (which should be filled by previous recursive calls)
    node.next.next = node;
    node.next = null;
    return reversedHead;
};

/**
 * Inserts at the 1st position of the Singly Linked List
 * It could be an empty / non-empty list.
 * @param {SinglyLinkedList} list 
 * @param {Node} node 
 */
const insertFirst = (list, node) => {
    if (list instanceof SinglyLinkedList) {
        let tempNode = list.head;
        list.head = node;
        node.next = tempNode;
        tempNode = undefined;
        list.length++;
    }
};

/**
 * Inserts at the end of the SinglyLinkedList
 * @param {SinglyLinkedList} list 
 * @param {Node} node 
 */
const insertLast = (list, node) => {
    if (list instanceof SinglyLinkedList) {
        let currentNode = list.head;
        while(currentNode) {
            // if currentNode doesn't have a NEXT, its the last NODE
            if (!currentNode.next) {
                currentNode.next = node;
                node.next = null;
                list.length++;
                break;
            }
            currentNode = currentNode.next;
        }
    }
};

/**
 * Inserts at a specific index
 * @param {SinglyLinkedList} list 
 * @param {Node} node 
 * @param {Number} index
 */
const insertAtIndex = (list, node, index) => {
    if (list instanceof SinglyLinkedList) {
        let idx = 0,
            currentNode = list.head,
            tempNode;
        
        while(currentNode) {
            // we have to insert in the next position.
            if ((idx + 1) === index) {
                tempNode = currentNode.next;
                currentNode.next = node;
                node.next = tempNode;
                tempNode = undefined;
                list.length++;
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }
    }
};

/**
 * Deletes at the 0th position of the list
 * @param {SinglyLinkedList} list 
 */
const deleteFirst = list => {
    if (list instanceof SinglyLinkedList) {
        let tempNode = list.head;
        list.head = tempNode.next;
        tempNode = undefined;
        list.length--;
    }
};

/**
 * Deletes at the last position of the list
 * @param {SinglyLinkedList} list 
 */
const deleteLast = list => {
    if (list instanceof SinglyLinkedList) {
        let currentNode = list.head;
        let prevNode = null;

        while(currentNode) {
            // if currentNode's next points to NULL, this is the last Node
            if (!currentNode.next) {
                prevNode.next = null;
                currentNode = undefined;
                list.length--;
                break;
            }

            prevNode = currentNode;
            currentNode = currentNode.next;
        }
    }
};

/**
 * Deletes at a specific index
 * @param {SinglyLinkedList} list 
 * @param {Number} index 
 */
const deleteAtIndex = (list, index) => {
    if (list instanceof SinglyLinkedList) {
        let idx = 0,
            currentNode = list.head,
            prevNode = null,
            nextNode;
        
        while(currentNode) {
            if (idx === index) {
                nextNode = currentNode.next;
                prevNode.next = nextNode;
                currentNode = undefined;
                list.length--;
                break;
            }
            prevNode = currentNode;
            currentNode = currentNode.next;
            idx++;
        }
    }
};

exports.rreverse = rreverse;
exports.deleteAtIndex = deleteAtIndex;
exports.deleteFirst = deleteFirst;
exports.deleteLast = deleteLast;
exports.insertAtIndex = insertAtIndex;
exports.insertFirst = insertFirst;
exports.insertLast = insertLast;
