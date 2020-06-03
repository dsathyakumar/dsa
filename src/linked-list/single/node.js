'use strict';

/**
 * Every Node of the LinkedList
 */
class SLLNode {
    constructor(data) {
        // the data associated with this node.
        this.data = data;
        // maintains a reference to the next node so that a link in a chain is formed
        this.next = null;
    }
}

exports.SLLNode = SLLNode;
