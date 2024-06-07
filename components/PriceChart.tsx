"use client";
import React, { useEffect, useState } from 'react';

const PriceChart = ({ addLog }) => {
  const [poolsData, setPoolsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        addLog("Fetching pools data...");
        const response = await fetch('/refinedPoolsData.json');
        addLog(`HTTP status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        addLog("Pools data fetched successfully.");
        setPoolsData(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error reading pools data:', error.message);
          addLog(`Error reading pools data: ${error.message}`);
        } else {
          addLog(`Unexpected error: ${error}`);
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
