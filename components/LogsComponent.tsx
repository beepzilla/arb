import React from 'react';
import { useLogs } from '../lib/logger';

const LogsComponent: React.FC = () => {
    const logs = useLogs();
    return (
        <div>
            <h1>Logs Page</h1>
            <div>
                {logs.map((log, index) => (
                    <div key={index}>{log}</div>
                ))}
            </div>
        </div>
    );
};

export default LogsComponent;
