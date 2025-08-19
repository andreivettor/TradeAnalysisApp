// Environment Loader for Browser
// This script loads environment variables from .env files for browser usage

class EnvLoader {
    constructor() {
        this.env = {};
        this.loaded = false;
    }

    // Load environment variables from .env file
    async loadEnvFile() {
        try {
            const response = await fetch('.env');
            if (response.ok) {
                const content = await response.text();
                this.parseEnvContent(content);
                this.loaded = true;
                console.log('Environment variables loaded successfully');
            } else {
                console.warn('.env file not found, using defaults');
            }
        } catch (error) {
            console.warn('Could not load .env file:', error.message);
        }
    }

    // Parse .env file content
    parseEnvContent(content) {
        const lines = content.split('\n');
        
        lines.forEach(line => {
            line = line.trim();
            
            // Skip empty lines and comments
            if (!line || line.startsWith('#')) {
                return;
            }
            
            // Parse KEY=value format
            const equalIndex = line.indexOf('=');
            if (equalIndex > 0) {
                const key = line.substring(0, equalIndex).trim();
                const value = line.substring(equalIndex + 1).trim();
                
                // Remove quotes if present
                const cleanValue = value.replace(/^["']|["']$/g, '');
                
                this.env[key] = cleanValue;
            }
        });
    }

    // Get environment variable value
    get(key, defaultValue = '') {
        return this.env[key] || defaultValue;
    }

    // Set environment variable
    set(key, value) {
        this.env[key] = value;
    }

    // Get all environment variables
    getAll() {
        return { ...this.env };
    }

    // Check if environment is loaded
    isLoaded() {
        return this.loaded;
    }
}

// Create global environment loader instance
window.envLoader = new EnvLoader();

// Auto-load environment variables when script loads
window.envLoader.loadEnvFile().then(() => {
    // Make environment variables available globally
    window.env = window.envLoader.getAll();
    
    // Dispatch custom event when environment is loaded
    window.dispatchEvent(new CustomEvent('envLoaded', { 
        detail: { env: window.env } 
    }));
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnvLoader;
}


