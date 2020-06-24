'use strict';

class TreeNode {
    constructor(val, left, right) {
        this.val = val;
        this.left = left || null;
        this.right = right || null;
    }
}

exports.listOfListToBinaryTree = (data) => {
    // base case would be that the Node is a LEAF
    if (!data[1].length
        && !data[2].length
        && data[0] !== null
        && typeof data[0] !== 'undefined') {
        return new TreeNode(data[0], null, null);
    }

    return new TreeNode(
        data[0], 
        (data[1].length ? this.listOfListToBinaryTree(data[1]) : null),
        (data[2].length ? this.listOfListToBinaryTree(data[2]) : null)
    );
};
