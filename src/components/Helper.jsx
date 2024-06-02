import { haversineDistance } from './haversine.jsx';

export const createGraph = (nodes, edges) => {
    const graph = {};
    const nodeMap = new Map(nodes.map(node => [node.id, node]));

    nodes.forEach(node => {
        graph[node.id] = {};
    });

    edges.forEach(edge => {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);
        if (sourceNode && targetNode) {
            const distance = haversineDistance(sourceNode.lat, sourceNode.lon, targetNode.lat, targetNode.lon);
            graph[edge.source][edge.target] = distance;
            graph[edge.target][edge.source] = distance; // if the graph is undirected
        } else {
            console.error(`Edge source or target not found in nodes: ${edge.source}, ${edge.target}`);
        }
    });
    return graph;
};

export const findNearestNode = (pos,nodesData) => {
    let nearestNode = null;
    let minDist = Infinity;
    nodesData.forEach((node) => {
      const dist = Math.sqrt(
        Math.pow(node.lat - pos.lat, 2) + Math.pow(node.lon - pos.lng, 2)
      );
      if (dist < minDist) {
        minDist = dist;
        nearestNode = node;
      }
    });
    return nearestNode;
  };

  export const getPositionFromNodeId = (nodeId,nodesData) => {
    const node = nodesData.find((n) => n.id === nodeId);
    return node ? [node.lat, node.lon] : null;
  };
 export const getNodeIdfromPostion = (pos,nodesData) => {
    console.log(pos);
    const node = nodesData.find((n) => n.lat === pos[0] && n.lon === pos[1]);
    return node ? node.id : null;
  };