import React from "react";
import { Box, Typography } from "@mui/material";
import StatsTable from "../components/StatsTable";
import { useUrls } from "../contexts/UrlContext";
import { logger } from "../components/Logger";

const StatsPage = () => {
  const { urls } = useUrls();

  React.useEffect(() => {
    logger.log("STATS_PAGE_VIEWED", {
      code: "qxRMwq",
      urlCount: urls.length,
      totalClicks: urls.reduce(
        (sum, url) => sum + (url.clicks?.length || 0),
        0
      ),
    });
  }, [urls]);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mt: 3, mb: 4 }}
      >
        URL Statistics
      </Typography>
      <StatsTable urls={urls} />
    </Box>
  );
};

export default StatsPage;
