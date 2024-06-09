"use client";

import React, { useEffect, useState } from 'react';
import Layout from './layout';
import PoolDataTable from '../components/PoolDataTable';
import { log } from '../lib/logger';

const DashPage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        log('DashPage component mounted');
        setIsClient(true);
    }, []);

    const logMessage = (message: string) => {
        log(message);
        console.log(message);
    };

    return (
        <Layout>
            {isClient && <PoolDataTable logMessage={logMessage} />}
        </Layout>
    );
};

export default DashPage;
