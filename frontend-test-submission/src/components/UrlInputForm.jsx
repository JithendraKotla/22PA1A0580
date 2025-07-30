import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography, Snackbar } from '@mui/material';
import Logger from '../services/logger';
import { isValidUrl, isValidShortcode, isValidDuration } from '../utils/validation';

const defaultRows = [{ url: '', duration: '', shortcode: '' }];

export default function UrlInputForm({ onSubmit }) {
  const [rows, setRows] = useState(defaultRows);
  const [error, setError] = useState('');

  const handleChange = (idx, field, value) => {
    const updated = rows.map((row, i) => i === idx ? { ...row, [field]: value } : row);
    setRows(updated);
  };

  const addRow = () => {
    if (rows.length < 5) setRows([...rows, { url: '', duration: '', shortcode: '' }]);
  };

  const removeRow = idx => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  const validateRows = () => {
    for (let i = 0; i < rows.length; i++) {
      const { url, duration, shortcode } = rows[i];
      if (!url || !isValidUrl(url)) return `Row ${i + 1}: Invalid URL.`;
      if (duration && !isValidDuration(Number(duration))) return `Row ${i + 1}: Invalid duration.`;
      if (shortcode && !isValidShortcode(shortcode)) return `Row ${i + 1}: Invalid shortcode.`;
    }
    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validateRows();
    if (err) {
      setError(err);
      Logger.warn('Validation failed', { err });
      return;
    }
    try {
      await onSubmit(rows.map(r => ({
        url: r.url,
        duration: r.duration ? Number(r.duration) : undefined,
        shortcode: r.shortcode || undefined,
      })));
      setRows(defaultRows);
    } catch (ex) {
      setError(ex.message);
      Logger.error('Submission failed', { ex });
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Shorten URLs</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {rows.map((row, idx) => (
              <React.Fragment key={idx}>
                <Grid item xs={12} md={5}>
                  <TextField
                    label="Long URL"
                    value={row.url}
                    onChange={e => handleChange(idx, 'url', e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Validity (min)"
                    value={row.duration}
                    onChange={e => handleChange(idx, 'duration', e.target.value)}
                    type="number"
                    inputProps={{ min: 1, max: 1440 }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Custom Shortcode"
                    value={row.shortcode}
                    onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  {rows.length > 1 && (
                    <Button color="error" onClick={() => removeRow(idx)}>Remove</Button>
                  )}
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={addRow} disabled={rows.length >= 5}>Add URL</Button>
              <Button type="submit" variant="contained" sx={{ ml: 2 }}>Shorten</Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={!!error}
          autoHideDuration={4000}
          onClose={() => setError('')}
          message={error}
        />
      </CardContent>
    </Card>
  );
}
