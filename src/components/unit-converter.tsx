'use client';

import { UNIT_QUICK_AMOUNTS, UNIT_CATEGORIES } from '@/constants/units';
import { useUnitConverter } from '@/hooks/use-unit-converter';
import { cn } from '@/lib/utils';
import { ArrowUpDown, Calculator } from 'lucide-react';

export function UnitConverter() {
  const {
    state,
    getCurrentCategory,
    handleFromValueChange,
    handleToValueChange,
    handleFromUnitChange,
    handleToUnitChange,
    handleCategoryChange,
    swapUnits,
    setQuickAmount,
  } = useUnitConverter();

  const currentCategory = getCurrentCategory();

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      handleFromValueChange(value);
    }
  };

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      handleToValueChange(value);
    }
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700'>
      {/* Header */}
      <div className='flex items-center gap-3 mb-5'>
        <div className='w-9 h-9 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center'>
          <Calculator className='w-5 h-5 text-blue-600 dark:text-blue-400' />
        </div>
        <div>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
            단위 변환기
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            다양한 단위를 간편하게 변환하세요
          </p>
        </div>
      </div>

      {/* Category Selection */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          변환 종류
        </label>
        <div className='grid grid-cols-3 sm:grid-cols-6 gap-2'>
          {UNIT_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                'flex flex-col items-center gap-1 p-3 rounded-lg border text-xs font-medium transition-all',
                state.category === category.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
              )}
            >
              <span className='text-base'>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-4'>
        {/* From Input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            변환할 값
          </label>
          <div className='flex gap-2'>
            <input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              value={state.fromValue}
              onChange={handleFromInputChange}
              placeholder='0'
              className='flex-1 h-12 px-4 text-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none min-w-0'
            />
            <select
              value={state.fromUnit}
              onChange={e => handleFromUnitChange(e.target.value)}
              className='h-12 px-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium min-w-[100px]'
            >
              {currentCategory?.units.map(unit => (
                <option key={unit.code} value={unit.code}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className='flex justify-center'>
          <button
            onClick={swapUnits}
            className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
          >
            <ArrowUpDown className='w-4 h-4 text-gray-600 dark:text-gray-400' />
          </button>
        </div>

        {/* To Input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            변환된 값
          </label>
          <div className='flex gap-2'>
            <input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              value={state.toValue}
              onChange={handleToInputChange}
              placeholder='0'
              className='flex-1 h-12 px-4 text-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none min-w-0'
            />
            <select
              value={state.toUnit}
              onChange={e => handleToUnitChange(e.target.value)}
              className='h-12 px-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium min-w-[100px]'
            >
              {currentCategory?.units.map(unit => (
                <option key={unit.code} value={unit.code}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            빠른 입력
          </label>
          <div className='flex gap-2 overflow-x-auto pb-1'>
            {UNIT_QUICK_AMOUNTS.map(amount => (
              <button
                key={amount}
                onClick={() => setQuickAmount(amount)}
                className='flex-shrink-0 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap'
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Current Conversion Display */}
        {state.fromValue && state.toValue && (
          <div className='mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
            <div className='text-center'>
              <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
                {state.fromValue}{' '}
                {currentCategory?.units.find(u => u.code === state.fromUnit)
                  ?.symbol || state.fromUnit}
                {' = '}
                {state.toValue}{' '}
                {currentCategory?.units.find(u => u.code === state.toUnit)
                  ?.symbol || state.toUnit}
              </div>
              <div className='text-sm text-blue-600 dark:text-blue-400 mt-1'>
                {currentCategory?.name} 변환 결과
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
