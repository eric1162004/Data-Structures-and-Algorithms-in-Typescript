class TreeNode {
  value: number;
  leftNode?: TreeNode;
  rightNode?: TreeNode;

  constructor(value: number) {
    this.value = value;
  }

  print() {
    console.log(this.value);
  }
}

class Tree {
  private root?: TreeNode;

  insert(value: number) {
    const newNode = new TreeNode(value);

    // tree is empty
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (current.value > newNode.value) {
        if (!current.leftNode) {
          // we found the parent node
          current.leftNode = newNode; // insert the node
          break; // done!
        }
        current = current.leftNode; // jump to the next node and repeat
      } else {
        if (!current.rightNode) {
          current.rightNode = newNode;
          break;
        }
        current = current.rightNode;
      }
    }
  }

  find(value: number): TreeNode | null {
    let current = this.root;
    while (current) {
      if (current.value === value) {
        console.log('found: ' + value);
        return current;
      }

      if (current.value > value) {
        current = current.leftNode;
      } else {
        current = current.rightNode;
      }
    }

    console.log('Not found: ' + value);
  }

  printTree() {
    this.printInOrder(this.root);
  }

  // Left Root Right = Ascending order
  private printInOrder(node?: TreeNode) {
    if (!node) return;

    this.printInOrder(node.leftNode);
    node.print();
    this.printInOrder(node.rightNode);
  }

  height(): number {
    return this.getHeight(this.root);
  }

  private getHeight(node: TreeNode): number {
    if (!node) return 0;

    // return if we reach a leave node
    if (this.isLeaf(node)) return 0;

    return (
      1 +
      Math.max(this.getHeight(node.leftNode), this.getHeight(node.rightNode))
    );
  }

  min(): number {
    return this.getMin(this.root);
  }

  // O(n): we need to traverse all nodes in the tree to find the min value
  // NOTE: if you have a Binary Search Tree, the min value is the left most node of the tree.
  // then you get O(log n)
  getMin(node: TreeNode): number {
    if (!node) return Infinity;

    if (this.isLeaf(node)) return node.value;

    const left = this.getMin(node.leftNode);
    const right = this.getMin(node.rightNode);

    return Math.min(node.value, Math.min(left, right));
  }

  equals(other: Tree): boolean {
    if(!other) return false;

    return this.getIsEqual(this.root, other.root);
  }

  getIsEqual(first: TreeNode, second: TreeNode): boolean {
    // Is equal if both are empty 
    if (!first && !second) return true;

    // This is a preorder traversal, since we look at the Root first
    // Is equal if the first and second node is equal
    // and the left/right tree of both trees are equal
    if (first && second)
      return (
        first.value === second.value &&
        this.getIsEqual(first.leftNode, second.leftNode) &&
        this.getIsEqual(first.rightNode, second.rightNode)
      );

    return false;
  }

  private isLeaf(node: TreeNode) {
    return !node.leftNode && !node.rightNode;
  }
}

const tree = new Tree();
const tree2 = new Tree();

const values = [7, 4, 9, 6, 8, 10];
const values1 = [2, 1, 3];
const values2 = [];

values.forEach((value) => {
  tree.insert(value);
});

values2.forEach((value) => {
  tree2.insert(value);
});

console.log(tree2.equals(tree) );

// tree.printTree();
// tree.find(11);

// console.log(tree.height());
// console.log(tree.min());
