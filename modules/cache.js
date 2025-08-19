// Cache Management Module
export class CacheManager {
    constructor(cacheDuration = 5 * 60 * 1000) {
        this.cache = new Map();
        this.cacheDuration = cacheDuration;
    }

    getCacheKey(timeframe) {
        return `btc_data_${timeframe}`;
    }

    getCachedData(timeframe) {
        const key = this.getCacheKey(timeframe);
        const cached = this.cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            console.log(`Using cached data for ${timeframe} timeframe`);
            return cached.data;
        }
        
        return null;
    }

    setCachedData(timeframe, data) {
        const key = this.getCacheKey(timeframe);
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
        console.log(`Cached data for ${timeframe} timeframe`);
    }

    clearCache() {
        this.cache.clear();
        console.log('Cache cleared');
    }

    getCacheSize() {
        return this.cache.size;
    }

    getCacheStats() {
        const stats = {
            size: this.cache.size,
            keys: Array.from(this.cache.keys()),
            oldestEntry: null,
            newestEntry: null
        };

        if (this.cache.size > 0) {
            const timestamps = Array.from(this.cache.values()).map(entry => entry.timestamp);
            stats.oldestEntry = new Date(Math.min(...timestamps));
            stats.newestEntry = new Date(Math.max(...timestamps));
        }

        return stats;
    }
}


