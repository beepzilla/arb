import React, { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';

const PriceChart = () => {
  const [poolsData, setPoolsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filePath = path.join(process.cwd(), 'public', 'refinedPoolsData.json');
        const data = fs.readFileSync(filePath, 'utf8');
        setPoolsData(JSON.parse(data));
      } catch (error) {
        console.error('Error reading pools data:', error);
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
