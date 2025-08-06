/**
 * Exchange rates hook - ViewModel for currency data
 */

import { currencyApi } from '@/services';
import type { CurrencyCode, ExchangeRates } from '@/types';
import { useCallback, useEffect, useState } from 'react';

interface UseExchangeRatesOptions {
  baseCurrency?: CurrencyCode;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseExchangeRatesReturn {
  data: ExchangeRates | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastFetch: Date | null;
}

export function useExchangeRates({
  baseCurrency = 'USD',
  autoRefresh = true,
  refreshInterval = 60000, // 1 minute
}: UseExchangeRatesOptions = {}): UseExchangeRatesReturn {
  const [data, setData] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await currencyApi.fetchExchangeRates(baseCurrency);

      if (result) {
        setData(result);
        setLastFetch(new Date());
      } else {
        setError('환율 정보를 가져올 수 없습니다.');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, autoRefresh, refreshInterval]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    lastFetch,
  };
}
