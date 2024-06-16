class WNode {
  private label: string;

  constructor(label: string) {
    this.label = label;
  }

  getLabel(): string {
    return this.label;
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

// This is a undirect graph
class WGraph {
  nodes: { [label: string]: WNode } = {}; // {label, node}
  edges: { [label: string]: WEdge[] } = {}; // {node, edges[]}

  addNode(label: string) {
    if (this.hasNode(label)) throw new Error(`Already has node - ${label}`);
    this.nodes[label] = new WNode(label); // add nodes
    this.edges[label] = []; // initize the edges of the node
  }

  addEdge(from: string, to: string, weight: number) {
    let fromNode = this.getNode(from);
    if (!fromNode) throw new Error(`${from} is not in the graph`);

    let toNode = this.getNode(to);
    if (!toNode) throw new Error(`${to} is not in the graph`);

    // both from and to nodes should add this edge
    this.edges[from].push(new WEdge(fromNode, toNode, weight));
    this.edges[to].push(new WEdge(toNode, fromNode, weight));
  }

  private getNode(label: string): WNode | null {
    return this.nodes[label];
  }

  private hasNode(label: string): boolean {
    return !!this.nodes[label];
  }

  print() {
    console.log("---");
    Object.keys(this.edges).forEach((label) => {
      this.edges[label].forEach((edge) => {
        edge.print();
      });
      console.log("---");
    });
  }
}

const wgraph1 = new WGraph();
wgraph1.addNode('A');
wgraph1.addNode('B');
wgraph1.addNode('C');

wgraph1.addEdge('A', 'B', 3);
wgraph1.addEdge('A', 'C', 2);
wgraph1.print();
