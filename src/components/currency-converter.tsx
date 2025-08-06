/**
 * Currency Converter Component - Pure View Layer
 */

'use client';

import { MAJOR_CURRENCIES, QUICK_AMOUNTS } from '@/constants';
import { useClipboard, useCurrencyConverter } from '@/hooks';
import type { CurrencyCode, CurrencyConverterProps } from '@/types';
import { formatCurrency, getCurrencyKoreanName } from '@/utils';
import { ArrowUpDown, Calculator, Check, Copy } from 'lucide-react';

export default function CurrencyConverter({
  rates,
  baseCurrency,
}: CurrencyConverterProps) {
  const converter = useCurrencyConverter({
    rates,
    baseCurrency,
  });

  const { copied, copy } = useClipboard();

  const handleCopyResult = async () => {
    const text = `${converter.amount} ${
      converter.fromCurrency
    } = ${converter.convertedAmount.toLocaleString('ko-KR')} ${
      converter.toCurrency
    }`;
    await copy(text);
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 w-full'>
      {/* 헤더 */}
      <div className='flex items-center space-x-3 mb-5'>
        <div className='w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center'>
          <Calculator className='w-5 h-5 text-white' />
        </div>
        <div>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
            환전 계산기
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            실시간 환율로 정확하게 계산해보세요
          </p>
        </div>
      </div>

      <div className='space-y-4'>
        {/* 보내는 금액 */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
            보내는 금액
          </label>

          {/* 빠른 금액 선택 */}
          <div className='flex space-x-2 mb-2 overflow-x-auto'>
            {QUICK_AMOUNTS.map(quickAmount => (
              <button
                key={quickAmount}
                onClick={() => converter.setAmount(quickAmount)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all whitespace-nowrap flex-shrink-0 ${
                  converter.amount === quickAmount
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-blue-300'
                }`}
              >
                {parseInt(quickAmount).toLocaleString('ko-KR')}
              </button>
            ))}
          </div>

          <div className='flex items-center space-x-3'>
            <input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              value={converter.amount}
              onChange={e => converter.setAmount(e.target.value)}
              className='flex-1 min-w-0 h-12 px-4 text-lg font-bold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all appearance-none'
              placeholder='금액 입력'
            />
            <select
              value={converter.fromCurrency}
              onChange={e =>
                converter.setFromCurrency(e.target.value as CurrencyCode)
              }
              className='h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm font-medium min-w-[110px] w-[110px]'
            >
              {Object.entries(MAJOR_CURRENCIES).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code}
                </option>
              ))}
            </select>
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
            {getCurrencyKoreanName(converter.fromCurrency)}
          </p>
        </div>

        {/* 교환 버튼 */}
        <div className='flex justify-center -my-2'>
          <button
            onClick={converter.swapCurrencies}
            className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-600 dark:hover:text-blue-400 transition-all duration-200 border border-gray-200 dark:border-gray-600'
            aria-label='통화 교환'
          >
            <ArrowUpDown className='w-4 h-4' />
          </button>
        </div>

        {/* 받는 금액 */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
            받는 금액
          </label>
          <div className='flex items-center space-x-3'>
            <div
              className={`flex-1 h-12 px-4 py-2 border-2 border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/10 transition-all duration-300 flex items-center ${
                converter.isAnimating
                  ? 'scale-105 border-blue-300 dark:border-blue-700'
                  : ''
              }`}
            >
              <div className='text-lg font-bold text-blue-900 dark:text-blue-100 truncate w-full'>
                {formatCurrency(
                  converter.convertedAmount,
                  converter.toCurrency
                )}
              </div>
            </div>
            <select
              value={converter.toCurrency}
              onChange={e =>
                converter.setToCurrency(e.target.value as CurrencyCode)
              }
              className='h-12 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm font-medium min-w-[110px] w-[110px]'
            >
              {Object.entries(MAJOR_CURRENCIES).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code}
                </option>
              ))}
            </select>
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
            {getCurrencyKoreanName(converter.toCurrency)}
          </p>
        </div>

        {/* 환율 정보 및 복사 버튼 */}
        <div className='mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between'>
          <div>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              현재 환율
            </p>
            <p className='text-lg font-bold text-gray-900 dark:text-white'>
              1 {converter.fromCurrency} ={' '}
              {formatCurrency(converter.rate, converter.toCurrency)}
            </p>
          </div>
          <button
            onClick={handleCopyResult}
            className='flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
          >
            {copied ? (
              <>
                <Check className='w-4 h-4 text-green-600' />
                <span className='text-sm text-green-600'>복사됨!</span>
              </>
            ) : (
              <>
                <Copy className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  복사
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
