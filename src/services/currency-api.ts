/**
 * Currency API service layer
 */

import { API_CONFIG } from '@/constants';
import type { CurrencyCode, ExchangeRates } from '@/types';

/**
 * Exchange rate API service class
 */
export class CurrencyApiService {
  private static instance: CurrencyApiService;
  private cache = new Map<string, { data: ExchangeRates; timestamp: number }>();

  private constructor() {}

  static getInstance(): CurrencyApiService {
    if (!CurrencyApiService.instance) {
      CurrencyApiService.instance = new CurrencyApiService();
    }
    return CurrencyApiService.instance;
  }

  /**
   * Fetch exchange rates with caching
   */
  async fetchExchangeRates(
    baseCurrency: CurrencyCode = 'USD'
  ): Promise<ExchangeRates | null> {
    const cacheKey = `rates_${baseCurrency}`;
    const cached = this.cache.get(cacheKey);

    // Return cached data if still valid
    if (
      cached &&
      Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION * 1000
    ) {
      return cached.data;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        API_CONFIG.TIMEOUT
      );

      const response = await fetch(`${API_CONFIG.BASE_URL}/${baseCurrency}`, {
        signal: controller.signal,
        next: { revalidate: API_CONFIG.CACHE_DURATION },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const exchangeRates: ExchangeRates = {
        base_code: data.base,
        conversion_rates: data.rates,
        time_last_update_utc: data.date,
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: exchangeRates,
        timestamp: Date.now(),
      });

      return exchangeRates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);

      // Return cached data if available, even if expired
      if (cached) {
        console.warn('Using expired cached data due to API error');
        return cached.data;
      }

      return null;
    }
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache status
   */
  getCacheStatus(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const currencyApi = CurrencyApiService.getInstance();
