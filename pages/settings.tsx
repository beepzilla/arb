"use client";

import React, { useEffect, useState } from 'react';
import Layout from './layout';
import SettingsComponent from '../components/SettingsComponent';

const SettingsPage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Layout>
            {isClient && <SettingsComponent />}
        </Layout>
    );
};

export default SettingsPage;
