// src/components/LogViewer.jsx
import React from "react";
import { logger } from "./Logger";

const LogViewer = () => {
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    setLogs(logger.getLogs());
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "300px",
        height: "200px",
        overflow: "auto",
        background: "white",
        border: "1px solid #ccc",
        padding: "10px",
        zIndex: 1000,
      }}
    >
      <h4>Logs (qxRMwq)</h4>
      <pre>{JSON.stringify(logs, null, 2)}</pre>
    </div>
  );
};

export default LogViewer;
