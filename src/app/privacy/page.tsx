/**
 * Privacy Policy Page
 */

export default function PrivacyPage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
            개인정보처리방침
          </h1>

          <div className='prose prose-gray dark:prose-invert max-w-none'>
            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                1. 개인정보 처리 목적
              </h2>
              <p className='mb-4'>
                실시간 환율 서비스는 다음의 목적을 위하여 개인정보를 처리합니다:
              </p>
              <ul className='list-disc pl-6 mb-4'>
                <li>서비스 제공 및 운영</li>
                <li>광고 서비스 제공 (Google AdSense)</li>
                <li>서비스 개선 및 분석</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                2. 수집하는 개인정보 항목
              </h2>
              <div className='mb-4'>
                <h3 className='text-lg font-medium mb-2'>
                  자동으로 수집되는 정보:
                </h3>
                <ul className='list-disc pl-6 mb-4'>
                  <li>IP 주소</li>
                  <li>쿠키 및 웹 비콘</li>
                  <li>브라우저 정보</li>
                  <li>접속 로그, 이용 기록</li>
                </ul>
              </div>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                3. 개인정보 처리 및 보유기간
              </h2>
              <p className='mb-4'>
                수집된 개인정보는 서비스 제공 목적 달성 시까지 보유하며, 관련
                법령에 따라 일정 기간 보관 후 파기합니다.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                4. 개인정보 제3자 제공
              </h2>
              <p className='mb-4'>
                본 서비스는 다음의 경우에만 개인정보를 제3자에게 제공합니다:
              </p>
              <ul className='list-disc pl-6 mb-4'>
                <li>Google AdSense: 맞춤형 광고 제공</li>
                <li>법령에 의해 요구되는 경우</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                5. 개인정보보호책임자
              </h2>
              <p className='mb-4'>
                개인정보 처리에 관한 문의사항이 있으시면 아래로 연락주시기
                바랍니다:
              </p>
              <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded'>
                <p>이메일: privacy@currency-dashboard.com</p>
              </div>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>6. 쿠키 사용</h2>
              <p className='mb-4'>
                본 서비스는 사용자 경험 개선과 광고 서비스를 위해 쿠키를
                사용합니다. 브라우저 설정을 통해 쿠키를 거부할 수 있으나, 일부
                서비스 이용에 제한이 있을 수 있습니다.
              </p>
            </section>

            <div className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                최종 업데이트: {new Date().toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
