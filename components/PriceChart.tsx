import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PriceChart = ({ addLog }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        addLog('Fetching pools data...');
        const result = await axios('/public/refinedPoolsData.json');
        setData(result.data);
      } catch (error) {
        console.error('Error reading pools data:', error);
        addLog('Error reading pools data: Failed to fetch');
      }
    };

    fetchData();
  }, [addLog]);

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="id" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="liquidity" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="totalValueLockedUSD" stroke="#82ca9d" />
    </LineChart>
  );
};

export default PriceChart;
