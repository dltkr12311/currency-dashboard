/**
 * Main Page - Orchestrates components and data flow
 */

import AdBanner from '@/components/ad-banner';
import CurrencyCard from '@/components/currency-card';
import CurrencyConverter from '@/components/currency-converter';
import StructuredData from '@/components/structured-data';
import { ADSENSE_CONFIG, POPULAR_CURRENCY_PAIRS } from '@/constants';
import { currencyApi } from '@/services';
import { Calculator, Heart, Star, TrendingUp, Zap } from 'lucide-react';
import { Suspense } from 'react';

// Loading components
function CurrencyCardSkeleton() {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded'></div>
          <div>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-1'></div>
            <div className='h-3 bg-gray-300 dark:bg-gray-600 rounded w-32'></div>
          </div>
        </div>
        <div className='w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded'></div>
      </div>
      <div className='mb-4'>
        <div className='h-8 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-1'></div>
        <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-36'></div>
      </div>
    </div>
  );
}

function ConverterSkeleton() {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse'>
      <div className='h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-6'></div>
      <div className='space-y-4'>
        <div className='h-12 bg-gray-300 dark:bg-gray-600 rounded'></div>
        <div className='h-12 bg-gray-300 dark:bg-gray-600 rounded'></div>
      </div>
    </div>
  );
}

async function CurrencyRatesGrid() {
  const exchangeData = await currencyApi.fetchExchangeRates('USD');

  if (!exchangeData) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-600 dark:text-red-400'>
          환율 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  const { conversion_rates: rates, time_last_update_utc: lastUpdate } =
    exchangeData;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {POPULAR_CURRENCY_PAIRS.map(([from, to]) => {
        const rate = rates[to] / (rates[from] || 1);
        return (
          <CurrencyCard
            key={`${from}-${to}`}
            fromCurrency={from}
            toCurrency={to}
            rate={rate}
            lastUpdate={lastUpdate}
          />
        );
      })}
    </div>
  );
}

