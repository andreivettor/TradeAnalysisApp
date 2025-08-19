// API Configuration
// This file reads from environment variables when available
// For browser usage, values can be overridden by setting window.env variables

// Wait for environment variables to be loaded
function waitForEnv() {
    return new Promise((resolve) => {
        if (window.envLoader && window.envLoader.isLoaded()) {
            resolve();
        } else {
            window.addEventListener('envLoaded', resolve, { once: true });
        }
    });
}

// Helper function to get environment variable value
function getEnvVar(key, defaultValue) {
    // Check if running in Node.js environment
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key] || defaultValue;
    }
    
    // Check if window.env is set (for browser overrides)
    if (typeof window !== 'undefined' && window.env && window.env[key]) {
        return window.env[key];
    }
    
    // Check if the value is available in a meta tag (for server-side rendering)
    const metaTag = document.querySelector(`meta[name="${key}"]`);
    if (metaTag) {
        return metaTag.getAttribute('content');
    }
    
    return defaultValue;
}

// Initialize configuration
async function initializeConfig() {
    // Wait for environment variables to be loaded
    await waitForEnv();
    
    const config = {
        // CoinGecko API Key - Get yours from: https://www.coingecko.com/en/api
        GECKO_API_KEY: getEnvVar('GECKO_API_KEY', 'CG-ooZeajEhTcoJdcNwMudWs7aa'),
        
        // API Base URL
        GECKO_API_BASE_URL: getEnvVar('GECKO_API_BASE_URL', 'https://api.coingecko.com/api/v3'),
        
        // App Settings
        AUTO_REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes in milliseconds
        
        // Chart Settings
        CHART_HEIGHT: 400,
        CHART_TENSION: 0.4,
        CHART_BORDER_WIDTH: 2
    };
    
    // Make config available globally
    window.config = config;
    
    // Dispatch event when config is ready
    window.dispatchEvent(new CustomEvent('configReady', { 
        detail: { config: config } 
    }));
    
    return config;
}

// For browser usage, you can override values by setting window.env
// Example: window.env = { GECKO_API_KEY: 'your_actual_key' };

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeConfig, getEnvVar };
}

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
    initializeConfig();
}
