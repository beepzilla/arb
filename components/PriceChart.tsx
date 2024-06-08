"use client";

import React, { useEffect, useState, useCallback } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

interface PriceChartProps {
    logMessage: (message: string) => void;
}

const PriceChart: React.FC<PriceChartProps> = ({ logMessage }) => {
    const [data, setData] = useState([]);

    const fetchData = useCallback(() => {
        fetch('/uniswapchart.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => logMessage(`Error fetching chart data: ${error}`));
    }, [logMessage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const options = {
        title: {
            text: 'Uniswap Price Chart'
        },
        series: [{
            data: data
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PriceChart;
