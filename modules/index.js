// Module Index - Single import point for all modules
export { CacheManager } from './cache.js';
export { DataProcessor } from './dataProcessor.js';
export { ChartManager } from './chartManager.js';
export { ApiService } from './apiService.js';
export { UIManager } from './uiManager.js';
export { AppController } from './appController.js';

// Utility functions that can be used across modules
export const utils = {
    // Format timeframe for display
    formatTimeframeDisplay(days) {
        if (days === 1) return '1 Day';
        if (days === 0.167) return '4 Hours';
        if (days === 0.042) return '1 Hour';
        if (days === 0.0104) return '15 Minutes';
        if (days === 0.0035) return '5 Minutes';
        if (days === 0.0007) return '1 Minute';
        return `${days} Days`;
    },

    // Get time unit for Chart.js
    getTimeUnit(days) {
        if (days <= 0.0007) return 'minute';
        if (days <= 0.0035) return 'minute';
        if (days <= 0.0104) return 'minute';
        if (days <= 0.042) return 'hour';
        if (days <= 0.167) return 'hour';
        if (days <= 1) return 'hour';
        if (days <= 7) return 'day';
        if (days <= 30) return 'day';
        if (days <= 90) return 'week';
        return 'month';
    },

    // Format currency values
    formatCurrency(value) {
        if (value >= 1e12) return '$' + (value / 1e12).toFixed(2) + 'T';
        if (value >= 1e9) return '$' + (value / 1e9).toFixed(2) + 'B';
        if (value >= 1e6) return '$' + (value / 1e6).toFixed(2) + 'M';
        if (value >= 1e3) return '$' + (value / 1e3).toFixed(2) + 'K';
        return '$' + value.toFixed(2);
    }
};


