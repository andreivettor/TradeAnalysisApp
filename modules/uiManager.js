// UI Manager Module
export class UIManager {
    constructor() {
        this.elements = this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        return {
            timeframeSelect: document.getElementById('timeframe'),
            refreshBtn: document.getElementById('refreshBtn'),
            loadingElement: document.getElementById('loading'),
            errorElement: document.getElementById('error'),
            currentPriceElement: document.getElementById('currentPrice'),
            priceChangeElement: document.getElementById('priceChange'),
            volumeElement: document.getElementById('volume'),
            marketCapElement: document.getElementById('marketCap'),
            cacheStatusElement: document.getElementById('cacheStatus'),
            cacheStatusTextElement: document.getElementById('cacheStatusText')
        };
    }

    setupEventListeners() {
        this.elements.refreshBtn.addEventListener('click', () => {
            // Dispatch custom event for refresh
            window.dispatchEvent(new CustomEvent('forceRefresh'));
        });

        this.elements.timeframeSelect.addEventListener('change', () => {
            // Dispatch custom event for timeframe change
            window.dispatchEvent(new CustomEvent('timeframeChanged', {
                detail: { timeframe: parseFloat(this.elements.timeframeSelect.value) }
            }));
        });
    }

    showLoading(show) {
        this.elements.loadingElement.style.display = show ? 'flex' : 'none';
    }

    showError() {
        this.elements.errorElement.classList.remove('hidden');
    }

    hideError() {
        this.elements.errorElement.classList.add('hidden');
    }

    showCacheStatus(message) {
        if (this.elements.cacheStatusElement && this.elements.cacheStatusTextElement) {
            this.elements.cacheStatusTextElement.textContent = message;
            this.elements.cacheStatusElement.classList.remove('hidden');
        }
    }

    hideCacheStatus() {
        if (this.elements.cacheStatusElement) {
            this.elements.cacheStatusElement.classList.add('hidden');
        }
    }

    updateStats(stats, dataProcessor) {
        this.elements.currentPriceElement.textContent = dataProcessor.formatCurrency(stats.currentPrice);
        
        const changeClass = stats.priceChange >= 0 ? 'text-green-600' : 'text-red-600';
        const changeSymbol = stats.priceChange >= 0 ? '+' : '';
        
        // Remove existing color classes
        this.elements.priceChangeElement.className = 'text-2xl font-bold';
        this.elements.priceChangeElement.classList.add(changeClass);
        
        this.elements.priceChangeElement.textContent = `${changeSymbol}${stats.priceChange.toFixed(2)}%`;
        
        this.elements.volumeElement.textContent = dataProcessor.formatCurrency(stats.volume);
        this.elements.marketCapElement.textContent = dataProcessor.formatCurrency(stats.marketCap);
    }

    getCurrentTimeframe() {
        return parseFloat(this.elements.timeframeSelect.value);
    }

    addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .text-green-600 {
                color: #16a34a;
            }
            .text-red-600 {
                color: #dc2626;
            }
        `;
        document.head.appendChild(style);
    }
}


