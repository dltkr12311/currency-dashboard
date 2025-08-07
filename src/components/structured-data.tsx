/**
 * Structured Data for SEO
 */

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://datahalo.net/#website',
        url: 'https://datahalo.net/',
        name: 'DataHalo 스마트 플랫폼',
        description: '모든 계산과 변환을 제공하는 종합 도구 플랫폼',
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
        name: 'DataHalo 환율·단위 계산기',
        description: '실시간 환율계산기와 단위변환기를 제공하는 무료 도구',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'KRW',
        },
        featureList: [
          '실시간 환율 계산',
          'USD KRW EUR JPY 환율변환',
          '미터 피트 길이변환',
          '킬로그램 파운드 무게변환',
          '섭씨 화씨 온도변환',
          '무료 무제한 이용',
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://datahalo.net/#service',
        name: 'DataHalo 도구 서비스',
        description: '모든 계산과 변환을 제공하는 종합 도구 플랫폼',
        provider: {
          '@type': 'Organization',
          name: 'DataHalo',
        },
        category: '계산 및 변환 도구',
        featureList: [
          '실시간 데이터 계산',
          '다양한 변환 기능',
          '편리한 인터페이스',
          '정확한 결과',
          '빠른 처리 속도',
        ],
      },
      {
        '@type': 'Organization',
        '@id': 'https://datahalo.net/#organization',
        name: 'DataHalo',
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
