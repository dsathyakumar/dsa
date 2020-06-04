'use strict';

/**
 * A node for a DLL.
 * Its the same as the Node of the SLL, but
 * has another additional field associated with it
 * that holds the reference of the previous Node.
 */
class DLLNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

exports.DLLNode = DLLNode;
