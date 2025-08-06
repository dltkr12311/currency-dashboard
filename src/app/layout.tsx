import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Currency Dashboard - Real-time Exchange Rates',
  description:
    'Get real-time currency exchange rates, currency converter, and market insights for USD, EUR, KRW, JPY, and more major currencies.',
  keywords:
    'currency exchange, exchange rates, currency converter, USD KRW, EUR USD, real-time rates',
  authors: [{ name: 'Currency Dashboard' }],
  openGraph: {
    title: 'Currency Dashboard - Real-time Exchange Rates',
    description:
      'Get real-time currency exchange rates and convert currencies instantly',
    type: 'website',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
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
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID'
          crossOrigin='anonymous'
        />
        {/* Preconnect to external domains for better performance */}
        <link rel='preconnect' href='https://api.exchangerate-api.com' />
        <link rel='dns-prefetch' href='https://pagead2.googlesyndication.com' />
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
                  &copy; 2024 Currency Dashboard. Real-time exchange rates
                  updated hourly.
                </p>
                <p className='mt-1'>Data provided by exchangerate-api.com</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
