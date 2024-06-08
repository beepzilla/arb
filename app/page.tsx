"use client";

import React from 'react';
import Layout from './layout';
import PriceChart from '../components/PriceChart';

const HomePage = () => {
    const logMessage = (message: string) => {
        console.log(message);
    };

    return (
        <Layout>
            <PriceChart logMessage={logMessage} />
        </Layout>
    );
};

export default HomePage;
