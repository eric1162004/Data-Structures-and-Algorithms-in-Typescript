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
    console.log(this.from.getLabel() + '->' + this.to.getLabel());
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

  private getNode(label: string): WNode | null {
    return this.nodes[label];
  }

  private hasNode(label: string): boolean {
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

const wgraph1 = new WGraph();
wgraph1.addNode('A');
wgraph1.addNode('B');
wgraph1.addNode('C');

wgraph1.addEdge('A', 'B', 3);
wgraph1.addEdge('A', 'C', 2);
wgraph1.print();
