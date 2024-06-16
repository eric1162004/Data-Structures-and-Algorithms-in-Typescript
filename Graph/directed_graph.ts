/*
Graph

Adjacent = two vertices are connected

Following on Social media uses direct graph
Connection can have weights

Option 1 - Adjacency Matrix for Dense Graph:
space = O(V^2), V is the number of vertices
add or remove vertrice are O(V^2)
add or remove edge O(1), basically set the entry to 0
findNeighbors is O(V), depends on the total number of vertics

Option 2 - Adjacency List for average use case:
space = O(V + E), 
for a Dense Graph, every node is connected to all other nodes, E = V * (V - 1) ~ V^2
add node = O(1), simply add a node to the list
remove node = O(V + E), First remove the node for the list, Second ensure the rest of the nodes is not connected to it
add edge = O(K) or O(V), go to the node, loop over the edge to ensure the edge is not already added
remove edge = O(K) or O(V), find the edge and remove
find neightboer = O(K) or O(V)
NOTE: K is the neighbors of a given node


*/
let GNODE_KEY_COUNT = 0;
function generateKey() {
  GNODE_KEY_COUNT++;
  return `key-${GNODE_KEY_COUNT}-${Date.now()}`;
}

class GNode {
  label: string;
  id: string;

  constructor(label: string) {
    this.label = label;
    this.id = generateKey();
  }
}

// This is a uni-directed graph
class Graph {
  nodes: { [label: string]: GNode } = {};
  edges: { [id: string]: GNode[] } = {};

  addNode(label: string) {
    if (this.hasNode(label)) throw new Error('Node already exists.');
    this.nodes[label] = new GNode(label);
    this.edges[this.nodes[label].id] = [];
  }

  removeNode(label: string) {
    const node = this.getNode(label);
    if (!node) return;

    Object.values(this.edges).forEach((edgeList) => {
      const index = edgeList.indexOf(node);
      edgeList.splice(index, 1);
    });

    this.removeNodeFromEdges(node);
    delete this.nodes[node.label];
  }

  addEdge(from: string, to: string) {
    const fromNode = this.getNode(from);
    if (!fromNode) throw new Error(`Node - ${from} does not exist.`);

    const toNode = this.getNode(to);
    if (!toNode) throw new Error(`Node - ${from} does not exist.`);

    this.edges[fromNode.id].push(toNode);
  }

  removeEdge(from: string, to: string) {
    const fromNode = this.getNode(from);
    const toNode = this.getNode(to);

    if (!fromNode || !toNode) return;
    this.removeNodeFromEdges(fromNode);
  }

  // Depth First
  dfsRecursiveTraverse(start: string) {
    if (!this.getNode(start)) return; // guard for invalid node

    const visited = new Set<string>();
    this._dfsRecursiveTraverse(this.getNode(start), visited);
  }

  private _dfsRecursiveTraverse(node: GNode, visited: Set<string>) {
    // base case: if node in visited, done
    if (visited.has(node.label)) return;

    // visit the node - print it!
    console.log(node.label);
    // add note to visited
    visited.add(node.label);

    // recursively visit each neighbor
    for (const neighbor of this.getNeighbors(node)) {
      if (!visited.has(neighbor.label))
        this._dfsRecursiveTraverse(neighbor, visited);
    }
  }

  // Client picks which node to start
  dfsIterativeTraverse(start: string) {
    let node = this.getNode(start);
    if (!node) return; // guard for invalid node

    const visited = new Set<GNode>();

    const stack: GNode[] = []; 
    stack.push(node);

    while (stack.length > 0) { // if stack is empty, no more node to recurse, done!
      node = stack.pop();

      if (visited.has(node)) continue;

      console.log(node.label);
      visited.add(node);

      this.getNeighbors(node).forEach((neigtbor) => {
        if (!visited.has(neigtbor)) stack.push(neigtbor); // add all unvisited children into stack
      });
    }
  }

  bfsIterativeTraverse(start: string) {
    let node = this.getNode(start);
    if (!node) return; // guard for invalid node

    const visited = new Set<GNode>();

    const queue: GNode[] = []; // use queue instead
    queue.push(node);

    while (queue.length > 0) {
      node = queue.shift();

      if (visited.has(node)) continue;

      console.log(node.label);
      visited.add(node);

      this.getNeighbors(node).forEach((neigtbor) => {
        if (!visited.has(neigtbor)) queue.push(neigtbor);
      });
    }
  }

