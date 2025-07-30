import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { logger } from "../components/Logger";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);

  // Load URLs from localStorage
  useEffect(() => {
    const loadUrls = () => {
      const savedUrls = localStorage.getItem("shortenedUrls");
      if (savedUrls) {
        try {
          const parsedUrls = JSON.parse(savedUrls);
          setUrls(parsedUrls);
          logger.log("URLS_LOADED", {
            code: "qxRMwq",
            count: parsedUrls.length,
          });
        } catch (error) {
          logger.log("URLS_LOAD_ERROR", {
            code: "qxRMwq",
            error: error.message,
          });
        }
      }
    };
    loadUrls();
  }, []);

  // Save URLs to localStorage
  const saveUrls = useCallback((newUrls) => {
    try {
      localStorage.setItem("shortenedUrls", JSON.stringify(newUrls));
      setUrls(newUrls);
      logger.log("URLS_SAVED", {
        code: "qxRMwq",
        count: newUrls.length,
      });
    } catch (error) {
      logger.log("URLS_SAVE_ERROR", {
        code: "qxRMwq",
        error: error.message,
      });
    }
  }, []);

  // Add a new URL
  const addUrl = useCallback(
    (newUrl) => {
      const updatedUrls = [...urls, newUrl];
      saveUrls(updatedUrls);
      logger.log("URL_ADDED", {
        code: "qxRMwq",
        shortCode: newUrl.shortCode,
        originalUrl: newUrl.originalUrl,
        expiresAt: newUrl.expiresAt,
      });
    },
    [urls, saveUrls]
  );

  // Record a click on a short URL
  const recordClick = useCallback(
    (shortCode, source = "direct") => {
      const updatedUrls = urls.map((url) => {
        if (url.shortCode === shortCode) {
          const click = {
            timestamp: new Date().toISOString(),
            source,
            location: getRandomLocation(),
          };
          logger.log("URL_CLICKED", {
            code: "qxRMwq",
            shortCode,
            clickData: click,
          });
          return {
            ...url,
            clicks: [...(url.clicks || []), click],
          };
        }
        return url;
      });
      saveUrls(updatedUrls);
    },
    [urls, saveUrls]
  );

  // Generate random location for demo purposes
  const getRandomLocation = () => {
    const locations = [
      "North America",
      "Europe",
      "Asia",
      "South America",
      "Africa",
      "Australia",
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  // Delete a URL
  const deleteUrl = useCallback(
    (id) => {
      const updatedUrls = urls.filter((url) => url.id !== id);
      saveUrls(updatedUrls);
      logger.log("URL_DELETED", {
        code: "qxRMwq",
        urlId: id,
      });
    },
    [urls, saveUrls]
  );

  return (
    <UrlContext.Provider
      value={{
        urls,
        addUrl,
        recordClick,
        deleteUrl,
        saveUrls,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const useUrls = () => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useUrls must be used within a UrlProvider");
  }
  return context;
};
