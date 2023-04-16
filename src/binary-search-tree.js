const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data, parentNode = this.root()) {
    const node = new Node(data);
    if (parentNode) {
      if (parentNode.data === data) {
      } else if (data < parentNode.data) {
        if (parentNode.left) {
          this.add(data, parentNode.left);
        } else {
          parentNode.left = node;
        }
      } else {
        if (parentNode.right) {
          this.add(data, parentNode.right);
        } else {
          parentNode.right = node;
        }
      }
    } else {
      this._root = node;
    }
  }

  has(data) {
    const node = this.find(data);
    return !!node;
  }

  find(data, parentNode = null) {
    //console.log(data, parentNode);

    let node;
    if (parentNode) {
      if (data < parentNode.data) {
        node = parentNode.left;
      } else {
        node = parentNode.right;
      }
    } else {
      node = this.root();
    }
    if (!node) {
      return null;
    }

    if (node.data === data) {
      node.parent = parentNode;
      return node;
    } else {
      return this.find(data, node);
    }
  }

  remove(data) {
    const node = this.find(data);
    if (!node) {
      return;
    }

    const parentNode = node.parent;
    //console.log(data, node, parentNode);

    if (!(node.left || node.right)) {
      if (parentNode) {
        if (parentNode.left === node) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
      } else {
        this._root = null;
      }
    } else if (!node.left) {
      if (parentNode) {
        parentNode.right = node.right;
      } else {
        this._root = node.right;
      }
    } else if (!node.right) {
      if (parentNode) {
        parentNode.left = node.left;
      } else {
        this._root = node.left;
      }
    } else {
      let successorNode, parentSuccessorNode;
      if (!node.right.left) {
        successorNode = node.right;
      } else {
        parentSuccessorNode = node.right;
        while (parentSuccessorNode.left.left) {
          parentSuccessorNode = parentSuccessorNode.left;
        }
        successorNode = parentSuccessorNode.left;
        parentSuccessorNode.left = successorNode.right;

        successorNode.right = node.right;
      }
      if (parentNode) {
        if (parentNode.left === node) {
          parentNode.left = successorNode;
        } else {
          parentNode.right = successorNode;
        }
      } else {
        this._root = successorNode;
      }
      successorNode.left = node.left;
    }
  }

  min(parentNode = this.root()) {
    if (parentNode) {
      if (parentNode.left) {
        return this.min(parentNode.left);
      } else {
        return parentNode.data;
      }
    } else {
      return null;
    }
  }

  max(parentNode = this.root()) {
    if (parentNode) {
      if (parentNode.right) {
        return this.max(parentNode.right);
      } else {
        return parentNode.data;
      }
    } else {
      return null;
    }
  }
}

module.exports = {
  BinarySearchTree,
};

// const tree = new BinarySearchTree();
// tree.add(9);
// tree.add(14);
// tree.add(2);
// tree.add(6);
// tree.add(128);
// tree.add(8);
// tree.add(31);
// tree.add(54);
// tree.add(1);
// tree.remove(14);
// tree.remove(8);
// tree.remove(9);
// // assert.strictEqual(tree.has(14), false);
// // assert.strictEqual(tree.has(8), false);
// // assert.strictEqual(tree.has(9), false);
// //console.log(tree.has(9));
// // assert.strictEqual(tree.has(2), true);
// //console.log(tree.has(2));
// // assert.strictEqual(tree.has(6), true);
// // assert.strictEqual(tree.has(128), true);
// //console.log(tree.has(128));
// // assert.strictEqual(tree.has(31), true);
// // assert.strictEqual(tree.has(54), true);
// console.log(tree.has(54));
// // assert.strictEqual(tree.has(1), true);
// //console.log(tree.has(1));

// const { values } = getTestingTools(20);
// const tree = new BinarySearchTree();
// values.forEach((value) => tree.add(value));
// values.sort((a, b) => (a % 2) - (b % 2) || a - b);
// const valuesToRemove = values.splice(0, 10);
// valuesToRemove.forEach((value) => tree.remove(value));
// // assert.strictEqual(
// //   valuesToRemove.every((value) => tree.has(value) === false),
// //   true
// // );
// console.log(valuesToRemove);
// // assert.strictEqual(
// //   values.every((value) => tree.has(value) === true),
// //   true
// // );
