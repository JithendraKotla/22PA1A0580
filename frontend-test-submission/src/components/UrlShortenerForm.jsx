import React, { useState } from "react";
import { useUrls } from "../contexts/UrlContext";
import { logger } from "./Logger";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const UrlShortenerForm = () => {
  const { addUrl } = useUrls();
  const [inputs, setInputs] = useState([
    { url: "", validity: "", shortCode: "" },
  ]);
  const [errors, setErrors] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortCode = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleAddRow = () => {
    if (inputs.length >= 5) {
      setSnackbarMessage("Maximum of 5 URLs allowed");
      setOpenSnackbar(true);
      logger.log("MAX_URLS_ATTEMPTED", {
        code: "qxRMwq",
        currentCount: inputs.length,
      });
      return;
    }
    setInputs([...inputs, { url: "", validity: "", shortCode: "" }]);
    logger.log("URL_ROW_ADDED", {
      code: "qxRMwq",
      newCount: inputs.length + 1,
    });
  };

  const handleRemoveRow = (index) => {
    if (inputs.length <= 1) return;
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    logger.log("URL_ROW_REMOVED", {
      code: "qxRMwq",
      remainingCount: newInputs.length,
    });
  };

  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);

    if (field === "url" && value) {
      logger.log("URL_INPUT_CHANGED", {
        code: "qxRMwq",
        index,
        field,
        value: value.substring(0, 50) + (value.length > 50 ? "..." : ""),
      });
    } else {
      logger.log("INPUT_CHANGED", {
        code: "qxRMwq",
        index,
        field,
        value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logger.log("FORM_SUBMITTED", {
      code: "qxRMwq",
      inputCount: inputs.length,
    });

    const newErrors = [];
    const validInputs = [];

    inputs.forEach((input, index) => {
      const error = {};
      if (!input.url) {
        error.url = "URL is required";
      } else if (!validateUrl(input.url)) {
        error.url = "Invalid URL format";
      }

      if (input.validity && (isNaN(input.validity) || input.validity <= 0)) {
        error.validity = "Validity must be a positive number";
      }

      if (input.shortCode && !/^[a-zA-Z0-9]{4,20}$/.test(input.shortCode)) {
        error.shortCode = "Shortcode must be 4-20 alphanumeric characters";
      }

      if (Object.keys(error).length > 0) {
        newErrors[index] = error;
      } else {
        validInputs.push(input);
      }
    });

    setErrors(newErrors);

    if (newErrors.length > 0) {
      logger.log("FORM_VALIDATION_FAILED", {
        code: "qxRMwq",
        errors: newErrors,
      });
      return;
    }

    if (validInputs.length === 0) return;

    validInputs.forEach((input) => {
      const now = new Date();
      const validityMinutes = input.validity ? parseInt(input.validity) : 30;
      const expiresAt = new Date(now.getTime() + validityMinutes * 60000);

      const shortUrl = {
        id: Date.now().toString(),
        originalUrl: input.url,
        shortCode: input.shortCode || generateShortCode(),
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        clicks: [],
      };

      addUrl(shortUrl);
      logger.log("URL_SHORTENED", {
        code: "qxRMwq",
        shortCode: shortUrl.shortCode,
        originalUrl: shortUrl.originalUrl,
        expiresAt: shortUrl.expiresAt,
      });
    });

    setInputs([{ url: "", validity: "", shortCode: "" }]);
    setSnackbarMessage(`${validInputs.length} URL(s) shortened successfully!`);
    setOpenSnackbar(true);
    logger.log("URL_SHORTENING_SUCCESS", {
      code: "qxRMwq",
      count: validInputs.length,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Shorten URLs
      </Typography>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Original URL"
                value={input.url}
                onChange={(e) =>
                  handleInputChange(index, "url", e.target.value)
                }
                error={!!errors[index]?.url}
                helperText={errors[index]?.url}
                required
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                fullWidth
                label="Validity (minutes)"
                type="number"
                value={input.validity}
                onChange={(e) =>
                  handleInputChange(index, "validity", e.target.value)
                }
                error={!!errors[index]?.validity}
                helperText={errors[index]?.validity || "Default: 30"}
              />
            </Grid>
            <Grid item xs={5} sm={3}>
              <TextField
                fullWidth
                label="Custom Shortcode (optional)"
                value={input.shortCode}
                onChange={(e) =>
                  handleInputChange(index, "shortCode", e.target.value)
                }
                error={!!errors[index]?.shortCode}
                helperText={errors[index]?.shortCode}
              />
            </Grid>
            <Grid item xs={1} sx={{ display: "flex", alignItems: "center" }}>
              {inputs.length > 1 && (
                <IconButton onClick={() => handleRemoveRow(index)}>
                  <RemoveCircleOutlineIcon color="error" />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddRow}
              disabled={inputs.length >= 5}
            >
              Add URL
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained" color="primary">
              Shorten URLs
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UrlShortenerForm;
