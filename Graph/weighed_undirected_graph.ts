class WNode {
    label: string;
    private edges: WEdge[] = [];
  
    constructor(label: string) {
      this.label = label;
    }
  
    addEdge(to: WNode, weight: number) {
      this.edges.push(new WEdge(this, to, weight));
    }
  
    getEdges(): WEdge[] {
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
      console.log(this.from.label + '->' + this.to.label);
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
  
  // NOTE: Lower the value, Higher the Priority
  // Highest Priority get removed first.
  // ie. if A.weight = 1 and B.weight = 10, A has higher priority
  class PriorityQueue<T> {
    private heap: T[] = [];
  
    private basedOnAttribute: string;
  
    // pass the attribute that the priority is based on
    constructor(basedOnAttribute: string) {
      this.basedOnAttribute = basedOnAttribute;
    }
  
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
        if (
          this.heap[currentIndex][this.basedOnAttribute] <
          this.heap[parentIndex][this.basedOnAttribute]
        ) {
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
        if (
          leftChildIndex < length &&
          this.heap[leftChildIndex][this.basedOnAttribute] <
            this.heap[swapIndex][this.basedOnAttribute]
        ) {
          swapIndex = leftChildIndex;
        }
        const rightChildIndex = this.rightChildIndex(currentIndex);
        if (
          rightChildIndex < length &&
          this.heap[rightChildIndex][this.basedOnAttribute] <
            this.heap[swapIndex][this.basedOnAttribute]
        ) {
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
  
    print() {
      console.log(this.nodes);
    }
  }
  
  // This is a undirect graph
  class WGraph {
    nodes: { [label: string]: WNode } = {}; 
  
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
      if (!fromNode) throw new Error(`${from} does not exist.`);
      const toNode = this.getNode(to);
      if (!toNode) throw new Error(`${to} does not exist.`);
  
      // set up the distance table, value record the shortest 'from-to' distance
      const distances: { [label: string]: number } = {};
  
      for (const node of this.getNodes()) {
        distances[node.label] = Infinity; // initially, all distance is assume to be Infinity,
      }
      distances[from] = 0; // except the starting node
  
      const previousNodes: { [label: string]: WNode | null } = { [from]: null };
      const visitedNodes = new Set<WNode>();
  
      const queue = new PriorityQueue<WNodeEntry>('prioirty'); // breadth first traversal
      queue.enqueue(new WNodeEntry(fromNode, 0));
  
      while (!queue.isEmpty()) {
        let current = queue.dequeue().node;
        visitedNodes.add(current);
  
        // current -> neighbor -> to
        for (const neighbor of current.getEdges()) {
          if (visitedNodes.has(neighbor.to)) continue;
  
          const currentLabel = current.label;
          var newDistance = distances[currentLabel] + neighbor.weight;
  
          if (newDistance < distances[neighbor.to.label]) {
            //update distance
            distances[neighbor.to.label] = newDistance;
            previousNodes[neighbor.to.label] = current;
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
  
      let previous = previousNodes[toNode.label];
      while (previous) {
        stack.push(previous);
        previous = previousNodes[previous.label];
      }
  
      var path = new Path();
      while (stack.length > 0) {
        path.add(stack.pop().label);
      }
  
      return path;
    }
  
    hasCycle(): boolean {
      const visited = new Set<WNode>();
      const nodes = this.getNodes();
  
      for (const node of nodes) {
        if (!visited.has(node) && this._hasCycle(node, null, visited))
          return true;
      }
  
      return false;
    }
  
    private _hasCycle(node: WNode, parent: WNode, visited: Set<WNode>): boolean {
      if (visited.has(node)) return false;
  
      visited.add(node);
  
      for (const edge of node.getEdges()) {
        if (edge.to === parent) continue;
        if (visited.has(edge.to) || this._hasCycle(edge.to, node, visited))
          return true;
      }
  
      return false;
    }
  
    getMinSpinningTree(): WGraph {
      const minTree = new WGraph();
  
      const edges = new PriorityQueue<WEdge>('weight');
      const nodes = this.getNodes();
  
      if (nodes.length === 0) return minTree;
  
      let startNode = nodes.at(0);
      let startNodeEdges = startNode.getEdges();
      minTree.addNode(startNode.label);
  
      if(edges.isEmpty()) return minTree;
  
      while (startNodeEdges.length > 0) {
        let edge = startNodeEdges.shift();
        edges.enqueue(edge);
      }
  
      while (Object.keys(minTree.nodes).length < Object.keys(nodes).length) {
        const minEdge = edges.dequeue();
        const nextNode = minEdge.to;
  
        // ignore node that is already added in the tree
        if (minTree.hasNode(nextNode.label)) continue;
  
        // we know this node has the min edge
        // add it into the tree
        minTree.addNode(nextNode.label);
        minTree.addEdge(minEdge.from.label, nextNode.label, minEdge.weight);
  
        // add all edges that is connected to the nextNode
        for (const edge of nextNode.getEdges()) {
          if (!minTree.hasNode(edge.to.label)) {
            edges.enqueue(edge);
          }
        }
      }
  
      return minTree;
    }
  
    private getNodes(): WNode[] {
      return Object.values(this.nodes);
    }
  
    private getNode(label: string): WNode | null {
      return this.nodes[label];
    }
  
    hasNode(label: string): boolean {
      return !!this.nodes[label];
    }
  
    print() {
      console.log('---');
      Object.values(this.nodes).forEach((node) => {
        node.getEdges().forEach((edge) => {
          edge.print();
        });
        console.log('---');
      });
    }
  }
  
  // const wgraph1 = new WGraph();
  // wgraph1.addNode('A');
  // wgraph1.addNode('B');
  // wgraph1.addNode('C');
  // wgraph1.addNode('D');
  
  // wgraph1.addEdge('A', 'B', 1);
  // wgraph1.addEdge('B', 'C', 20);
  // wgraph1.addEdge('A', 'C', 1);
  // // wgraph1.print();
  
  // const path = wgraph1.getShortestPath('A', 'C');
  // path.print();
  
  // const path1 = wgraph1.getShortestPath("A", "K");
  
  // console.log(wgraph1.hasCycle());
  
  // -- Testing Prim's --
  const wgraph1 = new WGraph();
  
  // wgraph1.addNode('A');
  // wgraph1.addNode('B');
  // wgraph1.addNode('C');
  // wgraph1.addNode('D');
  
  // wgraph1.addEdge('A', 'B', 3);
  // wgraph1.addEdge('B', 'D', 4);
  // wgraph1.addEdge('C', 'D', 5);
  // wgraph1.addEdge('A', 'C', 1);
  // wgraph1.addEdge('B', 'C', 2);
  
  const mintree = wgraph1.getMinSpinningTree();
  mintree.print();
  