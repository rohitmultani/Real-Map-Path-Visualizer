export const dfs = (graph, start, end) => {
    let stack = [start];
    let distances = {};
    let prev = {};
    let visitedNodes = [];
    let d = 0;
    Object.keys(graph).forEach(node => {
      distances[node] = Infinity;
      prev[node] = null;
    });
  
    distances[start] = 0;
  
    while (stack.length > 0) {
      let currentNode = stack.pop();
      
  
      if (parseInt(currentNode) === end) {
        let path = [];
        let curr = end;
        while (curr) {
          path.push(curr);
          curr = prev[curr];
        }
        return { path: path.reverse(), visitedNodes, shortDist: distances[end],d };
      }
  
      for (let neighbor in graph[currentNode]) {
        if (distances[neighbor] === Infinity) {
          visitedNodes.push([parseInt(currentNode),parseInt(neighbor)])
          distances[neighbor] = distances[currentNode] + 1;
          prev[neighbor] = parseInt(currentNode);
          stack.push(neighbor);
          d++;
        }
      }
    }
  
    return { path: [], visitedNodes, shortDist: 0,d:0 };
  };
  