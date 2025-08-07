import { AdBanner } from '@/components/ad-banner';
import { StructuredData } from '@/components/structured-data';
import { UnitConverter } from '@/components/unit-converter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '단위 변환기 | 길이 무게 온도 부피 시간 변환 계산기',
  description:
    '미터를 피트로, 킬로그램을 파운드로! 길이, 무게, 온도, 부피, 시간 등 모든 단위를 쉽고 정확하게 변환하세요. 실시간 단위 계산기.',
  keywords:
    '단위변환기, 미터피트변환, 킬로그램파운드변환, 섭씨화씨변환, 리터갤런변환, 길이변환, 무게변환, 온도변환, 부피변환, 시간변환, 단위계산기',
  openGraph: {
    title: '단위 변환기 | 모든 단위를 쉽게 변환',
    description: '미터↔피트, 킬로그램↔파운드 등 모든 단위 변환을 한 번에!',
    url: 'https://datahalo.net/unit-converter',
  },
};

export default function UnitConverterPage() {
  return (
    <>
      <StructuredData />
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        <div className='container mx-auto px-4 py-8'>
          {/* Hero Section */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
              <span className='text-blue-600'>단위 변환기</span>
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              복잡한 단위변환, 간단하게.
              <br />
              필요한 모든 단위를 즉시 변환하는 도구입니다.
            </p>
          </div>

          {/* Main Content */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Unit Converter */}
            <div className='lg:col-span-2 order-1'>
              <UnitConverter />
            </div>

            {/* Sidebar */}
            <div className='order-2 space-y-6'>
              {/* Ad Banner */}
              <AdBanner
                slot='1234567890'
                style={{ minHeight: '250px' }}
                format='auto'
                responsive
              />

              {/* Popular Conversions */}
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  인기 변환
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      1 미터
                    </span>
                    <span className='text-sm font-medium text-gray-900 dark:text-white'>
                      3.28 피트
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      1 킬로그램
                    </span>
                    <span className='text-sm font-medium text-gray-900 dark:text-white'>
                      2.20 파운드
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      0°C
                    </span>
                    <span className='text-sm font-medium text-gray-900 dark:text-white'>
                      32°F
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      1 리터
                    </span>
                    <span className='text-sm font-medium text-gray-900 dark:text-white'>
                      0.26 갤런
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  주요 기능
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      6개 카테고리 지원
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      실시간 양방향 변환
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      빠른 입력 버튼
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      모바일 최적화
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className='mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
              단위 변환기 사용법
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='text-center'>
                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>1️⃣</span>
                </div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  변환 종류 선택
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  길이, 무게, 온도, 부피, 시간, 넓이 중 원하는 카테고리를
                  선택하세요.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>2️⃣</span>
                </div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  값 입력
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  변환하고 싶은 숫자를 입력하고 단위를 선택하세요.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>3️⃣</span>
                </div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  결과 확인
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  실시간으로 변환된 결과를 확인하고 필요시 복사하세요.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Ad */}
          <div className='mt-8'>
            <AdBanner
              slot='0987654321'
              style={{ minHeight: '100px' }}
              format='auto'
              responsive
            />
          </div>
        </div>
      </div>
    </>
  );
}
