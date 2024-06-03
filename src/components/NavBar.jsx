import React, {useState,useEffect} from 'react';
import { useVisualizerContext} from '../context/VisualizerContext';
import { FaMoon, FaSun , FaBars} from 'react-icons/fa';

import useCounter from './useCounter'; // Adjust the import path as necessary

const NavBar = () => {
  const {
    algorithm,
    setAlgorithm,
    city,
    setCity,
    visualizing,
    setVisualizing,
    nodeVisited,
    shortestNodes,
    clearBoard,
    setClearBoard,
    darkMode,
    setDarkMode,
    setNodes,
    setEdges,
    setMapCenter,
    setStartPoint,
    setEndPoint
  } = useVisualizerContext();
  const [drawerOpen, setDrawerOpen] = useState(false);  
  const animatedNodeVisited = useCounter(nodeVisited, 5000); // 1 second duration
  const animatedShortestNodes = useCounter(shortestNodes, 5000); // 1 second duration

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleCityChange = async(event) => {
    setCity(event.target.value);
  };

 async function fetchData(){
  const [nodesJson,edgesJson] =  await Promise.all([
        fetch(`/Data/${city}/nodes.json`,{
        headers: {
          "Content-Type": "application/json",
        }}),
        fetch(`/Data/${city}/edges.json`,{
          headers: {
            "Content-Type": "application/json",
          }})
      ]);
  const nodes = await nodesJson.json();
  const edges = await edgesJson.json();
  return [nodes,edges];
    }

useEffect(() => {
  fetchData()
  .then((res)=>{
    setNodes(res[0]);
    setEdges(res[1]);
    setMapCenter([(res[0][20].lat+res[0][100].lat)/2,(res[0][20].lon + res[0][100].lon)/2]);
    setStartPoint([res[0][20].lat,res[0][20].lon]);
    setEndPoint([res[0][100].lat,res[0][100].lon])
  });
}, [city]);

  const handleVisualize = () => {
    setVisualizing(!visualizing);
    setDrawerOpen(!drawerOpen);
  };

  const handleClearBoard = () => {
    setClearBoard(!clearBoard);
  };
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  return (
    <>
    <div className={`fixed top-0 left-0 z-[10000] transition-transform transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}  bg-gray-800 text-white p-4 w-64  h-full `}>
      <div className="container mx-auto flex flex-col justify-between items-center space-y-4">
        <div className="text-xl font-bold text-center">
          Path Visualizer
        </div>
        <div id="visited" className="text-sm mt-1">Total Distance Covered: {animatedNodeVisited} KM</div>
        <div id="short" className="text-sm mt-1"> Shortest Distance: {animatedShortestNodes} KM</div>
        <div className="flex flex-col  items-center space-y-4 ">
          <div className="relative text-center" id="algo">
            <span className="block md:inline-block mr-2">Select Algorithm</span>
            <select
              value={algorithm}
              onChange={handleAlgorithmChange}
              className="bg-gray-700 text-white p-2 rounded w-full md:w-auto"
            >
              <option value="Dijkstra">Dijkstra</option>
              <option value="A*">A*</option>
              <option value="BFS">BFS</option>
              <option value="DFS">DFS</option>
            </select>
          </div>
          <div className="relative text-center" id="city">
            <span className="block md:inline-block mr-2">City</span>
            <select
              value={city}
              onChange={handleCityChange}
              className="bg-gray-700 text-white p-2 rounded w-full md:w-auto"
            >
              <option value="Agra">Agra</option>
              <option value="Kanpur">Kanpur</option>
              <option value="Kota">Kota</option>
              <option value="Jaipur">Jaipur</option>
            </select>
          </div>
          <button id="visualize" className="bg-green-500 p-2 rounded hover:bg-green-600 w-full  text-center" onClick={handleVisualize}>
            Visualize
          </button>
          <button id="clear" className="relative group bg-red-500 p-2 rounded hover:bg-red-600 w-full  text-center disabled:bg-red-300 disabled:hover:bg-red-300 disabled:cursor-not-allowed"
            onClick={handleClearBoard}
            // disabled={visualizing}.
            >
            Clear Map
          </button>
          
        </div>
      </div>
    </div>
    <button
    id="open"
    className="fixed top-4 right-4 z-[1000] bg-gray-700 p-3 rounded-full shadow-lg"
    onClick={handleToggleDrawer}
  >
    
    <FaBars className="text-white" />
  </button>
  <button id="toggle-dark-mode" className="fixed top-20 right-4 z-[1000] bg-gray-700 p-3 rounded hover:bg-gray-600 text-center" onClick={handleDarkMode}>
            {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon />}
          </button>
  </>
  );
};

export default React.memo(NavBar);
