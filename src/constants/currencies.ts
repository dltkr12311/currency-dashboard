/**
 * Currency related constants
 */

import type { CurrencyCode, CurrencyInfo } from '@/types';

// Major currencies for our dashboard
export const MAJOR_CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: {
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    koreanName: '미국 달러',
  },
  EUR: {
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    koreanName: '유럽 유로',
  },
  JPY: {
    name: 'Japanese Yen',
    symbol: '¥',
    flag: '🇯🇵',
    koreanName: '일본 엔',
  },
  GBP: {
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    koreanName: '영국 파운드',
  },
  KRW: {
    name: 'Korean Won',
    symbol: '₩',
    flag: '🇰🇷',
    koreanName: '한국 원',
  },
  CNY: {
    name: 'Chinese Yuan',
    symbol: '¥',
    flag: '🇨🇳',
    koreanName: '중국 위안',
  },
} as const;

// Popular currency pairs for Korean users
export const POPULAR_CURRENCY_PAIRS: Array<[CurrencyCode, CurrencyCode]> = [
  ['USD', 'KRW'],
  ['EUR', 'KRW'],
  ['JPY', 'KRW'],
  ['GBP', 'KRW'],
  ['CNY', 'KRW'],
  ['USD', 'EUR'],
];

// Quick amount options for converter
export const QUICK_AMOUNTS = ['100', '1000', '10000', '100000'] as const;
