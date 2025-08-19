// API Service Module
export class ApiService {
    constructor(config) {
        this.config = config;
    }

    async fetchBTCData(timeframe) {
        try {
            // Calculate appropriate days parameter for API
            const days = Math.max(timeframe, 1); // Minimum 1 day for API
            
            // Fetch OHLC candlestick data
            const ohlcResponse = await fetch(
                `${this.config.GECKO_API_BASE_URL}/coins/bitcoin/ohlc?vs_currency=usd&days=${days}&x_cg_demo_api_key=${this.config.GECKO_API_KEY}`
            );
            
            if (!ohlcResponse.ok) {
                throw new Error(`HTTP error! status: ${ohlcResponse.status}`);
            }
            
            const ohlcData = await ohlcResponse.json();
            
            // Fetch current market data
            const marketResponse = await fetch(
                `${this.config.GECKO_API_BASE_URL}/coins/bitcoin?x_cg_demo_api_key=${this.config.GECKO_API_KEY}`
            );
            
            if (!marketResponse.ok) {
                throw new Error(`HTTP error! status: ${marketResponse.status}`);
            }
            
            const marketData = await marketResponse.json();
            
            return {
                ohlc: ohlcData,
                marketData: marketData
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async fetchMarketData() {
        try {
            const response = await fetch(
                `${this.config.GECKO_API_BASE_URL}/coins/bitcoin?x_cg_demo_api_key=${this.config.GECKO_API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching market data:', error);
            throw error;
        }
    }

    async fetchPriceData(days) {
        try {
            const response = await fetch(
                `${this.config.GECKO_API_BASE_URL}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${this.config.GECKO_API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching price data:', error);
            throw error;
        }
    }
}