async function CurrencyConverterSection() {
  const exchangeData = await currencyApi.fetchExchangeRates('USD');

  if (!exchangeData) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          환전 계산기
        </h2>
        <p className='text-red-600 dark:text-red-400'>
          계산기를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <CurrencyConverter
      rates={exchangeData.conversion_rates}
      baseCurrency='USD'
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        {/* Header - 미니멀 스타일 */}
        <header className='bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <div className='w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center'>
                  <TrendingUp className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                    실시간 환율
                  </h1>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    쉽고 빠른 환율 계산기
                  </p>
                </div>
              </div>
              <div className='hidden md:flex items-center space-x-6'>
                <div className='flex items-center space-x-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium'>
                  <Zap className='w-4 h-4' />
                  <span>실시간</span>
                </div>
                <div className='flex items-center space-x-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium'>
                  <Heart className='w-4 h-4' />
                  <span>한국인 맞춤</span>
                </div>
                <div className='flex items-center space-x-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium'>
                  <Star className='w-4 h-4' />
                  <span>무료</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Top Banner Ad */}
          <div className='mb-8'>
            <AdBanner
              slot={ADSENSE_CONFIG.SLOTS.BANNER_TOP}
              format='horizontal'
              className='max-w-4xl mx-auto'
            />
          </div>

          {/* Hero Section - SEO 최적화 */}
          <div className='text-center mb-16'>
            <h1 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
              오늘 <span className='text-blue-600'>달러환율</span> 실시간
              <br className='sm:hidden' /> 정확한 환전계산기
            </h1>
            <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8'>
              <strong>지금 달러환율 1,388원!</strong> 해외직구, 여행환전, 송금시
              필수인
              <br />
              <span className='text-blue-600 font-semibold'>
                실시간 USD/KRW, 엔화, 유로환율
              </span>
              과 정확한 환전계산기
            </p>
            <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
              <div className='flex items-center space-x-1'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span>실시간 업데이트</span>
              </div>
              <div className='flex items-center space-x-1'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span>한국인 맞춤</span>
              </div>
              <div className='flex items-center space-x-1'>
                <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                <span>완전 무료</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column - Currency Rates (order-2 on mobile, order-1 on desktop) */}
            <div className='lg:col-span-2 order-2 lg:order-1'>
              <div className='flex items-center space-x-2 mb-6'>
                <TrendingUp className='w-5 h-5 text-blue-600' />
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  실시간 주요 환율 - USD/KRW, EUR/KRW, JPY/KRW
                </h2>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  매시간 업데이트
                </span>
              </div>

              <Suspense
                fallback={
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <CurrencyCardSkeleton key={i} />
                    ))}
                  </div>
                }
              >
                <CurrencyRatesGrid />
              </Suspense>
            </div>

            {/* Right Column - Converter & Ads (order-1 on mobile, order-2 on desktop) */}
            <div className='space-y-8 order-1 lg:order-2'>
              {/* Currency Converter */}
              <div>
                <div className='flex items-center space-x-2 mb-6'>
                  <Calculator className='w-5 h-5 text-green-600' />
                  <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                    환전 계산기
                  </h3>
                </div>

                <Suspense fallback={<ConverterSkeleton />}>
                  <CurrencyConverterSection />
                </Suspense>
              </div>

              {/* Sidebar Ad */}
              <AdBanner
                slot={ADSENSE_CONFIG.SLOTS.SIDEBAR}
                format='vertical'
                className='sticky top-8'
              />
            </div>
          </div>

          {/* Bottom Banner Ad */}
          <div className='mt-12'>
            <AdBanner
              slot={ADSENSE_CONFIG.SLOTS.BANNER_BOTTOM}
              format='horizontal'
              className='max-w-4xl mx-auto'
            />
          </div>

          {/* Features Section - 한국인 맞춤 */}
          <div className='mt-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8'>
            <div className='text-center mb-12'>
              <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                왜 우리 환율 서비스일까요?
              </h3>
              <p className='text-lg text-gray-600 dark:text-gray-400'>
                한국인을 위해 특별히 설계된 환율 서비스
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center group'>
                <div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                  <Zap className='w-8 h-8 text-white' />
                </div>
                <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                  실시간 업데이트
                </h4>
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  매시간 자동으로 업데이트되는
                  <br />
                  정확한 환율 정보를 제공합니다
                </p>
                <div className='mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium'>
                  ⚡ 1시간마다 업데이트
                </div>
              </div>

              <div className='text-center group'>
                <div className='w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                  <Calculator className='w-8 h-8 text-white' />
                </div>
                <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                  쉬운 계산기
                </h4>
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  토스처럼 직관적이고 빠른
                  <br />
                  환전 계산기로 간편하게
                </p>
                <div className='mt-4 text-sm text-green-600 dark:text-green-400 font-medium'>
                  💡 복사 기능까지
                </div>
              </div>

              <div className='text-center group'>
                <div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                  <Heart className='w-8 h-8 text-white' />
                </div>
                <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                  한국인 맞춤
                </h4>
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  해외쇼핑, 여행, 송금 등<br />
                  한국인이 자주 쓰는 환율 위주
                </p>
                <div className='mt-4 text-sm text-purple-600 dark:text-purple-400 font-medium'>
                  🇰🇷 한국인 우선
                </div>
              </div>
            </div>

            {/* 사용 사례 */}
            <div className='mt-12 bg-gray-50 dark:bg-gray-700 rounded-2xl p-6'>
              <h4 className='text-lg font-bold text-gray-900 dark:text-white mb-4 text-center'>
                이런 때 유용해요
              </h4>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 text-sm'>
                <div className='flex items-center space-x-2 text-gray-600 dark:text-gray-400'>
                  <span>🛒</span>
                  <span>해외 온라인쇼핑</span>
                </div>
                <div className='flex items-center space-x-2 text-gray-600 dark:text-gray-400'>
                  <span>✈️</span>
                  <span>해외여행 준비</span>
                </div>
                <div className='flex items-center space-x-2 text-gray-600 dark:text-gray-400'>
                  <span>💸</span>
                  <span>해외송금</span>
                </div>
                <div className='flex items-center space-x-2 text-gray-600 dark:text-gray-400'>
                  <span>📊</span>
                  <span>투자 포트폴리오</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
