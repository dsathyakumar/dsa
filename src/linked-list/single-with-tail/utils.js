'use strict';

// performs insert at index = 0 only
exports.insertFirst = (sll, node) => {
    // 1. Node's next must point to current Head.
    // 2. Head must point to node.
    // 3. Increment length
    node.next = sll.head;
    sll.head = node;
    sll.length++;

    // if there is only 1 element, then the tail must also point to it
    // this is not needed if there was more than one element already in the list
    if ((sll.lastIndex() === 0) && (sll.size() === 1)) {
        sll.tail = node;
    }

    return;
};

// will not be executed for the case of index=0
// in a normal SLL this is O(N)
// but since there is a ref to tail, this is now O(1)
exports.insertLast = (sll, node) => {
    // 1. current tails next must point to node.
    // 2. New node must be set as the tail
    // 3. Increment length
    sll.tail.next = node;
    sll.tail = node;
    sll.length++;

    return;
};

// performs insert at index !== 0 and index !== currentlength
exports.insertAtIndex = (sll, node, index) => {
    let currentNode = sll.head,
        idx = 0,
        nextNode;

    while(currentNode) {
        // this means we are at the previous index of the index we want
        // (so the currentNode is the previous Node)
        // this is forward iteration
        if ((idx + 1) === index) {
            // 1. prev.next = node.
            // 2. node.next = nextNode
            // 3. increment length
            // 4. GC next node
            nextNode = currentNode.next;
            currentNode.next = node;
            node.next = nextNode;
            sll.length++;
            nextNode = undefined;
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }

    return;
};

// performs delete at index = 0 or when the list has only 1 element left
// that is, its used to delete the last element in the list (only left element)
exports.deleteFirst = (sll) => {
    let headNode = sll.head;
    let deletedVal = headNode.data;

    // 1. Head must point to current head's next
    // 2. Current head's next pointer must be set to null
    // 3. Decrement length
    sll.head = sll.head.next;
    headNode.next = null;
    sll.length--;

    // the last element (only left element in list was deleted, so reset the pointers)
    if (sll.head === null) {
        sll.tail = null;
    }

    return deletedVal;
};

// deletes elements at index=lastIndex or (length-1)
exports.deleteLast = (sll) => {
    let currentNode = sll.head,
        deletedVal;

    while(currentNode) {
        // if the currentNode's next is the last Node.
        // then the next node is what must be deleted.
        if (currentNode.next === sll.tail) {
            // get the dequeued value
            deletedVal = currentNode.next.data;

            // 1. Set the current Node's next to null.
            // 2. Set the tail pointer to point to currentNode
            // 3. Decrement length
            currentNode.next = null;
            sll.tail = currentNode;
            sll.length--;

            break;
        }

        currentNode = currentNode.next;
    }

    return deletedVal;
};

// this will not perform deletion at index=0 or index=lastIndex or length-1
exports.deleteAtIndex = (sll, index) => {
    let currentNode = sll.head,
        idx = 0,
        deletedVal,
        nextNode;

    while(currentNode) {
        // this means we are at the previous index of the index we want
        // (so the currentNode is the previous Node)
        // this is forward iteration
        if ((idx + 1) === index) {
            // 1. get the NextNode
            // 2. set deletedVal to be nextNode.data
            // 3. prev.next = nextNode.next (where prev = currentNode)
            // 4. nextNode.next = null
            // 5. set nextNode as undefined.
            // 6. decrement length
            // 7. break
            nextNode = currentNode.next;
            deletedVal = nextNode.data;
            currentNode.next = nextNode.next;
            nextNode.next = null;
            nextNode = undefined;
            sll.length--;
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }

    return deletedVal;
};

// in this recursive reverse, we always return the reversed head in the call
// this reversedHead bubbles up from the bottom of the recursion stack and finally gets returned.
exports.rReverse = node => {
    if (node.next === null) {
        return node;
    }

    // if this call returns the lastnode or the tail,
    // then the `node` in this call is the previous lastNode
    const reversedHead = this.rReverse(node.next);

    // then (node.next).next will be tail.next
    // so this sets tail.next to be equal to currentNode
    node.next.next = node;

    // sets the currentNode's next to be NULL (this will be filled by subsequent calls)
    node.next = null;

    return reversedHead;
};
