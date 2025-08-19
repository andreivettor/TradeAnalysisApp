// Development Utilities Module
export class DevUtils {
    constructor(appController) {
        this.appController = appController;
        this.setupDevTools();
    }

    setupDevTools() {
        // Expose useful debugging functions to console
        window.devTools = {
            // Cache management
            getCacheStats: () => this.appController.getCacheStats(),
            clearCache: () => this.appController.clearCache(),
            getCacheSize: () => this.appController.cacheManager.getCacheSize(),
            
            // App state
            getAppState: () => ({
                config: this.appController.config,
                currentTimeframe: this.appController.uiManager.getCurrentTimeframe(),
                cacheStats: this.appController.getCacheStats()
            }),
            
            // Force refresh
            forceRefresh: () => this.appController.loadData(),
            
            // Test specific timeframe
            testTimeframe: (timeframe) => {
                this.appController.uiManager.elements.timeframeSelect.value = timeframe;
                this.appController.loadData();
            },
            
            // Performance testing
            benchmark: async () => {
                const start = performance.now();
                await this.appController.loadData();
                const end = performance.now();
                console.log(`Data load took ${(end - start).toFixed(2)}ms`);
                return end - start;
            }
        };

        console.log('🔧 Development tools available at window.devTools');
        console.log('📊 Use devTools.getCacheStats() to view cache information');
        console.log('🔄 Use devTools.forceRefresh() to manually refresh data');
        console.log('⚡ Use devTools.benchmark() to test performance');
    }

    logCacheHit(timeframe) {
        console.log(`✅ Cache hit for ${timeframe} timeframe`);
    }

    logCacheMiss(timeframe) {
        console.log(`❌ Cache miss for ${timeframe} timeframe`);
    }

    logApiCall(endpoint, timeframe) {
        console.log(`🌐 API call to ${endpoint} for ${timeframe} timeframe`);
    }

    logDataProcessing(inputPoints, outputPoints, timeframe) {
        console.log(`📊 Data processing: ${inputPoints} → ${outputPoints} points for ${timeframe} timeframe`);
    }

    // Performance monitoring
    startTimer(label) {
        return performance.mark(label);
    }

    endTimer(label) {
        performance.mark(`${label}-end`);
        performance.measure(label, label, `${label}-end`);
        const measure = performance.getEntriesByName(label)[0];
        console.log(`${label}: ${measure.duration.toFixed(2)}ms`);
        return measure.duration;
    }
}


