// Custom Logging Middleware

const logs = [];

class Logger {
  static log(level, message, meta = {}) {
    logs.push({
      timestamp: new Date().toISOString(),
      level,
      message,
      meta,
    });
    // No console.log or browser logging
  }

  static info(message, meta = {}) {
    Logger.log('info', message, meta);
  }

  static warn(message, meta = {}) {
    Logger.log('warn', message, meta);
  }

  static error(message, meta = {}) {
    Logger.log('error', message, meta);
  }

  static getLogs() {
    return logs;
  }
}

export default Logger;