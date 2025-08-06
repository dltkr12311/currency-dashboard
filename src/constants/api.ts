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
  PUBLISHER_ID: 'ca-pub-7707972978209680',
  SLOTS: {
    BANNER_TOP: '1234567890', // AdSense에서 생성한 실제 슬롯 ID로 교체 필요
    BANNER_BOTTOM: '1122334455', // AdSense에서 생성한 실제 슬롯 ID로 교체 필요
    SIDEBAR: '0987654321', // AdSense에서 생성한 실제 슬롯 ID로 교체 필요
  },
} as const;
