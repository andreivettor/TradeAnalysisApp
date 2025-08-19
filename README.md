# Trade Analysis App - BTCUSDC.P

A modern, responsive web application for analyzing Bitcoin (BTC) trading data using the CoinGecko API. Built with a **shadcn/ui-inspired design system** that provides beautiful, accessible, and customizable components.

## ✨ Features

- 🎨 **shadcn/ui Design System**: Modern, accessible UI components with CSS custom properties
- 🕯️ **Interactive Candlestick Charts**: Professional OHLC candlestick charts using Chart.js Financial
- 📊 **OHLC Data Visualization**: Open, High, Low, Close price data with green/red candles
- 🕒 **Multiple Timeframes**: View data from 1 minute to 1 day with 6 precision levels
- 📈 **Real-time Statistics**: Current price, 24h change, volume, and market cap
- 🔄 **Auto-refresh**: Data updates automatically every 5 minutes
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode Ready**: Built-in support for system dark mode preferences
- ♿ **Accessible**: Follows modern accessibility standards with improved text contrast
- 📖 **Enhanced Readability**: Optimized text contrast for better user experience
- 🚀 **Smart Caching**: Intelligent API result caching for faster data loading
- 📊 **Data Optimization**: Ensures sufficient data points for each timeframe

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Design System**: shadcn/ui-inspired with CSS custom properties
- **Charts**: Chart.js with chartjs-chart-financial for candlestick charts
- **API**: CoinGecko API for cryptocurrency data
- **Styling**: Modern CSS with utility classes and design tokens

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Configure API key** (see Configuration section below)
3. **Open** `index.html` in your web browser
4. **No installation required** - the app runs entirely in the browser

## ⚙️ Configuration

### API Key Setup

