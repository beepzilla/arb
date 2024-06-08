"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

interface PriceChartProps {
  source: string;
}

const fetchPoolsData = async (source: string) => {
  try {
    const result = await axios.get(`/${source}chart.json`);
    return result.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const PriceChart = ({ source }: PriceChartProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const poolsData = await fetchPoolsData(source);
      setData(poolsData);
    };
    getData();
  }, [source]);

  if (!data) {
    return <div>Loading data...</div>;
  }

  // Render chart with data
  return <div>Chart data loaded successfully</div>;
};

export default PriceChart;
