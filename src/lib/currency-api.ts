// Currency API utilities for fetching exchange rates
// Using exchangerate-api.com (free tier: 1500 requests/month)

export interface ExchangeRates {
  base_code: string;
  conversion_rates: Record<string, number>;
  time_last_update_utc: string;
}

export interface CurrencyPair {
  from: string;
  to: string;
  rate: number;
  lastUpdate: string;
}

// Major currencies for our dashboard
export const MAJOR_CURRENCIES = {
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  KRW: { name: 'Korean Won', symbol: '₩', flag: '🇰🇷' },
  CNY: { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
} as const;

export type CurrencyCode = keyof typeof MAJOR_CURRENCIES;

// Free API endpoint (no API key required for basic usage)
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export async function fetchExchangeRates(
  baseCurrency: CurrencyCode = 'USD'
): Promise<ExchangeRates | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${baseCurrency}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      base_code: data.base,
      conversion_rates: data.rates,
      time_last_update_utc: data.date,
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

export function calculateConversion(
  amount: number,
  fromRate: number,
  toRate: number
): number {
  return (amount / fromRate) * toRate;
}

export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount);
}
