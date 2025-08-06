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
  };

  // 통화별 소수점 규칙 (사용자 친화적으로)
  switch (currencyCode) {
    case 'KRW':
      // 한국 원 - 소수점 없음
      options.minimumFractionDigits = 0;
      options.maximumFractionDigits = 0;
      break;

    case 'JPY':
      // 일본 엔 - 소수점 최대 2자리 (100엔 이상일 때는 정수)
      if (amount >= 100) {
        options.minimumFractionDigits = 0;
        options.maximumFractionDigits = 0;
      } else {
        options.minimumFractionDigits = 0;
        options.maximumFractionDigits = 2;
      }
      break;

    case 'USD':
    case 'EUR':
    case 'GBP':
      // 달러, 유로, 파운드 - 최대 2자리 (1달러 이상일 때는 2자리, 미만일 때는 4자리)
      if (amount >= 1) {
        options.minimumFractionDigits = 2;
        options.maximumFractionDigits = 2;
      } else {
        options.minimumFractionDigits = 2;
        options.maximumFractionDigits = 4;
      }
      break;

    case 'CNY':
      // 중국 위안 - 최대 2자리
      options.minimumFractionDigits = 0;
      options.maximumFractionDigits = 2;
      break;

    default:
      // 기본값
      options.minimumFractionDigits = 2;
      options.maximumFractionDigits = 2;
  }

  return new Intl.NumberFormat(locale, options).format(amount);
}

/**
 * Format Korean rate display (for currency cards)
 */
export function formatKoreanRate(amount: number): string {
  // 큰 숫자는 소수점 적게, 작은 숫자는 소수점 많이
  let maximumFractionDigits = 2;
  let minimumFractionDigits = 0;

  if (amount >= 1000) {
    // 1000 이상 - 소수점 없음 (예: 1,388원)
    maximumFractionDigits = 0;
    minimumFractionDigits = 0;
  } else if (amount >= 100) {
    // 100~999 - 소수점 최대 1자리 (예: 163.5엔)
    maximumFractionDigits = 1;
    minimumFractionDigits = 0;
  } else if (amount >= 1) {
    // 1~99 - 소수점 최대 2자리 (예: 7.19위안)
    maximumFractionDigits = 2;
    minimumFractionDigits = 0;
  } else {
    // 1 미만 - 소수점 최대 4자리 (예: 0.0072달러)
    maximumFractionDigits = 4;
    minimumFractionDigits = 2;
  }

  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits,
    maximumFractionDigits,
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
