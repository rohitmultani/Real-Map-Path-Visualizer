import React, { useEffect, useState } from 'react';
import { CircleMarker, useMap } from 'react-leaflet';

const AnimatedCircles = ({ positions, color, speed }) => {
  const [currentPositions, setCurrentPositions] = useState([]);
  const [radii, setRadii] = useState([]);
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      setCurrentPositions((prev) => [...prev, positions[index]]);
      setRadii((prev) => [...prev, 0]);
      index += 1;
      if (index >= positions.length) {
        clearInterval(interval);
      }
    }, 0.1);

    return () => clearInterval(interval);
  }, [positions, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadii((prevRadii) => prevRadii.map(radius => Math.min(radius + 1, 0.5)));
    }, 0.1); // Adjust this interval for the expansion speed

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {currentPositions.map((pos, idx) => (
        <CircleMarker
          key={idx}
          center={pos}
          radius={radii[idx]}
          color={color}
          fillOpacity={0.5}
        />
      ))}
    </>
  );
};

export default AnimatedCircles;
