import React from 'react';
import { Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, Collapse, IconButton } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function StatisticsTable({ stats }) {
  const [openRows, setOpenRows] = React.useState({});

  const handleExpand = shortcode => {
    setOpenRows(prev => ({ ...prev, [shortcode]: !prev[shortcode] }));
  };

  if (!stats?.length) return <Typography>No statistics available.</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>URL Statistics</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Total Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map(stat => (
              <React.Fragment key={stat.shortcode}>
                <TableRow>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleExpand(stat.shortcode)}>
                      <ExpandMore />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <a href={`http://localhost:3000/${stat.shortcode}`} target="_blank" rel="noopener noreferrer">
                      {`/${stat.shortcode}`}
                    </a>
                  </TableCell>
                  <TableCell>{stat.url}</TableCell>
                  <TableCell>{new Date(stat.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(stat.expiresAt).toLocaleString()}</TableCell>
                  <TableCell>{stat.clicks}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} sx={{ p: 0, border: 0 }}>
                    <Collapse in={openRows[stat.shortcode]} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography variant="subtitle2">Click Details</Typography>
                        {stat.clickDetails?.length ? (
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>Referrer</TableCell>
                                <TableCell>Geo</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {stat.clickDetails.map((c, i) => (
                                <TableRow key={i}>
                                  <TableCell>{new Date(c.timestamp).toLocaleString()}</TableCell>
                                  <TableCell>{c.referrer}</TableCell>
                                  <TableCell>{c.geo}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <Typography>No clicks yet.</Typography>
                        )}
                      </CardContent>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
