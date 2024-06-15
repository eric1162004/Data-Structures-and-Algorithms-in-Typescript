/*
Completed Tree: 
every level is filled up from left to right without gap.

Max-Heap Property:
every parent node must be greater than 
all of its children's values.

Heap:
Sorting
Graph algorithm
Priority queues
Finding the Kth smallest/largest value

Insertion at the end and bubble up
Deletion from the top, replace the top node with the last node,
and the bubble down (swap with the greater child)

leftIndex = index * 2 + 1
rightIndex =  index * 2 + 1 
parentIndex = (index - 1) / 2
*/

class Heap {
    private numbers: number[] = [];
  
    insert(number: number) {
      this.numbers.push(number);
      this.bubbleUp();
    }
  
    remove(): number | null {
      let count = this.numbers.length;
  
      if (!count) return null;
      if (count === 1) return this.numbers.pop();
  
      // copy top to temp
      let temp = this.numbers[0];
  
      // replace the last item to the top
      this.numbers[0] = this.numbers.pop();
  
      this.bubbleDown();
  
      return temp;
    }
    
    private bubbleDown(){
      let index = 0;
    
      while (this.isValidParent(index)) {
        let childIndex = this.getLargerChildIndex(index);
        this.swap(childIndex, index);
        index = childIndex;
      }
    }
  
    // A valid parent has at least one child.
    // A parent's value is less than either one of the child's!
    private isValidParent(index: number): boolean {
  
      // if there is no left child, the parent has no right child.
      if (!this.hasLeftChild(index)) return false;
  
      if (!this.hasRightChild(index))
        return this.numbers[index] <= this.leftChild(index);
  
      return (
        this.numbers[index] <= this.leftChild(index) ||
        this.numbers[index] <= this.rightChild(index)
      );
    }
  
    private getLargerChildIndex(index: number): number {
      if (!this.hasRightChild(index)) return this.getLeftIndex(index);
  
      return this.leftChild(index) > this.rightChild(index)
        ? this.getLeftIndex(index)
        : this.getRightIndex(index);
    }
  
    private hasLeftChild(index: number): boolean {
      return this.getLeftIndex(index) < this.numbers.length;
    }
  
    private hasRightChild(index: number): boolean {
      return this.getRightIndex(index) < this.numbers.length;
    }
  
    private leftChild(index: number): number {
      return this.numbers[this.getLeftIndex(index)];
    }
  
    private rightChild(index: number): number {
      return this.numbers[this.getRightIndex(index)];
    }
  
    private bubbleUp() {
      let currentIndex = this.numbers.length - 1;
      let parentIndex = this.getParentIndex(currentIndex);
  
      // while current > parent => swap
      while (
        currentIndex > 0 && // has parent
        this.isGreaterThan(currentIndex, parentIndex)
      ) {
        this.swap(currentIndex, parentIndex);
        // move up a position
        currentIndex = parentIndex;
        parentIndex = this.getParentIndex(currentIndex);
      }
    }
  
    private getLeftIndex(index: number): number {
      return Math.floor(index * 2 + 1);
    }
  
    private getRightIndex(index: number): number {
      return Math.floor(index * 2 + 2);
    }
  
    private getParentIndex(index: number): number {
      return Math.floor((index - 1) / 2);
    }
  
    private isGreaterThan(index_a: number, index_b: number) {
      return this.numbers[index_a] > this.numbers[index_b];
    }
  
    private swap(index_a: number, index_b: number) {
      let temp = this.numbers[index_a];
      this.numbers[index_a] = this.numbers[index_b];
      this.numbers[index_b] = temp;
    }
  
    printNumbers() {
      this.numbers.forEach((number, index) => {
        console.log(this.numbers[index], index);
      });
    }
  
    public isEmpty(): boolean {
      return !this.numbers.length;
    }
  }
  
  const heap = new Heap();
  
  for (let i = 1; i <= 20; i++) {
    heap.insert(i);
  }
  
  for (let i = 1; i <= 20; i++) {
    let t = heap.remove();
    console.log(t);
  }
  
  console.log(heap.isEmpty());
  
  