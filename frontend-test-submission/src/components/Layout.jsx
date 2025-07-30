import React from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import { logger } from "./Logger";

const Layout = () => {
  const handleNavigation = (path) => {
    logger.log("NAVIGATION", {
      code: "qxRMwq",
      destination: path,
    });
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            onClick={() => handleNavigation("/")}
          >
            Shorten
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/stats"
            onClick={() => handleNavigation("/stats")}
          >
            Statistics
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
