/**
 * Currency utility functions
 */

import { MAJOR_CURRENCIES } from '@/constants';
import type { CurrencyCode } from '@/types';

/**
 * Calculate currency conversion
 */
export function calculateConversion(
  amount: number,
  fromRate: number,
  toRate: number
): number {
  if (fromRate <= 0 || toRate <= 0) {
    throw new Error('Invalid exchange rates');
  }
  return (amount / fromRate) * toRate;
}

/**
 * Format currency with proper locale and options
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
  locale: string = 'ko-KR'
): string {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  };

  // KRW는 소수점 없이 표시
  if (currencyCode === 'KRW') {
    options.minimumFractionDigits = 0;
    options.maximumFractionDigits = 0;
  }

  return new Intl.NumberFormat(locale, options).format(amount);
}

/**
 * Format Korean rate display
 */
export function formatKoreanRate(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount);
}

/**
 * Get currency Korean name
 */
export function getCurrencyKoreanName(code: CurrencyCode): string {
  return (
    MAJOR_CURRENCIES[code]?.koreanName || MAJOR_CURRENCIES[code]?.name || code
  );
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(code: CurrencyCode): string {
  return MAJOR_CURRENCIES[code]?.symbol || code;
}

/**
 * Get currency flag emoji
 */
export function getCurrencyFlag(code: CurrencyCode): string {
  return MAJOR_CURRENCIES[code]?.flag || '🏳️';
}

/**
 * Validate currency code
 */
export function isValidCurrencyCode(code: string): code is CurrencyCode {
  return Object.keys(MAJOR_CURRENCIES).includes(code);
}

/**
 * Parse numeric input (remove non-numeric characters except decimal point)
 */
export function parseNumericInput(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, '');

  // Prevent multiple decimal points
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }

  return cleaned;
}
