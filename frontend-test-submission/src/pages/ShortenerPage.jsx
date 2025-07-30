import React, { useState } from 'react';
import UrlInputForm from '../components/UrlInputForm';
import ShortUrlList from '../components/ShortUrlList';
import { createShortUrls, getAllShortUrls } from '../services/api';
import Logger from '../services/logger';

export default function ShortenerPage() {
  const [shortUrls, setShortUrls] = useState([]);

  const handleShorten = async (inputs) => {
    try {
      const created = await createShortUrls(inputs);
      const all = await getAllShortUrls();
      setShortUrls(all);
      Logger.info('Shortened URLs updated', { count: all.length });
    } catch (err) {
      Logger.error('Shorten failed', { err });
      throw err;
    }
  };

  React.useEffect(() => {
    getAllShortUrls().then(setShortUrls);
  }, []);

  return (
    <div>
      <UrlInputForm onSubmit={handleShorten} />
      <ShortUrlList urls={shortUrls} />
    </div>
  );
}
