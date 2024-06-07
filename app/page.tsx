"use client";

import { useState, useEffect } from "react";
import PriceChart from "../components/PriceChart";
import PoolDataTable from "../components/PoolDataTable";

export default function Home() {
  const [activeTab, setActiveTab] = useState("chart");

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs((prevLogs) => [...prevLogs, "Site connected and logs initialized."]);
  }, []);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "chart":
        return (
          <div>
            <h2>Chart Section</h2>
            <PriceChart addLog={addLog} />
          </div>
        );
      case "dashboard":
        return (
          <div>
            <h2>Dashboard Section</h2>
            <PoolDataTable />
          </div>
        );
      case "logs":
        return (
          <div>
            <h2>Logs Section</h2>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {logs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </div>
        );
      case "settings":
        return <div>Settings Section</div>;
      default:
        return <div>Chart Section</div>;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl">
        <nav className="flex justify-around border-b-2 border-gray-300">
          <button onClick={() => setActiveTab("chart")}>Chart</button>
          <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button onClick={() => setActiveTab("logs")}>Logs</button>
          <button onClick={() => setActiveTab("settings")}>Settings</button>
        </nav>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </main>
  );
}