  // Topological sort does not produce unique result
  // DOES NOT work on cyclic graph
  topologicalSort(): GNode[] {
    // A stack to store the nodes in topological (reverse) order
    // ie, if A -> B, B will be at the bottom of the stack
    const stack: GNode[] = [];
    const visited = new Set<GNode>();

    // start from anywhere in the graph
    // this loop ensure all loop are visit at least once
    for (const node of this.getNodes())
      this._topologicalSort(node, visited, stack);

    // reordering
    const sorted = [];
    while (stack.length > 0) {
      sorted.push(stack.pop().label); 
    }

    return sorted;
  }

  private _topologicalSort(node: GNode, visited: Set<GNode>, stack: GNode[]) {
    if (visited.has(node)) return;

    visited.add(node);

    for (const neighbor of this.getNeighbors(node)) { 
      // iterate each edge
      this._topologicalSort(neighbor, visited, stack);
      //  reach to the child that has no outgoing edges
    }

    // all neighbors of a node have been visited
    stack.push(node);
  }

  // Cycle Detection
  hasCycle(): boolean {
    const all = new Set<GNode>([...this.getNodes()]); // convert array to a set
    if (all.size === 0) return; // no nodes in the graph

    const visiting = new Set<GNode>();
    const visited = new Set<GNode>();

    while (all.size > 0) {
      const current: GNode = all.values().next().value; // get a node in 'all'
      if (this._hasCycle(current, all, visiting, visited)) return true;
    }

    return false;
  }

  private _hasCycle(
    node: GNode,
    all: Set<GNode>,
    visiting: Set<GNode>,
    visited: Set<GNode>
  ): boolean {

    // move from all to visiting
    all.delete(node);
    visiting.add(node);

    for (const neighbor of this.getNeighbors(node)) {
      if (visited.has(neighbor)) continue; // skip visited node

      if (visiting.has(neighbor)) return true; // cycle detected!

      if (this._hasCycle(neighbor, all, visiting, visited)) return true; // cycle detected from downstream
    }

    // when all children have been visit, 
    // move parent from visiting to visited
    visiting.delete(node);
    visited.add(node);

    return false;
  }

  private getNodes(): GNode[] {
    return Object.values(this.nodes);
  }

  private getNeighbors(node): GNode[]{
    return this.edges[node.id];
  }

  private getNode(label): GNode | null {
    return this.nodes[label];
  }

  private removeNodeFromEdges(node: GNode) {
    const neighbors = this.getNeighbors(node);
    const index = neighbors.indexOf(node);
    neighbors.splice(index, 1);
  }

  private hasNode(label: string): boolean {
    return !!this.nodes[label];
  }

  print() {
    this.getNodes().forEach((node) => {
      let text = '';

      this.getNeighbors(node)?.forEach((edge) => {
        text += edge.label + ' ';
      });

      console.log(
        node.label,
        text ? 'is connecting to ' + text : 'is not connecting to anything'
      );
    });
  }
}

// const graph = new Graph();
// graph.addNode('A');
// graph.addNode('B');
// graph.addNode('C');
// graph.addNode('D');
// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('B', 'D');
// graph.addEdge('D', 'C');
// graph.print();

// graph.dfsRecursiveTraverse('A');
// graph.dfsIterativeTraverse('A');
// graph.bfsIterativeTraverse('A');

// const graph2 = new Graph();
// graph2.addNode('A');
// graph2.addNode('B');
// graph2.addNode('X');
// graph2.addNode('P');

// graph2.addEdge('X', 'A');
// graph2.addEdge('X', 'B');
// graph2.addEdge('A', 'P');
// graph2.addEdge('B', 'P');

// const sorted = graph2.topologicalSort();
// console.log(sorted);

// const graph3 = new Graph();
// graph3.addNode('A');
// graph3.addNode('B');
// graph3.addNode('C');
// graph3.addEdge('A', 'B');
// graph3.addEdge('B', 'C');
// graph3.addEdge('A', 'C');
// graph3.print();
// console.log(graph3.hasCycle());
