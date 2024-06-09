"use client";

import React, { useEffect, useState } from 'react';
import Layout from './layout';
import PriceChart from '../components/PriceChart';
import { log } from '../lib/logger';

const HomePage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        log('HomePage component mounted');
        setIsClient(true);
    }, []);

    const logMessage = (message: string) => {
        log(message);
        console.log(message);
    };

    return (
        <Layout>
            {isClient && <PriceChart logMessage={logMessage} />}
        </Layout>
    );
};

export default HomePage;
