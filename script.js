// Main Application Entry Point
import { AppController } from './modules/appController.js';

// Global app instance
let appController = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for configuration to be ready
    if (window.config) {
        initializeApp();
    } else {
        window.addEventListener('configReady', initializeApp, { once: true });
    }
});

function initializeApp() {
    try {
        // Create and initialize the app controller
        appController = new AppController(window.config);
        
        // Load initial data
        appController.loadData();
        
        console.log('🚀 Trade Analysis App initialized successfully!');
        
        // Expose app controller globally for debugging/development
        window.appController = appController;
        
    } catch (error) {
        console.error('❌ Failed to initialize app:', error);
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (appController) {
        appController.destroy();
    }
});
