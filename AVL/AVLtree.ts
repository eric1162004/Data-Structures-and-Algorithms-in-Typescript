/*
AVL Tree - self balancing trees
solved the left and right skewed problem in BST.
*/

class AVLNode {
    value: number;
    height: number;
    left: AVLNode;
    right: AVLNode;
  
    constructor(value: number) {
      this.value = value;
      this.height = 0;
    }
  
    print() {
      console.log('value:', this.value, ' height:', this.height);
    }
  }
  
  class AVLTree {
    root: AVLNode;
  
    constructor() {}
  
    insert(value: number) {
      this.root = this._insert(value, this.root);
    }
  
    // Recursive insert
    private _insert(value: number, root: AVLNode): AVLNode {
      // BASE CASE: empty root, return a new root
      if (!root) {
        return new AVLNode(value);
      }
  
      // RECURSIVE INSERTION: returning child node
      if (root.value > value) {
        root.left = this._insert(value, root.left);
      } else {
        root.right = this._insert(value, root.right);
      }
  
      // POST INSERTION
  
      // 1. Reset the height - since new node is added
      this.setHeight(root);
  
      // 2. Return the balanced root
      return this.balance(root);
    }
  
    private setHeight(node: AVLNode) {
      node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    }
  
    private balance(root: AVLNode): AVLNode {
      
      if (this.isLeftHeavy(root)) {
        if (this.balanceFactor(root.left) < 0) {
          // TRICKY! Set returning node as the new child!  
          root.left = this.leftRotate(root.left);
        }
        return this.rightRotate(root);
  
      } else if (this.isRightHeavy(root)) {
        if (this.balanceFactor(root.right) > 0) {
          root.right = this.rightRotate(root.right);
        }
        return this.leftRotate(root);
      }
  
      // root is balanced, nothing to do.
      return root;
    }
  
    private leftRotate(root: AVLNode): AVLNode {
      let newRoot = root.right;
      root.right = newRoot.left;
      newRoot.left = root;
  
      // reset height of the root and new root
      this.setHeight(root);
      this.setHeight(newRoot);
  
      return newRoot;
    }
  
  
    private rightRotate(root: AVLNode): AVLNode {
      let newRoot = root.left;
      root.left = newRoot.right;
      newRoot.right = root;
  
      // reset height of the root and new root
      this.setHeight(root);
      this.setHeight(newRoot);
  
      return newRoot;
    }
  
    private isLeftHeavy(node: AVLNode): boolean {
      return this.balanceFactor(node) > 1;
    }
  
    private isRightHeavy(node: AVLNode): boolean {
      return this.balanceFactor(node) < -1;
    }
  
    private balanceFactor(node: AVLNode): number {
      return node ? this.height(node.left) - this.height(node.right) : 0;
    }
  
    private height(node: AVLNode): number {
      return node ? node.height : -1;
    }
  
    print() {
      this.inOrderPrint(this.root);
    }
  
    // Left Root Right = Ascending order
    private inOrderPrint(node?: AVLNode) {
      if (!node) return;
  
      this.inOrderPrint(node.left);
      node.print();
      this.inOrderPrint(node.right);
    }
  }
  
  console.log('start');
  
  const atree = new AVLTree();
  // const aValues = [10, 20, 30];
  // const aValues = [30, 20, 10];
  const aValues = [30, 20, 10, 5, 1];
  
  aValues.forEach((value) => {
    atree.insert(value);
  });
  
  atree.print();
  
  console.log('done');
  