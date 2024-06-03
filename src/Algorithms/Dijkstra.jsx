class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  enqueue(priority, key) {
    this.nodes.push({ key, priority });
    this.sort();
  }

  dequeue() {
    return this.nodes.shift();
  }

  sort() {
    this.nodes.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return !this.nodes.length;
  }
}


export const findShortestPathWithAnimation = (graph, start, end, speed) => {
  let distances = {};
  let prev = {};
  let pq = new PriorityQueue();
  let visitedNodes = []; // To keep track of visited nodes

  // Initialize distances and priority queue
  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    prev[node] = null;
  });

  distances[start] = 0;
  pq.enqueue(0, start);
  let i = 0; // Counter for animation timing
let d = 0;
  while (!pq.isEmpty()) {
    let currentNode = pq.dequeue();
    // visitedNodes.push(parseInt(currentNode.key)); // Record the visited node

    // Animate visiting the node

    if (parseInt(currentNode.key) === end) {
      let path = [];
      let curr = end;
      while (curr) {
        path.push(curr);
        curr = prev[curr];
      }
      const shortDist = distances[end];
      return { path: path.reverse(), visitedNodes,shortDist,d}; // Return both path and visited nodes
    }

    if (!graph[currentNode.key]) continue;

    for (let neighbor in graph[currentNode.key]) {
      let alt = currentNode.priority + graph[currentNode.key][neighbor];
      if (alt < distances[neighbor]) {
        d+=graph[currentNode.key][neighbor];
        visitedNodes.push([parseInt(currentNode.key),parseInt(neighbor)])
        distances[neighbor] = alt;
        prev[neighbor] = parseInt(currentNode.key);
        pq.enqueue(alt, neighbor);
      }
    }
  }

  return { path: [], visitedNodes ,shortDist:0, d:0};
};


