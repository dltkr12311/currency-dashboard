/**
 * Dollar Rate Detail Page for SEO
 */

import CurrencyCard from '@/components/currency-card';
import CurrencyConverter from '@/components/currency-converter';
import { currencyApi } from '@/services';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '달러환율 오늘 현재 시세 | USD KRW 실시간 환율 | 달러 환전계산기',
  description:
    '오늘 달러환율 1,388원! USD/KRW 실시간 시세와 정확한 달러 환전계산기. 해외직구, 여행환전, 송금시 필수 달러환율 정보를 매시간 업데이트로 제공',
  keywords:
    '달러환율, 오늘달러환율, USD KRW, 달러환전계산기, 실시간달러환율, 달러시세, 미국달러환율, 달러원환율',
  openGraph: {
    title: '달러환율 오늘 현재 시세 | USD KRW 실시간',
    description: '오늘 달러환율 1,388원! 실시간 USD/KRW 시세와 달러 환전계산기',
    url: 'https://datahalo.net/dollar-rate',
  },
};

async function DollarRateContent() {
  const exchangeData = await currencyApi.fetchExchangeRates('USD');

  if (!exchangeData) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-600 dark:text-red-400'>
          달러환율 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  const { conversion_rates: rates, time_last_update_utc: lastUpdate } =
    exchangeData;
  const dollarRate = rates.KRW;

  return (
    <div className='space-y-8'>
      {/* 달러환율 하이라이트 */}
      <div className='bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
            오늘 달러환율 (USD/KRW)
          </h2>
          <div className='text-6xl font-bold text-blue-600 mb-4'>
            {Math.round(dollarRate).toLocaleString()}원
          </div>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            1 USD = {Math.round(dollarRate).toLocaleString()} KRW
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
            최근 업데이트: {new Date(lastUpdate).toLocaleString('ko-KR')}
          </p>
        </div>
      </div>

      {/* 달러환율 상세 정보 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            달러환율 상세 정보
          </h3>
          <CurrencyCard
            fromCurrency='USD'
            toCurrency='KRW'
            rate={dollarRate}
            lastUpdate={lastUpdate}
          />
        </div>

        <div>
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            달러 환전계산기
          </h3>
          <CurrencyConverter rates={rates} baseCurrency='USD' />
        </div>
      </div>

      {/* 달러환율 관련 정보 */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl p-8'>
        <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          달러환율 이용 가이드
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              🛒 해외직구시 달러환율 활용법
            </h4>
            <ul className='space-y-2 text-gray-600 dark:text-gray-400'>
              <li>• 아마존, 이베이 등 달러 결제시 실시간 환율 확인</li>
              <li>• 신용카드 수수료 1.5-2% 추가 고려</li>
              <li>• 환율 변동성 고려하여 구매 타이밍 결정</li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              ✈️ 여행시 달러환전 팁
            </h4>
            <ul className='space-y-2 text-gray-600 dark:text-gray-400'>
              <li>• 은행별 환전 수수료 비교 필수</li>
              <li>• 공항 환전소보다 시중은행이 유리</li>
              <li>• 달러 현금 vs 카드 결제 비용 비교</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DollarRatePage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* 브레드크럼 */}
        <nav className='mb-8'>
          <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
            <Link href='/' className='hover:text-blue-600'>
              홈
            </Link>
            <span>/</span>
            <span className='text-gray-900 dark:text-white'>달러환율</span>
          </div>
        </nav>

        {/* 페이지 헤더 */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            달러환율 실시간 시세 USD/KRW
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
            실시간 달러환율 정보와 정확한 환전계산기로 해외직구, 여행환전,
            송금을 더 스마트하게
          </p>
        </div>

        <Suspense
          fallback={
            <div className='flex justify-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            </div>
          }
        >
          <DollarRateContent />
        </Suspense>
      </div>
    </div>
  );
}
