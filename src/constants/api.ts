/**
 * API related constants
 */

// Exchange rate API configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.exchangerate-api.com/v4/latest',
  CACHE_DURATION: 3600, // 1 hour in seconds
  TIMEOUT: 10000, // 10 seconds
} as const;

// AdSense configuration
export const ADSENSE_CONFIG = {
  PUBLISHER_ID: 'ca-pub-YOUR_PUBLISHER_ID', // Replace with actual ID
  SLOTS: {
    BANNER_TOP: '1234567890',
    BANNER_BOTTOM: '1122334455',
    SIDEBAR: '0987654321',
  },
} as const;
