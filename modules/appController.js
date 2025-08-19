// Main App Controller
import { CacheManager } from './cache.js';
import { DataProcessor } from './dataProcessor.js';
import { ChartManager } from './chartManager.js';
import { ApiService } from './apiService.js';
import { UIManager } from './uiManager.js';
import { DevUtils } from './devUtils.js';

export class AppController {
    constructor(config) {
        this.config = config;
        this.cacheManager = new CacheManager();
        this.dataProcessor = new DataProcessor();
        this.chartManager = new ChartManager();
        this.apiService = new ApiService(config);
        this.uiManager = new UIManager();
        
        // Initialize development tools in development mode
        if (this.isDevelopmentMode()) {
            this.devUtils = new DevUtils(this);
        }
        
        this.setupEventListeners();
        this.addCustomStyles();
    }

    isDevelopmentMode() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.protocol === 'file:';
    }

    setupEventListeners() {
        // Listen for custom events from UI
        window.addEventListener('forceRefresh', () => {
            this.cacheManager.clearCache();
            this.uiManager.hideCacheStatus();
            this.loadData();
        });

        window.addEventListener('timeframeChanged', (event) => {
            this.loadData();
        });

        // Auto-refresh using config interval
        setInterval(() => {
            if (this.uiManager.elements.loadingElement.style.display === 'none') {
                this.loadData();
            }
        }, this.config.AUTO_REFRESH_INTERVAL);
    }

    addCustomStyles() {
        this.uiManager.addCustomStyles();
    }

    async loadData() {
        try {
            this.uiManager.showLoading(true);
            this.uiManager.hideError();
            
            const timeframe = this.uiManager.getCurrentTimeframe();
            const data = await this.fetchBTCData(timeframe);
            
            if (data) {
                this.chartManager.updateChart(data.ohlc, timeframe, this.config);
                this.uiManager.updateStats(data.stats, this.dataProcessor);
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.uiManager.showError();
        } finally {
            this.uiManager.showLoading(false);
        }
    }

    async fetchBTCData(timeframe) {
        try {
            // Check cache first
            const cachedData = this.cacheManager.getCachedData(timeframe);
            if (cachedData) {
                this.uiManager.showCacheStatus(`Using cached data (${this.dataProcessor.formatTimeframeDisplay(timeframe)})`);
                if (this.devUtils) this.devUtils.logCacheHit(timeframe);
                return cachedData;
            }

            this.uiManager.hideCacheStatus();
            if (this.devUtils) this.devUtils.logCacheMiss(timeframe);
            
            // Fetch fresh data from API
            const apiData = await this.apiService.fetchBTCData(timeframe);
            
            // Process OHLC data based on timeframe
            const processedOhlc = this.dataProcessor.processDataForTimeframe(apiData.ohlc, timeframe);
            
            // Convert to Chart.js candlestick format
            const chartData = this.dataProcessor.convertToChartJsFormat(processedOhlc);
            
            const result = {
                ohlc: chartData,
                stats: {
                    currentPrice: apiData.marketData.market_data.current_price.usd,
                    priceChange: apiData.marketData.market_data.price_change_percentage_24h,
                    volume: apiData.marketData.market_data.total_volume.usd,
                    marketCap: apiData.marketData.market_data.market_cap.usd
                }
            };
            
            // Cache the result
            this.cacheManager.setCachedData(timeframe, result);
            
            return result;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Public methods for external access
    getCacheStats() {
        return this.cacheManager.getCacheStats();
    }

    clearCache() {
        this.cacheManager.clearCache();
        this.uiManager.hideCacheStatus();
    }

    destroy() {
        this.chartManager.destroyChart();
        // Remove event listeners if needed
        window.removeEventListener('forceRefresh', this.loadData);
        window.removeEventListener('timeframeChanged', this.loadData);
    }
}
