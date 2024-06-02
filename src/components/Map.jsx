import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  ZoomControl
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { useVisualizerContext } from "../context/VisualizerContext";
import AnimatedPolyline from "./AnimatedPolyline.jsx";
import { findShortestPathWithAnimation } from "../Algorithms/Dijkstra.jsx";
import { AStarSearch } from "../Algorithms/AStar.jsx";
import { bfs } from "../Algorithms/BFS.jsx";
import { dfs } from "../Algorithms/DFS.jsx";
import { createGraph, getNodeIdfromPostion, getPositionFromNodeId, findNearestNode } from "./Helper.jsx";
import NavBar from "./NavBar";

const Map = () => {
  const {
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
    algorithm,
    visualizing,
    clearBoard,
    setShortestNodes,
    setNodeVisited,
    darkMode,
    nodesData,
    edgesData,
    mapCenter,
  } = useVisualizerContext();

  const [pathPositions, setPathPositions] = useState([]);
  const [visitedPositions, setVisitedPositions] = useState([]);
  const [visitedAnimationComplete, setVisitedAnimationComplete] = useState(false);

  const startMarkerRef = useRef(startPoint);
  const endMarkerRef = useRef(endPoint);

  useEffect(() => {
    const graph = createGraph(nodesData, edgesData);
    setVisitedAnimationComplete(false);

    const nodeIdStart = getNodeIdfromPostion(startPoint, nodesData);
    const nodeIdEnd = getNodeIdfromPostion(endPoint, nodesData);
    let result;

    switch (algorithm) {
      case "Dijkstra":
        result = findShortestPathWithAnimation(graph, nodeIdStart, nodeIdEnd, 1);
        break;
      case "A*":
        result = AStarSearch(graph, nodeIdStart, nodeIdEnd, 1);
        break;
      case "BFS":
        result = bfs(graph, nodeIdStart, nodeIdEnd);
        break;
      case "DFS":
        result = dfs(graph, nodeIdStart, nodeIdEnd);
        break;
      default:
        console.error("Unknown algorithm:", algorithm);
        return;
    }

    const { path, visitedNodes, shortDist, d } = result;
    setNodeVisited(d.toFixed(2));
    setShortestNodes(shortDist.toFixed(2));

    if (path.length > 0) {
      const pathPositions = path.map((nodeId) => getPositionFromNodeId(nodeId, nodesData)).filter((pos) => pos !== null);
      setPathPositions(pathPositions);
    } else {
      window.alert("Path not Found");
    }

    if (visitedNodes.length > 0) {
      const visitedPositions = visitedNodes
        .map(([parent, child]) => [getPositionFromNodeId(parent, nodesData), getPositionFromNodeId(child, nodesData)])
        .filter((pair) => pair[0] !== null && pair[1] !== null);
      setVisitedPositions(visitedPositions);
    }
  }, [visualizing]);

  useEffect(() => {
    setVisitedPositions([]);
    setPathPositions([]);
    setShortestNodes(0);
    setNodeVisited(0);
  }, [clearBoard]);

  function FlyMapTo() {
    const map = useMap();

    useEffect(() => {
      map.flyTo(mapCenter);
    }, [mapCenter]);

    return null;
  }

  const handleMarkerDragEnd = (markerRef, setPoint) => {
    const marker = markerRef.current;
    if (marker != null) {
      const newPosition = marker.getLatLng();
      const nearestNode = findNearestNode(newPosition, nodesData);
      if (nearestNode) {
        setPoint([nearestNode.lat, nearestNode.lon]);
        marker.setLatLng([nearestNode.lat, nearestNode.lon]);
      }
    }
  };

  const startEventHandlers = useMemo(
    () => ({
      dragend() {
        handleMarkerDragEnd(startMarkerRef, setStartPoint);
      },
    }),
    [nodesData]
  );

  const endEventHandlers = useMemo(
    () => ({
      dragend() {
        handleMarkerDragEnd(endMarkerRef, setEndPoint);
      },
    }),
    [nodesData]
  );

  return (
    <>
      <MapContainer center={mapCenter} zoom={15} className="w-full h-screen" zoomControl={false}>
        <FlyMapTo />
        <NavBar />
        <TileLayer
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker draggable={true} eventHandlers={startEventHandlers} position={startPoint} ref={startMarkerRef} icon={new Icon({iconUrl: markerIconPng,iconAnchor : [10, 35],popupAnchor : [3, 3]})}>
          <Popup>
            <p>Latitude : {startPoint[0]}</p>
            <p>Longitude : {startPoint[1]}</p>
          </Popup>
        </Marker>
        <Marker draggable={true} eventHandlers={endEventHandlers} position={endPoint} ref={endMarkerRef} icon={new Icon({iconUrl: markerIconPng,iconAnchor : [10, 35],popupAnchor : [3, 3]})}>
          <Popup>
            <p>Latitude : {endPoint[0]}</p>
            <p>Longitude : {endPoint[1]}</p>
          </Popup>
        </Marker>
        {visitedPositions.length > 0 && (
          <AnimatedPolyline
            positions={visitedPositions}
            color="blue"
            onAnimationComplete={() => setVisitedAnimationComplete(true)}
          />
        )}
        {visitedAnimationComplete && pathPositions.length > 0 && (
          <AnimatedPolyline positions={pathPositions} color="red" />
        )}
      </MapContainer>
    </>
  );
};

export default Map;
