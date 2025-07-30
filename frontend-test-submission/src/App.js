import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import RedirectHandler from "./components/RedirectHandler";
import { UrlProvider } from "./contexts/UrlContext";
import { logger } from "./components/Logger";

function App() {
  React.useEffect(() => {
    logger.log("APP_INITIALIZED", {
      code: "qxRMwq",
      environment: process.env.NODE_ENV,
    });
  }, []);

  return (
    <Router>
      <UrlProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/:shortCode" element={<RedirectHandler />} />
          </Routes>
        </Layout>
      </UrlProvider>
    </Router>
  );
}

export default App;
