import React, { useEffect, useState } from 'react';
import { getAllShortUrls, getStats, simulateClick } from '../services/api';
import StatisticsTable from '../components/StatisticsTable';
import Logger from '../services/logger';
import { Button } from '@mui/material';

export default function StatisticsPage() {
  const [stats, setStats] = useState([]);

  const fetchStats = async () => {
    try {
      const urls = await getAllShortUrls();
      const statsData = await Promise.all(urls.map(async u => {
        return await getStats(u.shortcode);
      }));
      setStats(statsData);
      Logger.info('Statistics loaded', { count: statsData.length });
    } catch (err) {
      Logger.error('Stats fetch failed', { err });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // For demo: simulate a click on first URL
  const handleSimulateClick = () => {
    if (stats.length) {
      simulateClick(stats[0].shortcode, 'https://referrer.example', 'USA');
      fetchStats();
    }
  };

  return (
    <div>
      <Button variant="outlined" sx={{ mb: 2 }} onClick={handleSimulateClick}>
        Simulate Click (Demo)
      </Button>
      <StatisticsTable stats={stats} />
    </div>
  );
}
