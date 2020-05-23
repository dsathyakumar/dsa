'use strict';

exports.insertFirst = (list, node) => {
    if (!list.tail) {
        list.tail = node;
        node.next = node;
    } else {
        let currentHead = list.tail.next;
        list.tail.next = node;
        node.next = currentHead;
        currentHead = undefined;
    }
    list.length++;
};

exports.insertLast = (list, node) => {
    let currentNode = list.tail.next,
        idx = 0;

    while(currentNode) {
        if ((idx + 1 === list.length) && (currentNode === list.tail)) {
            let currentTailNode = list.tail;
            node.next = currentTailNode.next;
            currentTailNode.next = node;
            list.tail = node;
            list.length++;
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }
};

exports.insertAtIndex = (list, node, index) => {
    let currentNode = list.tail.next,
        idx = 0;

    while(currentNode) {
        if (idx + 1 === index) {
            let nextNode = currentNode.next;
            currentNode.next = node;
            node.next = nextNode;
            nextNode = undefined;
            list.length++;
            break;
        }

        currentNode = currentNode.next;
        idx++;
    }
};

exports.deleteFirst = list => {
    // if this is the only Node left, there will be a circular ref, so just set it as NULL
    if (list.tail.next === list.tail) {
        list.tail = undefined;
        list.tail = null;
    } else {
        let head = list.tail.next;
        list.tail.next = head.next;
        head = undefined;
    }
    list.length--;
};

exports.deleteLast = list => {
    // does not include deleteFirst (1 Node case is handled by deleteFirst)
    let currentNode = list.tail.next;

    while(currentNode) {
        // next is the last node (current tail.)
        if (currentNode.next === list.tail) {
            currentNode.next = list.tail.next;
            list.tail = undefined;
            list.tail = currentNode;
            list.length--;
            break;
        }
        currentNode = currentNode.next;
    }
};

exports.deleteAtIndex = (list, index) => {
    let currentNode = list.tail.next,
        idx = 0,
        prevNode = list.tail;
    
    while(currentNode) {
        if (idx === index) {
            prevNode.next = currentNode.next;
            currentNode = undefined;
            list.length--;
            break;
        }

        prevNode = currentNode;
        currentNode = currentNode.next;
        idx++;
    }
};

exports.rreverse = (node, head) => {
    // return the tailNode first
    if (node !== null && (node.next === head)) {
        return node;
    }

    const reversedHead = this.rreverse(node.next, head)

    node.next.next = node;
    node.next = null;

    return reversedHead;
};
