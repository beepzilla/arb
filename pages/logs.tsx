import React, { useEffect } from 'react';
import { log } from '../lib/logger';
import LogsComponent from '../components/LogsComponent';
import Layout from './layout';

const LogsPage: React.FC = () => {
    useEffect(() => {
        log('Logs page loaded');
    }, []);

    return (
        <Layout>
            <LogsComponent />
        </Layout>
    );
};

export default LogsPage;
