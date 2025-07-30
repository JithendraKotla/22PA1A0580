
class LoggingMiddleware {
  constructor() {
    this.logs = [];
  }


  log(action, details = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      code: 'qxRMwq', 
      timestamp,
      action,
      details
    };
    
    this.logs.push(logEntry);
    this._storeLog(logEntry);
    

    console.log(`[${timestamp}] Action: ${action}`, details);
    return logEntry;
  }

  _storeLog(logEntry) {
    try {
      const currentLogs = JSON.parse(localStorage.getItem('appLogs') || [];
      currentLogs.push(logEntry);
      localStorage.setItem('appLogs', JSON.stringify(currentLogs));
    } catch (error) {
      console.error('Log storage failed:', error);
    }
  }


  info(message, data = {}) {
    return this.log(`INFO: ${message}`, data);
  }

  warn(message, data = {}) {
    return this.log(`WARN: ${message}`, data);
  }

  error(message, data = {}) {
    return this.log(`ERROR: ${message}`, data);
  }

  getLogs() {
    return this.logs;
  }
}


export const logger = new LoggingMiddleware();