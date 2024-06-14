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
        console.log("found: " + value);
        return current;
      }

      if (current.value > value) {
          current = current.leftNode;
      } else {
          current = current.rightNode;
      }
    }

    console.log("Not found: " + value);
  }

  printTree() {
    if (this.root) this.printInOrder(this.root);
  }

  private printInOrder(node?: TreeNode) {
    if (!node) return;

    this.printInOrder(node.leftNode);
    node.print(); // Visit Left Root Right
    this.printInOrder(node.rightNode);
  }
}

const tree = new Tree();

tree.insert(7);
tree.insert(4);
tree.insert(9);
tree.insert(1);
tree.insert(6);
tree.insert(8);
tree.insert(10);

tree.find(11);

// tree.printTree();
