import Logger from './logger';

let urlStore = [];
let clickStore = {};

function generateShortcode() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code;
  do {
    code = Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (urlStore.some(u => u.shortcode === code));
  return code;
}

export async function createShortUrls(urlInputs) {
  // urlInputs: [{url, duration, shortcode}]
  const now = new Date();
  const results = [];
  for (const input of urlInputs) {
    let { url, duration, shortcode } = input;
    if (!shortcode) {
      shortcode = generateShortcode();
    }
    if (urlStore.some(u => u.shortcode === shortcode)) {
      Logger.warn('Shortcode already exists', { shortcode });
      throw new Error(`Shortcode "${shortcode}" already exists.`);
    }
    // Ensure duration is a number
    duration = Number(duration) || 30;
    const expiry = new Date(now.getTime() + duration * 60000);
    const entry = {
      id: urlStore.length + 1,
      url,
      shortcode,
      createdAt: now.toISOString(),
      expiresAt: expiry.toISOString(),
      clicks: 0,
    };
    urlStore.push(entry);
    clickStore[shortcode] = [];
    Logger.info('Short URL created', { shortcode, url });
    results.push(entry);
  }
  return results;
}

export async function getAllShortUrls() {
  // Return a shallow copy to prevent external mutation
  return [...urlStore];
}

export async function getStats(shortcode) {
  const urlEntry = urlStore.find(u => u.shortcode === shortcode);
  if (!urlEntry) throw new Error('Shortcode not found');
  // Return a shallow copy for safety
  return {
    ...urlEntry,
    clickDetails: clickStore[shortcode] ? [...clickStore[shortcode]] : [],
  };
}

// For demo: simulate a click
export function simulateClick(shortcode, referrer = '', geo = 'Unknown') {
  if (!clickStore[shortcode]) return;
  clickStore[shortcode].push({
    timestamp: new Date().toISOString(),
    referrer,
    geo,
  });
  const urlEntry = urlStore.find(u => u.shortcode === shortcode);
  if (urlEntry) urlEntry.clicks += 1;
}
