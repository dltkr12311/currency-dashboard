import AdBanner from '@/components/ad-banner';
import CurrencyCard from '@/components/currency-card';
import CurrencyConverter from '@/components/currency-converter';
import { fetchExchangeRates, type CurrencyCode } from '@/lib/currency-api';
import { BarChart3, Calculator, Globe, TrendingUp } from 'lucide-react';
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

async function CurrencyRatesGrid() {
  const exchangeData = await fetchExchangeRates('USD');

  if (!exchangeData) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-600 dark:text-red-400'>
          Unable to fetch exchange rates. Please try again later.
        </p>
      </div>
    );
  }

  const { conversion_rates: rates, time_last_update_utc: lastUpdate } =
    exchangeData;

  // Popular currency pairs for KRW users
  const popularPairs: Array<[CurrencyCode, CurrencyCode]> = [
    ['USD', 'KRW'],
    ['EUR', 'KRW'],
    ['JPY', 'KRW'],
    ['GBP', 'KRW'],
    ['CNY', 'KRW'],
    ['USD', 'EUR'],
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {popularPairs.map(([from, to]) => {
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
  const exchangeData = await fetchExchangeRates('USD');

  if (!exchangeData) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          Currency Converter
        </h2>
        <p className='text-red-600 dark:text-red-400'>
          Unable to load converter. Please try again later.
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
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <header className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-blue-600 rounded-lg'>
                <TrendingUp className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Currency Dashboard
                </h1>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Real-time exchange rates & currency converter
                </p>
              </div>
            </div>
            <div className='hidden md:flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400'>
              <div className='flex items-center space-x-1'>
                <Globe className='w-4 h-4' />
                <span>Global Rates</span>
              </div>
              <div className='flex items-center space-x-1'>
                <BarChart3 className='w-4 h-4' />
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Top Banner Ad */}
        <div className='mb-8'>
          <AdBanner
            slot='1234567890'
            format='horizontal'
            className='max-w-4xl mx-auto'
          />
        </div>

        {/* Hero Section */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Real-Time Currency Exchange Rates
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
            Get the latest exchange rates for major currencies including USD,
            EUR, KRW, JPY, and more. Convert currencies instantly with our
            easy-to-use calculator.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Currency Rates */}
          <div className='lg:col-span-2'>
            <div className='flex items-center space-x-2 mb-6'>
              <TrendingUp className='w-5 h-5 text-blue-600' />
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                Popular Exchange Rates
              </h3>
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

          {/* Right Column - Converter & Ads */}
          <div className='space-y-8'>
            {/* Currency Converter */}
            <div>
              <div className='flex items-center space-x-2 mb-6'>
                <Calculator className='w-5 h-5 text-green-600' />
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Currency Converter
                </h3>
              </div>

              <Suspense
                fallback={
                  <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse'>
                    <div className='h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-6'></div>
                    <div className='space-y-4'>
                      <div className='h-12 bg-gray-300 dark:bg-gray-600 rounded'></div>
                      <div className='h-12 bg-gray-300 dark:bg-gray-600 rounded'></div>
                    </div>
                  </div>
                }
              >
                <CurrencyConverterSection />
              </Suspense>
            </div>

            {/* Sidebar Ad */}
            <AdBanner
              slot='0987654321'
              format='vertical'
              className='sticky top-8'
            />
          </div>
        </div>

        {/* Bottom Banner Ad */}
        <div className='mt-12'>
          <AdBanner
            slot='1122334455'
            format='horizontal'
            className='max-w-4xl mx-auto'
          />
        </div>

        {/* Features Section */}
        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center'>
            <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <TrendingUp className='w-6 h-6 text-blue-600 dark:text-blue-400' />
            </div>
            <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Real-Time Rates
            </h4>
            <p className='text-gray-600 dark:text-gray-400'>
              Get up-to-date exchange rates refreshed every hour from reliable
              financial data sources.
            </p>
          </div>

          <div className='text-center'>
            <div className='w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <Calculator className='w-6 h-6 text-green-600 dark:text-green-400' />
            </div>
            <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Easy Converter
            </h4>
            <p className='text-gray-600 dark:text-gray-400'>
              Convert between any currencies instantly with our user-friendly
              calculator interface.
            </p>
          </div>

          <div className='text-center'>
            <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <Globe className='w-6 h-6 text-purple-600 dark:text-purple-400' />
            </div>
            <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Global Coverage
            </h4>
            <p className='text-gray-600 dark:text-gray-400'>
              Support for major world currencies including USD, EUR, KRW, JPY,
              GBP, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
