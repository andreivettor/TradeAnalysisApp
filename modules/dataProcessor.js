// Data Processing Module
export class DataProcessor {
    constructor() {
        this.minDataPoints = 50;
        this.maxDataPoints = 200;
    }

    processDataForTimeframe(ohlcData, timeframe) {
        const now = Date.now();
        const timeframeMs = timeframe * 24 * 60 * 60 * 1000; // Convert days to milliseconds
        const startTime = now - timeframeMs;
        
        // Filter OHLC data to only include points within the selected timeframe
        let filteredOhlc = ohlcData.filter(ohlc => ohlc[0] >= startTime);
        
        // Ensure we have enough data points for the chart
        if (filteredOhlc.length < this.minDataPoints) {
            // If we don't have enough data, use more historical data but limit points
            filteredOhlc = ohlcData.slice(-this.maxDataPoints);
        } else if (filteredOhlc.length > this.maxDataPoints) {
            // If we have too many points, sample them evenly
            const step = Math.floor(filteredOhlc.length / this.maxDataPoints);
            filteredOhlc = filteredOhlc.filter((_, index) => index % step === 0);
        }
        
        // Ensure we have at least 2 data points
        if (filteredOhlc.length < 2) {
            // Fallback to last 24 hours if insufficient data
            const fallbackStart = now - (24 * 60 * 60 * 1000);
            filteredOhlc = ohlcData.filter(ohlc => ohlc[0] >= fallbackStart);
        }
        
        console.log(`Processed ${filteredOhlc.length} OHLC data points for ${timeframe} timeframe`);
        return filteredOhlc;
    }

    // Convert OHLC data to Chart.js candlestick format
    convertToChartJsFormat(ohlcData) {
        return ohlcData.map(ohlc => ({
            x: new Date(ohlc[0]),
            o: ohlc[1], // Open
            h: ohlc[2], // High
            l: ohlc[3], // Low
            c: ohlc[4]  // Close
        }));
    }

    // Legacy method for line charts (fallback)
    convertOhlcToPrices(ohlcData) {
        return ohlcData.map(ohlc => [ohlc[0], ohlc[4]]); // timestamp, close price
    }

    getTimeUnit(days) {
        if (days <= 0.0007) return 'minute';      // 1 minute
        if (days <= 0.0035) return 'minute';      // 5 minutes
        if (days <= 0.0104) return 'minute';      // 15 minutes
        if (days <= 0.042) return 'hour';         // 1 hour
        if (days <= 0.167) return 'hour';         // 4 hours
        if (days <= 1) return 'hour';             // 1 day
        if (days <= 7) return 'day';              // 7 days
        if (days <= 30) return 'day';             // 30 days
        if (days <= 90) return 'week';            // 90 days
        return 'month';                           // 1 year
    }

    formatTimeframeDisplay(days) {
        if (days === 1) return '1 Day';
        if (days === 0.167) return '4 Hours';
        if (days === 0.042) return '1 Hour';
        if (days === 0.0104) return '15 Minutes';
        if (days === 0.0035) return '5 Minutes';
        if (days === 0.0007) return '1 Minute';
        return `${days} Days`;
    }

    formatCurrency(value) {
        if (value >= 1e12) {
            return '$' + (value / 1e12).toFixed(2) + 'T';
        } else if (value >= 1e9) {
            return '$' + (value / 1e9).toFixed(2) + 'B';
        } else if (value >= 1e6) {
            return '$' + (value / 1e6).toFixed(2) + 'M';
        } else if (value >= 1e3) {
            return '$' + (value / 1e3).toFixed(2) + 'K';
        } else {
            return '$' + value.toFixed(2);
        }
    }
}
