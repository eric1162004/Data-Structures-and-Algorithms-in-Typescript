class WNode {
  private label: string;
  private edges: WEdge[] = [];

  constructor(label: string) {
    this.label = label;
  }

  getLabel(): string {
    return this.label;
  }

  addEdge(to: WNode, weight: number) {
    this.edges.push(new WEdge(this, to, weight));
  }

  getNeighbor(): WEdge[] {
    return this.edges;
  }
}

class WEdge {
  from: WNode;
  to: WNode;
  weight: number;

  constructor(from: WNode, to: WNode, weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

  print() {
    console.log(this.from.getLabel() + '->' + this.to.getLabel());
  }
}

class WNodeEntry {
  node: WNode;
  prioirty: number;

  constructor(node: WNode, prioirty: number) {
    this.node = node;
    this.prioirty = prioirty;
  }
}

class PriorityQueue<T extends WNodeEntry> {
  private heap: T[] = [];

  public enqueue(node: T): void {
    this.heap.push(node);
    this.siftUp(this.heap.length - 1);
  }

  public dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const root = this.heap.shift()!;
    if (this.heap.length > 0) {
      this.siftDown(0);
    }
    return root;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChildIndex(index: number): number {
    return index * 2 + 1;
  }

  private rightChildIndex(index: number): number {
    return index * 2 + 2;
  }

  private siftUp(index: number): void {
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = this.parentIndex(currentIndex);
      if (this.heap[currentIndex].prioirty < this.heap[parentIndex].prioirty) {
        this.swap(currentIndex, parentIndex);
      } else {
        break;
      }
      currentIndex = parentIndex;
    }
  }

  private siftDown(index: number): void {
    let currentIndex = index;
    const length = this.heap.length;
    while (currentIndex < length) {
      let swapIndex = currentIndex;
      const leftChildIndex = this.leftChildIndex(currentIndex);
      if (leftChildIndex < length && this.heap[leftChildIndex].prioirty < this.heap[swapIndex].prioirty) {
        swapIndex = leftChildIndex;
      }
      const rightChildIndex = this.rightChildIndex(currentIndex);
      if (rightChildIndex < length && this.heap[rightChildIndex].prioirty < this.heap[swapIndex].prioirty) {
        swapIndex = rightChildIndex;
      }
      if (swapIndex !== currentIndex) {
        this.swap(currentIndex, swapIndex);
        currentIndex = swapIndex;
      } else {
        break;
      }
    }
  }

  private swap(index1: number, index2: number): void {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }
}

class Path {
  private nodes: string[] = [];

  add(node: string) {
    this.nodes.push(node);
  }

  print(){
    console.log(this.nodes);
    
  }
}

// This is a undirect graph
class WGraph {
  nodes: { [label: string]: WNode } = {}; // {label, node}

  addNode(label: string) {
    if (this.hasNode(label)) throw new Error(`Already has node - ${label}`);
    this.nodes[label] = new WNode(label); // add nodes
  }

  addEdge(from: string, to: string, weight: number) {
    let fromNode = this.getNode(from);
    if (!fromNode) throw new Error(`${from} is not in the graph`);

    let toNode = this.getNode(to);
    if (!toNode) throw new Error(`${to} is not in the graph`);

    // add edge in both nodes
    fromNode.addEdge(toNode, weight);
    toNode.addEdge(fromNode, weight);
  }

  // BFS
  // when done visiting a node, go to the close neighbor
  // use priority queue

  getShortestPath(from: string, to: string): Path {
    // valdate nodes
    const fromNode = this.getNode(from); 
    if(!fromNode) throw new Error(`${from} does not exist.`);
    const toNode = this.getNode(to);
    if(!toNode) throw new Error(`${to} does not exist.`);

    // set up the distance table, value record the shortest 'from-to' distance
    const distances: { [label: string]: number } = {};
    // initially, all distance is assume to be Infinity,
    // except the starting node
    for (const node of this.getNodes()) {
      distances[node.getLabel()] = Infinity;
    }
    distances[from] = 0;

    const previousNodes: { [label: string]: WNode|null } = {[from]: null};
    const visitedNodes = new Set<WNode>();


    const queue = new PriorityQueue(); // breadth first traversal
    queue.enqueue(new WNodeEntry(fromNode, 0));

    while (!queue.isEmpty()) {
      let current = queue.dequeue().node;
      visitedNodes.add(current);

      // current -> neighbor -> to
      for (const neighbor of current.getNeighbor()) {
        if (visitedNodes.has(neighbor.to)) continue;

        const currentLabel = current.getLabel();
        var newDistance = distances[currentLabel] + neighbor.weight;

        if (newDistance < distances[neighbor.to.getLabel()]) {
          //update distance
          distances[neighbor.to.getLabel()] = newDistance;
          previousNodes[neighbor.to.getLabel()] = current;
          queue.enqueue(new WNodeEntry(neighbor.to, newDistance));
        }
      }
    }

    return this.buildPath(previousNodes, toNode);
  }

  private buildPath(
    previousNodes: { [label: string]: WNode },
    toNode: WNode
  ): Path {

    const stack: WNode[] = [];
    stack.push(toNode);

    let previous = previousNodes[toNode.getLabel()];
    while (previous) {
      stack.push(previous);
      previous = previousNodes[previous.getLabel()];
    }

    var path = new Path();
    while (stack.length > 0) {
      path.add(stack.pop().getLabel());
    }

    return path;
  }

  private getNodes(): WNode[] {
    return Object.values(this.nodes);
  }

  private getNode(label: string): WNode | null {
    return this.nodes[label];
  }

  private hasNode(label: string): boolean {
    return !!this.nodes[label];
  }

  print() {
    console.log('---');
    Object.values(this.nodes).forEach((node) => {
      node.getNeighbor().forEach((edge) => {
        edge.print();
      });
      console.log('---');
    });
  }
}

const wgraph1 = new WGraph();
wgraph1.addNode('A');
wgraph1.addNode('B');
wgraph1.addNode('C');

wgraph1.addEdge('A', 'B', 1);
wgraph1.addEdge('B', 'C', 2);
wgraph1.addEdge('A', 'C', 10);
// wgraph1.print();

const path = wgraph1.getShortestPath("A", "C");
path.print();

// const path1 = wgraph1.getShortestPath("A", "K");

