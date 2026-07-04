const HISTORY_KEY = 'codereview_history_reports';

export const storageService = {
  saveReport: (report) => {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const structuredData = { ...report, id: Date.now().toString(), timestamp: new Date().toISOString() };
    history.unshift(structuredData);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return structuredData;
  },
  getHistory: () => JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'),
  deleteReport: (id) => {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    return filtered;
  }
};