"use client";

import React, { useState, ReactNode } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PriceChart from '../components/PriceChart';
import PoolDataTable from '../components/PoolDataTable';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [logs, setLogs] = useState<string[]>([]);

  const logMessage = (message: string) => {
    setLogs(prevLogs => [...prevLogs, message]);
  };

  return (
    <html lang="en">
      <head>
        <title>Arbitrage Analysis</title>
      </head>
      <body>
        <div>
          <h1>Arbitrage Analysis</h1>
          <Tabs>
            <TabList>
              <Tab>Chart</Tab>
              <Tab>Dashboard</Tab>
              <Tab>Logs</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanel>
              <PriceChart logMessage={logMessage} />
            </TabPanel>
            <TabPanel>
              <PoolDataTable logMessage={logMessage} />
            </TabPanel>
            <TabPanel>
              <div>
                {logs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div>Settings Placeholder</div>
            </TabPanel>
          </Tabs>
        </div>
        {children}
      </body>
    </html>
  );
}
