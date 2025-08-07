/**
 * Structured Data for SEO
 */

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://datahalo.net/#website',
        url: 'https://datahalo.net/',
        name: '실시간 환율 계산기',
        description: '실시간 달러, 엔화, 유로환율 정보와 정확한 환전계산기',
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://datahalo.net/?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://datahalo.net/#webapp',
        url: 'https://datahalo.net/',
        name: '환전 계산기',
        description: '실시간 환율 기반 정확한 환전 계산기',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'KRW',
        },
        featureList: [
          '실시간 환율 정보',
          '환전 계산기',
          '복사 기능',
          '모바일 최적화',
        ],
      },
      {
        '@type': 'FinancialProduct',
        '@id': 'https://datahalo.net/#service',
        name: '실시간 환율 서비스',
        description: '매시간 업데이트되는 정확한 환율 정보 제공',
        provider: {
          '@type': 'Organization',
          name: '실시간 환율',
        },
        category: '환율 정보',
        featureList: [
          'USD/KRW 달러환율',
          'EUR/KRW 유로환율',
          'JPY/KRW 엔화환율',
          'GBP/KRW 파운드환율',
          'CNY/KRW 위안환율',
        ],
      },
      {
        '@type': 'Organization',
        '@id': 'https://datahalo.net/#organization',
        name: '실시간 환율',
        url: 'https://datahalo.net/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://datahalo.net/logo.png',
        },
        sameAs: [],
      },
    ],
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
