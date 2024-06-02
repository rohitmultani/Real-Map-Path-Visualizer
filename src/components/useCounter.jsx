import { useState, useEffect } from 'react';

const useCounter = (endValue, duration) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = 0;
    const end = endValue;
    const step = (end - start) / (duration / 10);
    let current = start;

    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [endValue, duration]);

  return count;
};

export default useCounter;
