import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PoolData {
  id: string;
  token0: { symbol: string };
  token1: { symbol: string };
  liquidity: number;
  totalValueLockedUSD: number;
}

const PriceChart: React.FC<{ addLog: (message: string) => void }> = ({ addLog }) => {
  const [data, setData] = useState<PoolData[]>([]);

  const fetchData = useCallback(async () => {
    try {
      addLog('Fetching pools data...');
      const result = await axios.get('/public/refinedPoolsData.json');
      setData(result.data);
      addLog('Pools data fetched successfully.');
    } catch (error: any) {
      addLog(`Error reading pools data: ${error.message}`);
    }
  }, [addLog]);

  useEffect(() => {
    fetchData(); // Fetch data initially
    const interval = setInterval(() => {
      fetchData();
    }, 60000); // Fetch data every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [fetchData]);

  return (
    <LineChart
      width={1000}
      height={500}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="id" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalValueLockedUSD" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default PriceChart;
