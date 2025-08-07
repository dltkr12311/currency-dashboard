/**
 * Currency related type definitions
 */

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

export interface CurrencyInfo {
  name: string;
  symbol: string;
  flag: string;
  koreanName?: string;
}

export interface CurrencyCardProps {
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  rate: number;
  previousRate?: number;
  lastUpdate: string;
}

export interface CurrencyConverterProps {
  rates: Record<string, number>;
  baseCurrency: CurrencyCode;
}

export interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Currency code type based on major currencies
export type CurrencyCode = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'KRW' | 'CNY';

// Quick amount options for converter
export type QuickAmount = '100' | '1000' | '10000' | '100000';
