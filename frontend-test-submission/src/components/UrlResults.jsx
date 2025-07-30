import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { logger } from "./Logger";

const UrlResults = ({ urls }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    logger.log("URL_COPIED", {
      code: "qxRMwq",
      url: text,
    });
  };

  if (urls.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="textSecondary">
          No shortened URLs yet. Create one above!
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Your Shortened URLs
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Expires At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell
                  sx={{
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Tooltip title={url.originalUrl}>
                    <Link href={url.originalUrl} target="_blank" rel="noopener">
                      {url.originalUrl}
                    </Link>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Link
                      href={`/${url.shortCode}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {`${window.location.host}/${url.shortCode}`}
                    </Link>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleCopy(`${window.location.host}/${url.shortCode}`)
                      }
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  {new Date(url.expiresAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Tooltip title="Copy to clipboard">
                    <IconButton
                      onClick={() =>
                        handleCopy(`${window.location.host}/${url.shortCode}`)
                      }
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UrlResults;
