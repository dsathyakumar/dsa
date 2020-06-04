'use strict';

// insertion is O(1)
exports.insertFirst = (dll, node) => {
    if (dll.isEmpty()) {
        dll.head = node;
        dll.tail = node;
    } else {
        // 1. Set Node's prev to be NULL
        // 2. Set Node's next to be current head
        // 3. Set current head's prev to be Node
        // 4. Set head as Node
        // 5. Increment length
        node.prev = null;
        node.next = dll.head;
        dll.head.prev = node;
        dll.head = node;
    }
    
    dll.length++;
    return;
};

// insertion O(1)
// this will never be called when list is empty
exports.insertLast = (dll, node) => {
    // 1. Set Node's next to be NULL
    // 2. Set Node's prev to be current tail
    // 3. Set current tail's next to be node.
    // 4. Set tail to point to new node.
    // 5. Increment length
    node.next = null;
    node.prev = dll.tail;
    dll.tail.next = node;
    dll.tail = node;
    dll.length++;
    return;
};

// insertion O(N)
exports.insertAtIndex = (dll, node, index) => {
    let currentNode = dll.head,
        idx = 0,
        nextNode;

    while(currentNode) {
        // if this is true, this means, the nextIndex is where the element must be inserted.
        // so the element at nextNode must be pushed down to make space.
        // 1. Set current node's NEXT as nextNode.
        // 2. Set currentNode.next = node;
        // 3. Set node.prev = currentNode
        // 4. Set node.next = nextNode
        // 5. Set nextNode.prev = node
        // 6. Increment length
        // Break
        if ((idx + 1) === index) {
            nextNode = currentNode.next;
            currentNode.next = node;
            node.prev = currentNode;
            node.next = nextNode;
            nextNode.prev = node;
            dll.length++;
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }

    return;
};

// deletion is O(1) due to tail
// this will be called when
exports.deleteFirst = dll => {
    let deletedValue;

    // get the deleted value
    deletedValue = dll.head.data;

    // 1. Get the nextNode
    // 2. set nextNode.prev = null;
    // 3. set currenthead.next = null;
    // 4. Set currentHead = nextNode
    // 5. length--
    let nextNode = dll.head.next;
    nextNode.prev = null;
    dll.head.next = null;
    dll.head = nextNode;
    dll.length--;

    // then this was the last node in the list and so tail pointer is reset
    if (dll.head === null) {
        dll.tail = null;
    }

    return deletedValue;
};

// deletion is O(1) due to tail
exports.deleteLast = dll => {
    let deletedValue;
    deletedValue = dll.tail.data;

    // 1. Get the prevNode.
    // 2. Set prevNode.next to be NULL (as this becomes the lastnode)
    // 3. Set current tail.prev to be NULL
    // 4. Set current tail to be prevNode
    // 5. length--
    let prevNode = dll.tail.prev;
    prevNode.next = null;
    dll.tail.prev = null;
    dll.tail = prevNode;
    dll.length--;

    return deletedValue;
};

// deletion is O(N)
exports.deleteAtIndex = (dll, index) => {
    let deletedValue;
    
    let currentNode = dll.head,
        idx = 0;

    while (currentNode) {
        // if the index matches
        if (idx === index) {
            // get the deleted value
            deletedValue = currentNode.data;
            // set the prev node's next to point to nextnode
            // set the next node's prev to point to prevNode
            // set current's next and prev as null
            // set current to undefined
            // decrement length
            // break
            currentNode.prev.next = currentNode.next;
            currentNode.next.prev = currentNode.prev;
            currentNode.next = null;
            currentNode.prev = null;
            currentNode = undefined;
            dll.length--;

            break;
        }

        currentNode = currentNode.next;
        idx++;
    }

    return deletedValue;
};

exports.rReverse = node => {
    // this is the base case of recursion, where the tailNode is reached
    // this will become the new head, so its prev pointer will be null
    if (node !== null && node.next === null) {
        node.prev = null;
        return node;
    }

    // when the base case of recursion is met, this will return the old tail node
    // this old tail node is the new head now.
    // this reversedHead will bubble upwards from the bottom most recursive call.
    const reversedHead = this.rReverse(node.next);

    // if the basecase of recursion returned the oldtail node (which is now the new head)
    // then node.next.next => (node.next).next => oldTailNode.next => prevNode
    // this line sets the oldTailNode's next (or) the new Head's next as the prev Node
    // `node` refers to the prev node here.
    node.next.next = node;

    // now at this point, the prevNode as moved ahead of the oldTail node (new head)
    // we set its prev as the old node.next (this set's the prev Node's prev pointer as the new head)
    node.prev = node.next;

    // the prev node;s next pointer will be filled when it reaches the prev recursive call
    node.next = null;

    return reversedHead;
};
