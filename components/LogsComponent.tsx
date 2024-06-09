import { useEffect, useState } from 'react';

interface LogEntry {
  timestamp: string;
  message: string;
}

const LogsComponent = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/logs.json');
        const data: LogEntry[] = await res.json();
        setLogs(data);
      } catch (err) {
        console.error('Error fetching logs:', err);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Logs Page</h1>
      {logs.map((log, index) => (
        <div key={index}>
          <p>{log.timestamp}: {log.message}</p>
        </div>
      ))}
    </div>
  );
};

export default LogsComponent;
