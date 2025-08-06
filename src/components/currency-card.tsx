'use client';

import { MAJOR_CURRENCIES, type CurrencyCode } from '@/lib/currency-api';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface CurrencyCardProps {
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  rate: number;
  previousRate?: number;
  lastUpdate: string;
}

export default function CurrencyCard({
  fromCurrency,
  toCurrency,
  rate,
  previousRate,
  lastUpdate,
}: CurrencyCardProps) {
  const fromCurrencyInfo = MAJOR_CURRENCIES[fromCurrency];
  const toCurrencyInfo = MAJOR_CURRENCIES[toCurrency];

  const change = previousRate ? rate - previousRate : 0;
  const changePercent = previousRate ? (change / previousRate) * 100 : 0;
  const isPositive = change > 0;

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300'>
      {/* Currency Pair Header */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <span className='text-2xl'>{fromCurrencyInfo.flag}</span>
          <div>
            <h3 className='font-semibold text-gray-900 dark:text-white'>
              {fromCurrency}/{toCurrency}
            </h3>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {fromCurrencyInfo.name} to {toCurrencyInfo.name}
            </p>
          </div>
        </div>
        <span className='text-2xl'>{toCurrencyInfo.flag}</span>
      </div>

      {/* Exchange Rate */}
      <div className='mb-4'>
        <div className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>
          {rate.toFixed(4)}
        </div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
        </div>
      </div>

      {/* Change Indicator */}
      {previousRate && (
        <div
          className={`flex items-center space-x-1 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isPositive ? (
            <TrendingUp className='w-4 h-4' />
          ) : (
            <TrendingDown className='w-4 h-4' />
          )}
          <span className='text-sm font-medium'>
            {isPositive ? '+' : ''}
            {change.toFixed(4)} ({changePercent.toFixed(2)}%)
          </span>
        </div>
      )}

      {/* Last Update */}
      <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          Last updated: {new Date(lastUpdate).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
