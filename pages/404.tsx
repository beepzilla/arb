import React, { useEffect } from 'react';
import { log } from '../lib/logger';

const Custom404: React.FC = () => {
    useEffect(() => {
        log('404 page loaded');
    }, []);

    return <h1>404 - Page Not Found</h1>;
};

export default Custom404;
