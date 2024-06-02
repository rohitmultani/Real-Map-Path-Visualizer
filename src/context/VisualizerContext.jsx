import React, { createContext, useContext, useReducer } from "react";
import nodes from "../../Data/Agra/nodes.json"
import edges from "../../Data/Agra/edges.json"
const VisualizerContext = createContext();
const getPositionFromNodeId = (nodeId) => {
  const node = nodes.find((n) => n.id === nodeId);
  return node ? [node.lat, node.lon] : null;
};
const initialState = {
  algorithm: "Dijkstra",
  city: "Agra",
  startPoint: getPositionFromNodeId(nodes[20].id),
  endPoint: getPositionFromNodeId(nodes[200].id),
  visualizing: false,
  clearBoard: false,
  nodeVisited: 0,
  shortestNodes: 0,
  darkMode: true,
  nodesData : nodes,
  edgesData : edges,
  mapCenter : [nodes[0].lat,nodes[0].lon]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ALGORITHM":
      return { ...state, algorithm: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_START_POINT":
      return { ...state, startPoint: action.payload };
    case "SET_END_POINT":
      return { ...state, endPoint: action.payload };
    case "SET_VISUALIZING":
      return { ...state, visualizing: action.payload };
    case "SET_CLEAR_BOARD":
      return { ...state, clearBoard: action.payload };
    case "SET_NODE_VISITED":
      return { ...state, nodeVisited: action.payload };
    case "SET_SHORTEST_NODES":
      return { ...state, shortestNodes: action.payload };
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };
    case "SET_NODES":
      return { ...state, nodesData: action.payload };
    case "SET_EDGES":
      return { ...state, edgesData: action.payload };
      case "SET_CENTER":
      return { ...state, mapCenter: action.payload };
    default:
      return state;
  }
};

export const useVisualizerContext = () => useContext(VisualizerContext);

export const VisualizerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    setAlgorithm: (payload) => dispatch({ type: "SET_ALGORITHM", payload }),
    setCity: (payload) => dispatch({ type: "SET_CITY", payload }),
    setStartPoint: (payload) => dispatch({ type: "SET_START_POINT", payload }),
    setEndPoint: (payload) => dispatch({ type: "SET_END_POINT", payload }),
    setVisualizing: (payload) => dispatch({ type: "SET_VISUALIZING", payload }),
    setClearBoard: (payload) => dispatch({ type: "SET_CLEAR_BOARD", payload }),
    setDarkMode: (payload) => dispatch({ type: "SET_DARK_MODE", payload }),
    setNodes: (payload) => dispatch({ type: "SET_NODES", payload }),
    setEdges: (payload) => dispatch({ type: "SET_EDGES", payload }),
    setNodeVisited: (payload) =>
      dispatch({ type: "SET_NODE_VISITED", payload }),
    setShortestNodes: (payload) =>
      dispatch({ type: "SET_SHORTEST_NODES", payload }),
    setMapCenter: (payload) => dispatch({ type: "SET_CENTER", payload }),
  };

  return (
    <VisualizerContext.Provider value={value}>
      {children}
    </VisualizerContext.Provider>
  );
};
