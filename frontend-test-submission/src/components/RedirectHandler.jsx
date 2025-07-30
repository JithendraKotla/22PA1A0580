useEffect(() => {
  const redirect = async () => {
    logger.log("REDIRECT_ATTEMPT", {
      code: "qxRMwq",
      shortCode,
    });

    const urlEntry = urls.find((url) => url.shortCode === shortCode);

    if (!urlEntry) {
      logger.log("REDIRECT_FAILED", {
        code: "qxRMwq",
        reason: "URL_NOT_FOUND",
        shortCode,
      });
      navigate("/");
      return;
    }

    if (new Date(urlEntry.expiresAt) < new Date()) {
      logger.log("REDIRECT_FAILED", {
        code: "qxRMwq",
        reason: "URL_EXPIRED",
        shortCode,
        expiresAt: urlEntry.expiresAt,
      });
      navigate("/");
      return;
    }

    logger.log("REDIRECT_SUCCESS", {
      code: "qxRMwq",
      shortCode,
      destination: urlEntry.originalUrl,
    });

    // ... rest of the function ...
  };

  redirect();
}, [shortCode, urls, navigate, recordClick]);