1. **Get a CoinGecko API Key**:
   - Visit [CoinGecko API](https://www.coingecko.com/en/api)
   - Sign up/Login to your account
   - Navigate to **API Keys** section
   - Generate a new API key

2. **Set Environment Variable**:
   - Create a `.env` file in the project root
   - Add your API key: `GECKO_API_KEY=your_actual_api_key_here`
   - The app will automatically load this environment variable

```bash
# .env
GECKO_API_KEY=your_actual_api_key_here
GECKO_API_BASE_URL=https://api.coingecko.com/api/v3
```

**Note**: The `.env` file is already in `.gitignore` to prevent accidental commits of sensitive data.

### Alternative Configuration Methods

You can also configure the API key in several ways:

1. **Environment File (Recommended)**:
   ```bash
   # .env
   GECKO_API_KEY=your_actual_api_key_here
   ```

2. **Browser Override** (for testing):
   ```javascript
   // In browser console
   window.env = { GECKO_API_KEY: 'your_key_here' };
   ```

3. **Direct Edit** (not recommended for production):
   - Edit `config.js` and replace the default value

## 🎨 Design System

This app uses a **shadcn/ui-inspired design system** featuring:

- **CSS Custom Properties**: Consistent color schemes and spacing
- **Utility Classes**: Modern CSS utility-first approach
- **Design Tokens**: Standardized colors, typography, and spacing
- **Responsive Grid**: Flexible layout system
- **Component Library**: Reusable UI components

### Color Palette
- **Primary**: Modern blue (#3b82f6)
- **Background**: Clean white with subtle borders
- **Text**: High contrast for readability
- **Accents**: Semantic colors for success/error states

## 🔑 API Configuration

The app is pre-configured with a demo CoinGecko API key:
- **Placeholder API Key**: `CG-ooZeajEhTcoJdcNwMudWs7aa`
- **Base URL**: `https://api.coingecko.com/api/v3`

**Important**: The demo key has rate limits. For production use, replace it with your own API key in `config.js`.

## 🚀 Performance & Caching

### Smart Caching System
The app implements intelligent caching to improve performance and reduce API calls:

- **Cache Duration**: 5 minutes (configurable)
- **Per-Timeframe Caching**: Each timeframe has its own cache
- **Automatic Invalidation**: Cache expires after 5 minutes
- **Manual Refresh**: Force refresh button clears cache and fetches new data
- **Cache Status Display**: Visual indicator when using cached data

### Data Optimization
Each timeframe is optimized to ensure sufficient data points:

- **Minimum Data Points**: 50 points for smooth charts
- **Maximum Data Points**: 200 points for optimal performance
- **Smart Sampling**: Evenly distributes data points for consistent visualization
- **Fallback Handling**: Uses 24-hour data if insufficient points available

### Cache Management
```javascript
// Cache is automatically managed, but you can:
// Force refresh (clears cache)
document.getElementById('refreshBtn').click();

// Check cache status in console
console.log('Cache size:', apiCache.size);
```

## 🏗️ Modular Architecture

The app is built with a **modular architecture** designed to reduce LLM coding costs and improve maintainability:

### **Module Benefits:**
- **Focused Development**: Each module has a single responsibility
- **Easier Debugging**: Issues are isolated to specific modules
- **Reduced Context**: Smaller files mean less context needed for changes
- **Better Testing**: Modules can be tested in isolation
- **Reusability**: Modules can be reused in other projects

### **Core Modules:**
- **`CacheManager`**: Handles API result caching and storage
- **`DataProcessor`**: Optimizes data for different timeframes
- **`ChartManager`**: Manages Chart.js operations and styling
- **`ApiService`**: Handles all CoinGecko API interactions
- **`UIManager`**: Manages DOM interactions and UI updates
- **`AppController`**: Orchestrates all modules and application flow

### **Development Tools:**
In development mode, useful debugging tools are available:
```javascript
// Access development tools in browser console
window.devTools.getCacheStats();    // View cache information
window.devTools.forceRefresh();     // Force data refresh
window.devTools.benchmark();        // Test performance
window.devTools.getAppState();      // View current app state
```

### **Module Structure:**
```
modules/
├── index.js              # Single import point
├── appController.js      # Main orchestrator
├── cache.js             # Cache management
├── dataProcessor.js     # Data processing
├── chartManager.js      # Chart operations
├── apiService.js        # API interactions
├── uiManager.js         # UI management
└── devUtils.js          # Development tools
```

See `modules/README.md` for detailed module documentation.

## 📱 Usage

1. **Select Timeframe**: Choose from 1 minute to 1 day using the dropdown (6 precision levels)
2. **View Chart**: Interactive price chart with hover tooltips
3. **Monitor Stats**: Real-time market statistics displayed below the chart
4. **Refresh Data**: Click the refresh button to manually update data (clears cache)
5. **Auto-updates**: Data refreshes automatically every 5 minutes
6. **Cache Status**: Visual indicator shows when using cached data for faster loading

## 📊 Chart Features

- **Candlestick Charts**: Professional OHLC (Open, High, Low, Close) visualization
- **Color-coded Candles**: Green for bullish (up) and red for bearish (down) movements
- **Interactive Tooltips**: Hover over candles for detailed OHLC price information
- **Responsive Design**: Charts adapt to different screen sizes
- **Time-based Scaling**: X-axis automatically adjusts based on selected timeframe
- **shadcn Colors**: Uses design system colors for consistency
- **Data Optimization**: Ensures 50-200 data points for smooth visualization
- **Smart Sampling**: Evenly distributes data points across timeframes

## 📁 File Structure

```
TradeAnalysisApp/
├── index.html          # Main HTML with shadcn-style components
├── styles.css          # shadcn/ui design system and utilities
├── script.js           # Main application entry point (ES6 modules)
├── config.js           # Configuration file with environment variable support
├── env-loader.js       # Browser environment variable loader
├── server.js           # Node.js development server with .env support
├── .env                # Environment variables (API keys, not committed)
├── .gitignore          # Git ignore rules
├── package.json        # Project configuration and dependencies
├── README.md           # This documentation file
├── LICENSE             # Project license
└── modules/            # Modular architecture components
    ├── index.js        # Single import point for all modules
    ├── appController.js # Main orchestrator and app logic
    ├── cache.js        # Cache management and storage
    ├── dataProcessor.js # Data processing and optimization
    ├── chartManager.js # Chart.js operations and styling
    ├── apiService.js   # CoinGecko API interactions
    ├── uiManager.js    # DOM interactions and UI updates
    ├── devUtils.js     # Development tools and debugging
    └── README.md       # Modular architecture documentation
```

## 🌐 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🔌 API Endpoints Used

- **Market Chart**: `/coins/bitcoin/market_chart` - Historical price data
- **Market Data**: `/coins/bitcoin` - Current market statistics

## 🎯 Features in Detail

### Timeframe Selection
- **1 Day**: Hourly data points for detailed daily analysis
- **4 Hours**: 4-hour intervals for intraday analysis
- **1 Hour**: Hourly data points for short-term trends
- **15 Minutes**: 15-minute intervals for precise timing
- **5 Minutes**: 5-minute intervals for scalping analysis
- **1 Minute**: 1-minute intervals for real-time trading

### Statistics Display
- **Current Price**: Real-time BTC price in USD
- **24h Change**: Percentage change over the last 24 hours (color-coded)
- **24h Volume**: Total trading volume in the last 24 hours
- **Market Cap**: Total market capitalization

### Responsive Design
- **Desktop**: Full-width layout with side-by-side controls
- **Tablet**: Optimized spacing and touch-friendly controls
- **Mobile**: Stacked layout with mobile-optimized interactions

## 🎨 Customization

You can easily customize the app by modifying:

### Colors & Themes
```css
:root {
    --primary: 221.2 83.2% 53.3%;        /* Primary blue */
    --background: 0 0% 100%;              /* White background */
    --card: 0 0% 100%;                    /* Card background */
    --border: 214.3 31.8% 91.4%;         /* Border colors */
}
```

### App Settings
```javascript
// config.js
const config = {
    AUTO_REFRESH_INTERVAL: 5 * 60 * 1000,  // 5 minutes
    CHART_HEIGHT: 400,                      // Chart height in pixels
    CHART_TENSION: 0.4,                     // Chart line smoothness
    CHART_BORDER_WIDTH: 2                   // Chart line width
};
```

### Components
- **Colors**: Update CSS variables in `styles.css`
- **Timeframes**: Modify the options in `index.html`
- **API Endpoints**: Change the API configuration in `config.js`
- **Chart Options**: Customize Chart.js configuration in `script.js`

## 🔧 Development

### Local Development Server

The app provides multiple ways to run a local development server:

#### Option 1: Node.js Server (Recommended)
```bash
# Install dependencies
npm install

# Start development server with environment variable support
npm start
# or
npm run dev
```

#### Option 2: Python Server
```bash
# Simple Python HTTP server
npm run serve:py
# or
python -m http.server 8000
```

#### Option 3: Direct File Access
- Simply open `index.html` in your browser
- Note: Environment variables won't be loaded this way

### Environment Variables

The app automatically loads environment variables from a `.env` file:

```bash
# .env
GECKO_API_KEY=your_actual_api_key_here
GECKO_API_BASE_URL=https://api.coingecko.com/api/v3
```

**Important**: Use the Node.js server (`npm start`) to properly load environment variables.

### Design System Principles
- **Consistency**: All components follow the same design patterns
- **Accessibility**: Built with accessibility in mind
- **Responsiveness**: Mobile-first responsive design
- **Performance**: Optimized for fast loading and smooth interactions

## 🔒 Security

- **API Keys**: Stored in `config.js` (not committed to repo)
- **Environment Variables**: `.env` files are gitignored
- **No Sensitive Data**: No hardcoded secrets in the codebase

## 🐛 Troubleshooting

- **Chart not loading**: Check your internet connection and API key validity
- **Data not updating**: Ensure the CoinGecko API is accessible
- **Display issues**: Try refreshing the page or clearing browser cache
- **Styling problems**: Verify CSS custom properties are loading correctly
- **API errors**: Check browser console for specific error messages

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

## 🆘 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify your internet connection
3. Ensure the CoinGecko API is accessible
4. Check that all files are properly loaded
5. Verify CSS custom properties are working
6. Confirm your API key is valid and has proper permissions

## 🌟 Design System Credits

This app uses design principles inspired by:
- **shadcn/ui** - Modern component design patterns
- **Tailwind CSS** - Utility-first CSS approach
- **Modern Web Standards** - Accessibility and performance best practices

---

**Enjoy analyzing your Bitcoin trading data with our beautiful shadcn-inspired design! 📈🚀✨**