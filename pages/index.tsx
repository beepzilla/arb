"use client";

import React, { useEffect, useState } from 'react';
import Layout from './layout';
import PriceChart from '../components/PriceChart';

const HomePage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const logMessage = (message: string) => {
        console.log(message);
    };

    return (
        <Layout>
            {isClient && <PriceChart logMessage={logMessage} />}
        </Layout>
    );
};

export default HomePage;
