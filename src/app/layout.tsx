import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '오늘 달러환율 실시간 | 환전계산기 | USD KRW 엔화 유로환율',
  description:
    '지금 달러환율 1,388원! 실시간 USD/KRW, 엔화, 유로환율과 정확한 환전계산기. 해외직구, 여행환전, 송금시 필수! 매시간 업데이트되는 정확한 환율정보',
  keywords:
    '달러환율, 오늘달러환율, 실시간환율, 달러환율계산기, USD KRW, 엔화환율, 유로환율, 환전계산기, 해외직구환율, 여행환전, 송금환율, JPY KRW, EUR KRW, 파운드환율, 위안환율',
  authors: [{ name: '실시간 환율 계산기' }],
  openGraph: {
    title: '오늘 달러환율 실시간 | 환전계산기 | USD KRW 엔화 유로환율',
    description:
      '지금 달러환율 1,388원! 실시간 USD/KRW, 엔화, 유로환율과 정확한 환전계산기. 해외직구, 여행환전시 필수!',
    type: 'website',
    url: 'https://datahalo.net',
    siteName: '실시간 환율 계산기',
    images: [
      {
        url: 'https://datahalo.net/og-image.png',
        width: 1200,
        height: 630,
        alt: '실시간 달러환율 계산기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '오늘 달러환율 실시간 | 환전계산기',
    description: '지금 달러환율 1,388원! 실시간 환율과 정확한 환전계산기',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://datahalo.net',
  },
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
        {/* Google Search Console Verification */}
        <meta
          name='google-site-verification'
          content='Z9rW-2udFG6XuVvpTAFQuqaINgvzgHOCJKbYs10ws5A'
        />

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
