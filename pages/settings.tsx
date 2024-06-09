"use client";

import React, { useEffect, useState } from 'react';
import Layout from './layout';
import SettingsComponent from '../components/SettingsComponent';
import { log } from '../lib/logger';

const SettingsPage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        log('SettingsPage component mounted');
        setIsClient(true);
    }, []);

    return (
        <Layout>
            {isClient && <SettingsComponent />}
        </Layout>
    );
};

export default SettingsPage;
