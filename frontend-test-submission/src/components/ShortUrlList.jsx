import React from 'react';
import { Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function ShortUrlList({ urls }) {
  if (!urls?.length) return null;
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Shortened URLs</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Expires At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map(u => (
              <TableRow key={u.shortcode}>
                <TableCell>
                  <a href={`http://localhost:3000/${u.shortcode}`} target="_blank" rel="noopener noreferrer">
                    {`http://localhost:3000/${u.shortcode}`}
                  </a>
                </TableCell>
                <TableCell>{u.url}</TableCell>
                <TableCell>{new Date(u.expiresAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
