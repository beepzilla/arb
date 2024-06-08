import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface PoolData {
  id: string;
  token0: {
    id: string;
    symbol: string;
    price: number;
  };
  token1: {
    id: string;
    symbol: string;
    price: number;
  };
  liquidity: number;
  exchangeid: string;
}

interface PriceChartProps {
  logMessage: (message: string) => void;
}

const PriceChart: React.FC<PriceChartProps> = ({ logMessage }) => {
  const [data, setData] = useState<PoolData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uniswapResponse, quickswapResponse] = await Promise.all([
          axios.get('/uniswapchart.json'),
          axios.get('/quickswapchart.json')
        ]);
        const combinedData = [...uniswapResponse.data, ...quickswapResponse.data];
        setData(combinedData);
        logMessage('Data fetched successfully');
      } catch (error) {
        console.error('Error fetching chart data:', error);
        logMessage('Error fetching chart data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [logMessage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDataForChart = () => {
    const chartData: any[] = [];
    data.forEach(pool => {
      chartData.push({
        id: pool.id,
        exchange: pool.exchangeid,
        token0: pool.token0.symbol,
        token1: pool.token1.symbol,
        price0: pool.token0.price,
        price1: pool.token1.price,
        liquidity: pool.liquidity,
      });
    });
    return chartData;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formatDataForChart()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price0" stroke="#8884d8" />
        <Line type="monotone" dataKey="price1" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
