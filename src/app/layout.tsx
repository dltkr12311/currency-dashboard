import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '실시간 환율 - 쉽고 빠른 환율 계산기',
  description:
    '실시간 달러, 유로, 엔화 환율 정보와 간편한 환전 계산기. 토스처럼 쉽고 빠른 환율 서비스로 해외 송금, 여행 준비를 더 스마트하게.',
  keywords:
    '실시간 환율, 달러 환율, 유로 환율, 엔화 환율, 환율 계산기, 환전 계산기, USD KRW, EUR KRW, JPY KRW, 해외송금, 여행환전',
  authors: [{ name: '실시간 환율' }],
  openGraph: {
    title: '실시간 환율 - 쉽고 빠른 환율 계산기',
    description:
      '실시간 환율 정보와 간편한 환전 계산기로 해외 송금과 여행 준비를 더 스마트하게',
    type: 'website',
  },
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        {/* Google AdSense */}
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7707972978209680'
          crossOrigin='anonymous'
        />

        {/* Google Analytics (선택사항) */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `,
          }}
        />

        {/* Preconnect to external domains for better performance */}
        <link rel='preconnect' href='https://api.exchangerate-api.com' />
        <link rel='dns-prefetch' href='https://pagead2.googlesyndication.com' />
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
      </head>
      <body
        className={`${inter.variable} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen`}
      >
        <div className='flex flex-col min-h-screen'>
          <main className='flex-grow'>{children}</main>
          <footer className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='text-center text-sm text-gray-500 dark:text-gray-400'>
                <p>
                  &copy; 2024 실시간 환율. 매시간 업데이트되는 정확한 환율 정보
                </p>
                <p className='mt-1'>환율 데이터 제공: exchangerate-api.com</p>
                <div className='mt-4 flex justify-center space-x-6'>
                  <a
                    href='/privacy'
                    className='hover:text-gray-700 dark:hover:text-gray-300 transition-colors'
                  >
                    개인정보처리방침
                  </a>
                  <a
                    href='/terms'
                    className='hover:text-gray-700 dark:hover:text-gray-300 transition-colors'
                  >
                    이용약관
                  </a>
                  <a
                    href='mailto:contact@currency-dashboard.com'
                    className='hover:text-gray-700 dark:hover:text-gray-300 transition-colors'
                  >
                    문의하기
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
