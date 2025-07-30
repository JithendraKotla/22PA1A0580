// Validation helpers

export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidShortcode(code) {
  // Alphanumeric, 4-12 chars
  return /^[a-zA-Z0-9]{4,12}$/.test(code);
}

export function isValidDuration(mins) {
  return Number.isInteger(Number(mins)) && mins > 0 && mins <= 1440;
}
