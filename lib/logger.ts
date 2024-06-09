import { useState, useEffect } from 'react';

let logListeners: ((message: string) => void)[] = [];

export function log(message: string) {
  console.log(message);
  logListeners.forEach(listener => listener(message));
}

export function useLogs() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const listener = (message: string) => {
      setLogs(prevLogs => [...prevLogs, message]);
    };
    logListeners.push(listener);
    return () => {
      logListeners = logListeners.filter(l => l !== listener);
    };
  }, []);

  return logs;
}
