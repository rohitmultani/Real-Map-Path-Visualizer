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
  
  const heuristic = (a, b) => {
    // Example heuristic: Euclidean distance
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  };
  
  export const AStarSearch = (graph, start, end, speed) => {
    let distances = {};
    let prev = {};
    let pq = new PriorityQueue();
    let visitedNodes = []; // To keep track of visited nodes
    let d=0;
    Object.keys(graph).forEach(node => {
      distances[node] = Infinity;
      prev[node] = null;
    });
  
    distances[start] = 0;
    pq.enqueue(0, start);
  
    while (!pq.isEmpty()) {
      let currentNode = pq.dequeue();
  
      if (parseInt(currentNode.key) === end) {
        let path = [];
        let curr = end;
        while (curr) {
          path.push(curr);
          curr = prev[curr];
        }
        const shortDist = distances[end];
        return { path: path.reverse(), visitedNodes, shortDist,d};
      }
  
      if (!graph[currentNode.key]) continue;
  
      for (let neighbor in graph[currentNode.key]) {
        let alt = distances[currentNode.key] + graph[currentNode.key][neighbor];
        if (alt < distances[neighbor]) {
          d+=graph[currentNode.key][neighbor];
          visitedNodes.push([parseInt(currentNode.key),parseInt(neighbor)])
          distances[neighbor] = alt;
          prev[neighbor] = parseInt(currentNode.key);
          pq.enqueue(alt + heuristic(graph[neighbor], graph[end]), neighbor);
        }
      }
    }
  
    return { path: [], visitedNodes, shortDist: 0 ,d:0};
  };
  