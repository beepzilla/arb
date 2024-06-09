"use client";

import React, { useEffect, useState, useCallback } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { log } from '../lib/logger';

interface Token {
    id: string;
    symbol: string;
    name: string;
    price: string;
}

interface PoolData {
    id: string;
    liquidity: string;
    token0: Token;
    token1: Token;
    volumeUSD: string;
    feesUSD: string;
    totalValueLockedUSD: string;
    exchangeid: string;
}

interface PriceChartProps {
    logMessage: (message: string) => void;
}

const PriceChart: React.FC<PriceChartProps> = ({ logMessage }) => {
    const [data, setData] = useState<PoolData[]>([]);

    const fetchData = useCallback(() => {
        log('fetchData function called');
        fetch('/uniswapchart.json')
            .then(response => response.json())
            .then(data => {
                setData(data);
                logMessage('Data fetched successfully');
            })
            .catch(error => logMessage(`Error fetching chart data: ${error}`));
    }, [logMessage]);

    useEffect(() => {
        logMessage('PriceChart component mounted');
        fetchData();
    }, [fetchData]);

    const options = {
        title: {
            text: 'Uniswap Price Chart'
        },
        series: [{
            data: data.map(item => parseFloat(item.token0.price))  // Adjust based on the actual data structure
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PriceChart;
