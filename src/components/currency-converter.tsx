'use client';

import {
  calculateConversion,
  MAJOR_CURRENCIES,
  type CurrencyCode,
} from '@/lib/currency-api';
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CurrencyConverterProps {
  rates: Record<string, number>;
  baseCurrency: CurrencyCode;
}

export default function CurrencyConverter({
  rates,
  baseCurrency,
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('KRW');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount > 0 && rates) {
      const fromRate =
        fromCurrency === baseCurrency ? 1 : rates[fromCurrency] || 1;
      const toRate = toCurrency === baseCurrency ? 1 : rates[toCurrency] || 1;
      const result = calculateConversion(numAmount, fromRate, toRate);
      setConvertedAmount(result);
    } else {
      setConvertedAmount(0);
    }
  }, [amount, fromCurrency, toCurrency, rates, baseCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
        Currency Converter
      </h2>

      <div className='space-y-4'>
        {/* From Currency */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            From
          </label>
          <div className='flex space-x-3'>
            <input
              type='number'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className='flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
              placeholder='Enter amount'
            />
            <select
              value={fromCurrency}
              onChange={e => setFromCurrency(e.target.value as CurrencyCode)}
              className='px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
            >
              {Object.entries(MAJOR_CURRENCIES).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className='flex justify-center'>
          <button
            onClick={swapCurrencies}
            className='p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
            aria-label='Swap currencies'
          >
            <ArrowUpDown className='w-5 h-5 text-gray-600 dark:text-gray-400' />
          </button>
        </div>

        {/* To Currency */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            To
          </label>
          <div className='flex space-x-3'>
            <div className='flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700'>
              <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                {convertedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}
              </span>
            </div>
            <select
              value={toCurrency}
              onChange={e => setToCurrency(e.target.value as CurrencyCode)}
              className='px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
            >
              {Object.entries(MAJOR_CURRENCIES).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exchange Rate Info */}
        {rates && (
          <div className='mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              1 {fromCurrency} ={' '}
              {(convertedAmount / parseFloat(amount || '1')).toFixed(4)}{' '}
              {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
