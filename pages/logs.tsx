"use client";

import React, { useEffect, useState } from 'react';
import Layout from './layout';
import LogsComponent from '../components/LogsComponent';

const LogsPage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Layout>
            {isClient && <LogsComponent />}
        </Layout>
    );
};

export default LogsPage;
