import React from 'react';
import Layout from './layout';
import PoolDataTable from '../components/PoolDataTable';

const DashPage = () => {
    const logMessage = (message: string) => {
        console.log(message);
    };

    return (
        <Layout>
            <PoolDataTable logMessage={logMessage} />
        </Layout>
    );
};

export default DashPage;
