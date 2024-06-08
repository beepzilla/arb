import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PriceChart = ({ source }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/${source}chart.json`);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [source]);

  // Render chart based on `data`
  return (
    <div>
      <h2>{source} Price Chart</h2>
      {/* Chart rendering logic */}
    </div>
  );
};

export default PriceChart;
