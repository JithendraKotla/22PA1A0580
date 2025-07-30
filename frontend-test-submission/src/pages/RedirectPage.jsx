import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllShortUrls, simulateClick } from '../services/api';
import Logger from '../services/logger';
import { CircularProgress, Typography, Box } from '@mui/material';

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function redirect() {
      try {
        const urls = await getAllShortUrls();
        const entry = urls.find(u => u.shortcode === shortcode);
        if (entry) {
          simulateClick(shortcode, document.referrer, 'Unknown');
          window.location.replace(entry.url);
        } else {
          Logger.warn('Shortcode not found', { shortcode });
          navigate('/', { replace: true });
        }
      } catch (err) {
        Logger.error('Redirect failed', { err });
        navigate('/', { replace: true });
      }
    }
    redirect();
  }, [shortcode, navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>Redirecting...</Typography>
    </Box>
  );
}
