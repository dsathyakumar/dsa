'use strict';

exports.insertFirst = (dll, node) => {

};

exports.insertLast = (dll, node) => {

};

exports.insertAtIndex = (dll, node, index) => {

};

exports.deleteFirst = dll => {

};

exports.deleteLast = dll => {

};

exports.deleteAtIndex = (dll, index) => {

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
