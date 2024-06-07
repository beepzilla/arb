"use client";

import { useState } from "react";
import PriceChart from "../components/PriceChart";

export default function Home() {
  const [activeTab, setActiveTab] = useState("chart");

  const renderContent = () => {
    switch (activeTab) {
      case "chart":
        return (
          <div>
            <h2>Chart Section</h2>
            <PriceChart poolAddress="0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8" />
          </div>
        );
      case "dashboard":
        return <div>Dashboard Section</div>;
      case "logs":
        return <div>Logs Section</div>;
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
