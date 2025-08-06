/**
 * Currency converter hook - ViewModel for conversion logic
 */

import type { CurrencyCode } from '@/types';
import { calculateConversion, parseNumericInput } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseCurrencyConverterOptions {
  rates: Record<string, number>;
  baseCurrency: CurrencyCode;
  initialAmount?: string;
  initialFromCurrency?: CurrencyCode;
  initialToCurrency?: CurrencyCode;
}

interface UseCurrencyConverterReturn {
  amount: string;
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  convertedAmount: number;
  rate: number;
  isAnimating: boolean;
  setAmount: (amount: string) => void;
  setFromCurrency: (currency: CurrencyCode) => void;
  setToCurrency: (currency: CurrencyCode) => void;
  swapCurrencies: () => void;
  setQuickAmount: (amount: string) => void;
}

export function useCurrencyConverter({
  rates,
  baseCurrency,
  initialAmount = '100',
  initialFromCurrency = 'USD',
  initialToCurrency = 'KRW',
}: UseCurrencyConverterOptions): UseCurrencyConverterReturn {
  const [amount, setAmountState] = useState(initialAmount);
  const [fromCurrency, setFromCurrency] =
    useState<CurrencyCode>(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState<CurrencyCode>(initialToCurrency);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate conversion rate
  const rate = useMemo(() => {
    if (!rates) return 0;
    const fromRate =
      fromCurrency === baseCurrency ? 1 : rates[fromCurrency] || 1;
    const toRate = toCurrency === baseCurrency ? 1 : rates[toCurrency] || 1;
    return calculateConversion(1, fromRate, toRate);
  }, [rates, fromCurrency, toCurrency, baseCurrency]);

  // Calculate converted amount
  const convertedAmount = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount <= 0 || !rates) return 0;

    const fromRate =
      fromCurrency === baseCurrency ? 1 : rates[fromCurrency] || 1;
    const toRate = toCurrency === baseCurrency ? 1 : rates[toCurrency] || 1;

    return calculateConversion(numAmount, fromRate, toRate);
  }, [amount, fromCurrency, toCurrency, rates, baseCurrency]);

  // Handle amount change with validation
  const setAmount = useCallback((newAmount: string) => {
    const cleanedAmount = parseNumericInput(newAmount);
    setAmountState(cleanedAmount);
  }, []);

  // Handle quick amount selection
  const setQuickAmount = useCallback((quickAmount: string) => {
    setAmountState(quickAmount);
  }, []);

  // Swap currencies
  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  // Animation effect when values change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [convertedAmount]);

  return {
    amount,
    fromCurrency,
    toCurrency,
    convertedAmount,
    rate,
    isAnimating,
    setAmount,
    setFromCurrency,
    setToCurrency,
    swapCurrencies,
    setQuickAmount,
  };
}
