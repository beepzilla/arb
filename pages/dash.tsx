"use client";

import React, { useEffect, useState } from 'react';
import Layout from './layout';
import PoolDataTable from '../components/PoolDataTable';

const DashPage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const logMessage = (message: string) => {
        console.log(message);
    };

    return (
        <Layout>
            {isClient && <PoolDataTable logMessage={logMessage} />}
        </Layout>
    );
};

export default DashPage;
