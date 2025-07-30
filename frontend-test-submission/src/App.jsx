import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import RedirectPage from './pages/RedirectPage';

export default function App() {
  return (
    <Router>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
          boxShadow: 3,
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#fff',
              textShadow: '1px 1px 2px #1565c0',
            }}
          >
            URL Shortener
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              mx: 1,
              fontWeight: 600,
              letterSpacing: 1,
              transition: 'background 0.2s',
              '&:hover': {
                background: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Shortener
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/stats"
            sx={{
              mx: 1,
              fontWeight: 600,
              letterSpacing: 1,
              transition: 'background 0.2s',
              '&:hover': {
                background: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Statistics
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f5faff 100%)',
          py: 6,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            background: '#fff',
            borderRadius: 4,
            boxShadow: 4,
            py: 4,
            px: { xs: 2, sm: 4 },
            minHeight: '70vh',
          }}
        >
          <Routes>
            <Route path="/" element={<ShortenerPage />} />
            <Route path="/stats" element={<StatisticsPage />} />
            <Route path="/:shortcode" element={<RedirectPage />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}
