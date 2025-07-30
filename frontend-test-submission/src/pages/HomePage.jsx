import React from "react";
import { Box, Typography } from "@mui/material";
import UrlShortenerForm from "../components/UrlShortenerForm";
import UrlResults from "../components/UrlResults";
import { useUrls } from "../contexts/UrlContext";
import { logger } from "../components/Logger";

const HomePage = () => {
  const { urls } = useUrls();

  React.useEffect(() => {
    logger.log("HOMEPAGE_VIEWED", {
      code: "qxRMwq",
      urlCount: urls.length,
    });
  }, [urls.length]);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mt: 3, mb: 4 }}
      >
        URL Shortener
      </Typography>
      <UrlShortenerForm />
      <UrlResults urls={urls} />
    </Box>
  );
};

export default HomePage;
