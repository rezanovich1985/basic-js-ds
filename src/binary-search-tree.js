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
    // console.log("has", data, node);
    return node !== null;
  }

  find(data, parentNode = null) {
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
    // console.log("remove", data, node);
    if (!node) {
      return;
    }

    const parentNode = node.parent;

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
        if (parentNode.left === node) {
          parentNode.left = node.right;
        } else {
          parentNode.right = node.right;
        }
      } else {
        this._root = node.right;
      }
    } else if (!node.right) {
      if (parentNode) {
        if (parentNode.left === node) {
          parentNode.left = node.left;
        } else {
          parentNode.right = node.left;
        }
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
// tree.add(19);
// tree.add(7);
// tree.add(6);
// tree.add(14);
// tree.add(13);
// tree.remove(14);
// tree.has(14);
// tree.has(7);
