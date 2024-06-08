import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PoolDataTable = ({ source }) => {
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

  // Render table based on `data`
  return (
    <div>
      <h2>{source} Pool Data</h2>
      {/* Table rendering logic */}
    </div>
  );
};

export default PoolDataTable;
