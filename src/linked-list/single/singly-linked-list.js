'use strict';

const rreverse = node => {
    if (typeof node !== null && typeof node.next === null) {
        return node;
    }

    // first time this will ever execute will be for the last Node in the list
    // in that case, reverse will be the last node
    // and, <node> will be the (last node - 1).
    const reversedHead = rreverse(list, node.next);
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
            tempNode;
        
        while(currentNode) {
            if (idx === index) {
                tempNode = currentNode.next;
                prevNode.next = tempNode;
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
 * The Singly Linked List Class
 */
class SinglyLinkedList {
    constructor() {
        // the Starting point of the singly linked list
        // it holds a reference to a <Node> that would be the starting point of the List
        this.head = null;
        // the size of the LinkedList or the length
        this.length = 0;
    }

    /**
     * returns if the list is empty or not
     */
    isEmpty() {
        return (this.length === 0);
    }

    /**
     * Gets an item at a specific index
     * 1. Check if the index is out of bounds
     * 2. Check if the list is empty
     */
    get(index) {
        if (this.head === null && !this.length) {
            console.warn(`The List is empty`);
            return;
        }
        // if the specified index is > length of array - 1, its out of bounds
        // if the list is empty, there is nothing to return
        // if not the above 2 conditions, we can return some value
        if (index > (this.length - 1) || index < 0) {
            console.warn(`List bounds exceeded. Please given an index that is < list length = ${this.length}`);
            return;
        }

        let value,
            currentNode = this.head,
            idx = 0;

        while(currentNode) {
            // if the index is matched, return the value of the <Node> and break
            // else loop by assigning the currentNode's Next, back to the currentNode & bump index
            if (idx === index) {
                value = currentNode.data;
                break;
            }

            currentNode = currentNode.next;
            idx++;
        }

        return value;
    }

    /**
     * Finds if an element is present & returns an index
     * if element is not found, returns a -1;
     */
    find(value) {
        if (this.length === 0) {
            console.warn(`List is empty!`);
        } else {
            let idx = 0;
            let currentNode = this.head;

            while(currentNode) {
                if (currentNode.data === value) {
                    break;
                } else {
                    idx = (currentNode.next) ? (idx + 1) : -1;
                    currentNode = currentNode.next;
                }
            }

            return idx;
        }
    }

    /**
     * Inserts an element at any given index.
     * If no index is given, insert at the end.
     * For a 0 length list, it should call insertFirst
     */
    insert(node, index) {
        // At max, we can insert into a position (lastIndex + 1) - which is the length
        // that is, the index, after the current last element.
        // Don't wanna allow negative indexes either.
        if ((index > this.length) || (index < 0)) {
            console.warn(`Inserting into an index that is out of bounds`);
            return;
        }

        // if the list is empty, set the head Node to point to incoming <Node>
        // No point of any index here. This is the 1st Node of the LinkedList, at 0th index.
        // Or, even if the index is 0 & its a non-empty list, then its insertFirst
        if ((!this.length) || (typeof index !== 'undefined' && index === 0)) {
            insertFirst(this, node);
            return;
        }

        // At this point, the list is certainly not empty.
        // if a valid index exists & its not equal to size of the list
        // meaning, the insertion is not for after the current last element
        // Nor, its the 0th index
        if (index && (index !== this.length) && (index !== 0)) {
            // some specific non-1st or not after last index
            insertAtIndex(this, node, index)
        } else {
            // index is either not given (so we append to the end) or is given and is end of the list
            // iterate till the end of the list and append
            // the end of the list is reached when any <Node>'s next is NULL
            insertLast(this, node);
        }
    }

    /**
     * Delete's an element at a specific index
     * If no index is given, deletes at the end.
     * For a 1 element list, use deleteFirst
     */
    delete(index) {
        // At max, we can delete from lastIndex, but not at an index
        // that equals to length of list (as in the case of insert)
        // Don't wanna allow negative indexes either.
        if ((index > this.length - 1) || (index < 0)) {
            console.warn(`Deletion at an index that is out of bounds`);
            return;
        }

        // if the list is empty, there is nothing to delete
        if (!this.length) {
            console.warn(`List is empty. Nothing to delete`);
            return;
        }

        // At this point, List is certainly not empty.
        // Check if its delete at 0th index / last index / in between
        if ((index && index === 0) || this.length === 1) {
            deleteFirst(this);
        } else if (index && (index !== (this.length - 1))) {
            // at this point, its neither 0th nor last
            deleteAtIndex(this, index);
        } else {
            deleteLast(this);
        }
    }

    /**
     * Print all the elements from the list
     */
    print() {
        if (this.length === 0) {
            console.warn(`List is empty!`);
        } else {
            let currentNode = this.head;

            while(currentNode) {
                console.log(currentNode.data);
                currentNode = currentNode.next;
            }
        }
    }

    /**
     * retuns the size of the List
     */
    size() {
        return this.length;
    }

    /**
     * Destroys the Singly Linked List
     */
    destroy() {
        if (this.length) {
            let currentNode = this.head;
            this.head = null;
            let tempNode;

            while(currentNode) {
                tempNode = currentNode.next;
                // setting to undefined will make v8 GC it.
                currentNode = undefined;
                currentNode = tempNode;
                tempNode = undefined;
                this.length--;
            }
        }
    }

    /**
     * Iteratively reverses the linked List
     */
    reverse() {
        let currentNode = this.head,
            prevNode = null,
            nextNode,
            idx = 0;
        
        while(currentNode && idx < this.length) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;
            if (idx === (this.length - 1)) {
                this.head = currentNode;
            }
            prevNode = currentNode;
            currentNode = nextNode;
            idx++;
        }
    }

    recursiveReverse() {
        rreverse(this.head);
    }
}

exports.SinglyLinkedList = SinglyLinkedList;
