'use strict';

const {
    DLLNode
} = require('./node');

/**
 * A DQ cannot be implemented with rear deletion using a SLL as it needs knowledge of prev
 * node. So we use the DLL. This class expects enQ to send input as a DLLNode. However, the
 * logic can be modified to allow data and create a wrapper DLLNode for the same.
 */
class DynamicLinearDLLDeque {
    constructor() {
        // this is same as the head pointer (but in Q terms)
        this.front = null;
        // a normal DLL would not have a rear pointer. This is specific case for DQ
        // Since insertion and deletion must be from both the ends at O(1).
        // This is same as a tail pointer (but in Q terms)
        this.rear = null;
        this.length = 0;
    }

    isEmpty() {
        return ((this.length === 0) && (this.front === null) && (this.rear === null));
    }

    size() {
        return (this.length);
    }

    enqueueFront(node) {
        if (!(node instanceof DLLNode)) {
            console.warn(`Data must be an instance of DLLNode`);
            return;
        }

        // when the Q is empty, both front and rear point to the same node.
        if (this.isEmpty()) {
            this.front = node;
            this.rear = node;
            // force set the prev & next to NULL
            node.prev = null;
            node.next = null;
        } else {
            // 1. Make the node's prev pointer to be null
            // 2. Make the node's next pointer to point to front.
            // 3. Make the front's prev pointer to point to node.
            // 4. Make the front to refer to node.
            this.front.prev = node;
            node.next = this.front;
            node.prev = null;
            this.front = node;
        }

        this.length++;
        return this.size();
    }

    enqueueRear(node) {
        if (!(node instanceof DLLNode)) {
            console.warn(`Data must be an instance of DLLNode`);
            return;
        }

        // when the Q is empty, both front and rear point to the same node.
        if (this.isEmpty()) {
            this.front = node;
            this.rear = node;
            // force set the prev & next to NULL
            node.prev = null;
            node.next = null;
        } else {
            // 1. Make REAR's next pointer to refer node.
            // 2. Make node's prev pointer to refer to REAR.
            // 3. Make node's next pointer to refer null.
            // 4. Make REAR to refer to node.
            this.rear.next = node;
            node.prev = this.rear;
            node.next = null;
            this.rear = node;
        }

        this.length++;
        return this.size();
    }

    dequeueFront() {
        if (this.isEmpty()) {
            console.warn(`The deQ is empty! Nothing to delete in front`);
            return;
        }

        let dequedValue = this.front.data;

        // when both front and rear point to one element, then its the last / only element left
        if (this.front === this.rear) {
            this.front = null;
            this.rear = null;
        } else {
            // 1. Get the nextNode after front
            // 2. Next Node's prev should be NULL
            // 3. Front's next should be NULL.
            // 4. Front to point to next
            let nextNode = this.front.next;
            nextNode.prev = null;
            this.front.next = null;
            this.front = nextNode;
        }

        this.length--;
        return dequedValue;
    }

    dequeueRear() {
        if (this.isEmpty()) {
            console.warn(`The deQ is empty! Nothing to delete in rear`);
            return;
        }

        let dequedValue = this.rear.data;

        // when both front and rear point to one element, then its the last / only element left
        if (this.front === this.rear) {
            this.front = null;
            this.rear = null;
        } else {
            // 1. Use REAR to get Previous Node into Temp.
            // 2. Current REAR's PREV pointer should point to NULL
            // 3. Previous Node's NEXT should point to NULL.
            // 4. Make the REAR to point to TEMP.
            let prevNode = this.rear.prev;
            this.rear.prev = null;
            prevNode.next = null;
            this.rear = prevNode;
        }

        this.length--;
        return dequedValue;
    }

    getFront() {
        if (this.isEmpty()) {
            console.warn(`The deQ is empty! Nothing to return from front`);
            return;
        }

        return (this.front.data);
    }

    getRear() {
        if (this.isEmpty()) {
            console.warn(`The deQ is empty! Nothing to return from rear`);
            return;
        }

        return (this.rear.data);
    }

    find(data) {
        if (typeof data === 'undefined' || data === null) {
            console.warn(`Data must not be empty!`);
            return;
        }

        if (this.isEmpty()) {
            console.warn(`The deQ is empty! Nothing to find`);
            return;
        }

        let currentNode = this.front,
            idx = -1;

        // loop breaks only when value is found & returns the index count from front
        // else if the last node is reached and data is not found, loop will exit
        // the return value would be -1
        while(currentNode) {
            if (currentNode.data === data) {
                break;
            }

            currentNode = currentNode.next;
            idx = (currentNode === null) ? -1 : (idx + 1);
        }

        return idx;
    }

    display() {
        if (this.isEmpty()) {
            console.warn(`The deQ is empty! Nothing to display`);
            return;
        }

        let currentNode = this.front;

        // proceeds from front to rear and logs the data
        while(currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }
}

exports.DynamicLinearDLLDeque= DynamicLinearDLLDeque;
