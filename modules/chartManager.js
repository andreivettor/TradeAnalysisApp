// Chart Management Module
export class ChartManager {
    constructor() {
        this.chart = null;
        this.registerFinancialComponents();
    }

    // Register Chart.js Financial components
    registerFinancialComponents() {
        if (!window.Chart) {
            console.error('Chart.js not loaded');
            return;
        }

        try {
            // Check if financial components are available
            const hasFinancialPlugin = window.Chart.registry && 
                (window.Chart.registry.getController('candlestick') || 
                 window.CandlestickController ||
                 window.Chart.CandlestickController);

            if (hasFinancialPlugin) {
                console.log('✅ Chart.js Financial plugin is available');
            } else {
                console.warn('⚠️  Chart.js Financial plugin not detected, chart may not display properly');
                
                // Try to register if components exist globally
                if (window.CandlestickController && window.Chart.register) {
                    Chart.register(window.CandlestickController, window.CandlestickElement);
                    console.log('🔧 Manually registered financial components');
                }
            }

            // Log available chart types for debugging
            if (window.Chart.registry && window.Chart.registry.controllers) {
                const availableTypes = Object.keys(window.Chart.registry.controllers);
                console.log('Available chart types:', availableTypes);
            }

        } catch (error) {
            console.error('Error registering financial components:', error);
        }
    }

    // Helper function to get computed CSS custom property values
    getCSSVariableValue(variableName) {
        return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    }

    // Helper function to convert HSL to RGB
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 1) {
            r = c; g = x; b = 0;
        } else if (1 <= h && h < 2) {
            r = x; g = c; b = 0;
        } else if (2 <= h && h < 3) {
            r = 0; g = c; b = x;
        } else if (3 <= h && h < 4) {
            r = 0; g = x; b = c;
        } else if (4 <= h && h < 5) {
            r = x; g = 0; b = c;
        } else if (5 <= h && h < 6) {
            r = c; g = 0; b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return `rgb(${r}, ${g}, ${b})`;
    }

    // Helper function to get chart colors from CSS variables
    getChartColors() {
        const primaryHsl = this.getCSSVariableValue('--primary');
        const backgroundHsl = this.getCSSVariableValue('--background');
        const cardHsl = this.getCSSVariableValue('--card');
        const cardForegroundHsl = this.getCSSVariableValue('--card-foreground');
        const borderHsl = this.getCSSVariableValue('--border');
        const mutedForegroundHsl = this.getCSSVariableValue('--muted-foreground');

        // Parse HSL values (format: "221.2 83.2% 53.3%")
        const parseHsl = (hslString) => {
            const parts = hslString.split(' ');
            return {
                h: parseFloat(parts[0]),
                s: parseFloat(parts[1]),
                l: parseFloat(parts[2])
            };
        };

        const primary = parseHsl(primaryHsl);
        const background = parseHsl(backgroundHsl);
        const card = parseHsl(cardHsl);
        const cardForeground = parseHsl(cardForegroundHsl);
        const border = parseHsl(borderHsl);
        const mutedForeground = parseHsl(mutedForegroundHsl);

        return {
            primary: this.hslToRgb(primary.h, primary.s, primary.l),
            background: this.hslToRgb(background.h, background.s, background.l),
            card: this.hslToRgb(card.h, card.s, card.l),
            cardForeground: this.hslToRgb(cardForeground.h, cardForeground.s, cardForeground.l),
            border: this.hslToRgb(border.h, border.s, border.l),
            mutedForeground: this.hslToRgb(mutedForeground.h, mutedForeground.s, mutedForeground.l)
        };
    }

    updateChart(ohlcData, timeframe, config) {
        const ctx = document.getElementById('priceChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.chart) {
            this.chart.destroy();
        }
        
        // Validate input data
        if (!ohlcData || ohlcData.length === 0) {
            console.warn('No OHLC data provided to updateChart');
            this.showErrorMessage(ctx, 'No data available');
            return;
        }
        
        console.log(`Creating chart with ${ohlcData.length} data points`);
        
        // Get chart colors from CSS variables
        const colors = this.getChartColors();
        
        try {
            this.chart = new Chart(ctx, {
            type: 'candlestick',
            data: {
                datasets: [{
                    label: 'BTC/USD Price',
                    data: ohlcData,
                    // Candlestick specific styling
                    color: {
                        up: '#16a34a',      // Green for bullish candles
                        down: '#dc2626',    // Red for bearish candles
                        unchanged: colors.mutedForeground
                    },
                    borderColor: {
                        up: '#15803d',      // Darker green border for bullish
                        down: '#b91c1c',    // Darker red border for bearish  
                        unchanged: colors.mutedForeground
                    },
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: colors.card,
                        titleColor: colors.cardForeground,
                        bodyColor: colors.cardForeground,
                        borderColor: colors.border,
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                const point = context.parsed;
                                return [
                                    `Open: $${point.o?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}`,
                                    `High: $${point.h?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}`,
                                    `Low: $${point.l?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}`,
                                    `Close: $${point.c?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: this.getTimeUnit(timeframe),
                            displayFormats: {
                                minute: 'HH:mm',
                                hour: 'MMM dd HH:mm',
                                day: 'MMM dd',
                                week: 'MMM dd',
                                month: 'MMM yyyy'
                            }
                        },
                        adapters: {
                            date: {
                                locale: 'en'
                            }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: colors.mutedForeground,
                            font: {
                                size: 11
                            },
                            maxTicksLimit: 8,
                            autoSkip: true
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'right',
                        grid: {
                            color: colors.border,
                            drawBorder: false
                        },
                        ticks: {
                            color: colors.mutedForeground,
                            font: {
                                size: 11
                            },
                            padding: 10,
                            callback: function(value) {
                                return '$' + value.toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                        },
                        // Add some padding to the price range
                        afterDataLimits: function(axis) {
                            const range = axis.max - axis.min;
                            const padding = range * 0.05; // 5% padding
                            axis.max += padding;
                            axis.min -= padding;
                        }
                    }
                }
            }
        });
        
        console.log('✅ Candlestick chart created successfully');
        
        } catch (error) {
            console.error('❌ Error creating candlestick chart:', error);
            
            // Try fallback to line chart with close prices
            this.createFallbackChart(ctx, ohlcData, colors, timeframe);
        }
    }

    // Fallback to line chart if candlestick fails
    createFallbackChart(ctx, ohlcData, colors, timeframe) {
        console.log('📈 Creating fallback line chart...');
        
        try {
            // Convert OHLC data to close prices for line chart
            const closePrices = ohlcData.map(point => ({
                x: point.x,
                y: point.c
            }));

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'BTC/USD Close Price',
                        data: closePrices,
                        borderColor: colors.primary,
                        backgroundColor: colors.primary + '20',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: colors.card,
                            titleColor: colors.cardForeground,
                            bodyColor: colors.cardForeground,
                            borderColor: colors.border,
                            borderWidth: 1,
                            cornerRadius: 8
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: { unit: this.getTimeUnit(timeframe) }
                        },
                        y: {
                            position: 'right',
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
            
            console.log('✅ Fallback line chart created successfully');
            
        } catch (fallbackError) {
            console.error('❌ Fallback chart also failed:', fallbackError);
            this.showErrorMessage(ctx, 'Unable to create chart');
        }
    }

    // Show error message on canvas
    showErrorMessage(ctx, message) {
        ctx.fillStyle = '#ef4444';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(message, ctx.canvas.width / 2, ctx.canvas.height / 2);
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

    destroyChart() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }
}
