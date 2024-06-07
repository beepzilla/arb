"use client";
import React, { useEffect, useState } from 'react';

const PriceChart = () => {
  const [poolsData, setPoolsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/refinedPoolsData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPoolsData(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error reading pools data:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "600px", height: "300px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <pre>{JSON.stringify(poolsData, null, 2)}</pre>
      {/* Chart implementation will go here */}
    </div>
  );
};

export default PriceChart;
