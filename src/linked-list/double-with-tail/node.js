'use strict';

class DLLNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

exports.DLLNode = DLLNode;
