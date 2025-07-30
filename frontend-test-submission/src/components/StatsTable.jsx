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
  TablePagination,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { logger } from "./Logger";
import { useUrls } from "../contexts/UrlContext";

const StatsTable = ({ urls }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { saveUrls } = useUrls();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    const updatedUrls = urls.filter((url) => url.id !== id);
    saveUrls(updatedUrls);
    logger.log("URL_DELETED", {
      code: "qxRMwq",
      urlId: id,
    });
  };

  if (urls.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="textSecondary">
          No statistics available yet. Create some shortened URLs first!
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        URL Statistics
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Expires At</TableCell>
              <TableCell>Total Clicks</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((url) => (
                <TableRow key={url.id}>
                  <TableCell>
                    <Link
                      href={`/${url.shortCode}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {`${window.location.host}/${url.shortCode}`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {new Date(url.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(url.expiresAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{url.clicks?.length || 0}</TableCell>
                  <TableCell>
                    <Tooltip title="Delete URL">
                      <IconButton onClick={() => handleDelete(url.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Click Details</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {url.clicks?.length > 0 ? (
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>Source</TableCell>
                                <TableCell>Location</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {url.clicks.map((click, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {new Date(click.timestamp).toLocaleString()}
                                  </TableCell>
                                  <TableCell>{click.source}</TableCell>
                                  <TableCell>{click.location}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <Typography variant="body2">
                            No clicks recorded
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={urls.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StatsTable;
