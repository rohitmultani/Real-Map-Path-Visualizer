import React, { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";

const AnimatedPolyline = ({ positions, color, onAnimationComplete }) => {
  const [currentPositions, setCurrentPositions] = useState([]);

  useEffect(() => {
    if (positions.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      setCurrentPositions(positions.slice(0, index + 1));
      index += 1;
      if (index >= positions.length) {
        clearInterval(interval);
        if (onAnimationComplete) {
          onAnimationComplete(); // Call the callback when animation is complete
        }
      }
    }, 1); 

    return () => clearInterval(interval);
  }, [positions]);

  return <Polyline positions={currentPositions} color={color} weight={1} />;
};

export default AnimatedPolyline;
