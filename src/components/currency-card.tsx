/**
 * Currency Card Component - Pure View Layer
 */

'use client';

import type { CurrencyCardProps } from '@/types';
import {
  formatKoreanRate,
  getCurrencyFlag,
  getCurrencyKoreanName,
} from '@/utils';
import { Clock, TrendingDown, TrendingUp, Zap } from 'lucide-react';

export function CurrencyCard({
  fromCurrency,
  toCurrency,
  rate,
  previousRate,
  lastUpdate,
}: CurrencyCardProps) {
  const fromFlag = getCurrencyFlag(fromCurrency);
  const toFlag = getCurrencyFlag(toCurrency);

  const change = previousRate ? rate - previousRate : 0;
  const changePercent = previousRate ? (change / previousRate) * 100 : 0;
  const isPositive = change > 0;

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300'>
      {/* 통화 쌍 헤더 */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <span className='text-2xl'>{fromFlag}</span>
          <div>
            <h3 className='font-semibold text-gray-900 dark:text-white'>
              {fromCurrency}/{toCurrency}
            </h3>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {getCurrencyKoreanName(fromCurrency)} →{' '}
              {getCurrencyKoreanName(toCurrency)}
            </p>
          </div>
        </div>
        <span className='text-2xl'>{toFlag}</span>
      </div>

      {/* 환율 표시 */}
      <div className='mb-6'>
        <div className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
          {formatKoreanRate(rate)}
        </div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          1 {fromCurrency} = {formatKoreanRate(rate)} {toCurrency}
        </div>
      </div>

      {/* 변동률 표시 */}
      {previousRate && (
        <div
          className={`flex items-center justify-between p-3 rounded-xl ${
            isPositive
              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
          }`}
        >
          <div className='flex items-center space-x-2'>
            {isPositive ? (
              <TrendingUp className='w-5 h-5' />
            ) : (
              <TrendingDown className='w-5 h-5' />
            )}
            <span className='text-base font-bold'>
              {isPositive ? '상승' : '하락'}
            </span>
          </div>
          <div className='text-right'>
            <div className='font-bold'>
              {isPositive ? '+' : ''}
              {formatKoreanRate(Math.abs(change))}
            </div>
            <div className='text-sm opacity-75'>
              ({changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      )}

      {/* 마지막 업데이트 */}
      <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
        <div className='flex items-center space-x-1'>
          <Clock className='w-3 h-3' />
          <span>
            최근 업데이트: {new Date(lastUpdate).toLocaleTimeString('ko-KR')}
          </span>
        </div>
        <div className='flex items-center space-x-1'>
          <Zap className='w-3 h-3 text-blue-500' />
          <span>실시간</span>
        </div>
      </div>
    </div>
  );
}
