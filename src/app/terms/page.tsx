/**
 * Terms of Service Page
 */

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
            이용약관
          </h1>

          <div className='prose prose-gray dark:prose-invert max-w-none'>
            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>1. 서비스 소개</h2>
              <p className='mb-4'>
                실시간 환율 서비스는 사용자에게 정확하고 신속한 환율 정보를
                제공하는 무료 웹 서비스입니다.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>2. 서비스 이용</h2>
              <ul className='list-disc pl-6 mb-4'>
                <li>본 서비스는 무료로 제공됩니다</li>
                <li>환율 정보는 참고용으로만 사용하시기 바랍니다</li>
                <li>
                  실제 거래 시에는 해당 금융기관의 환율을 확인하시기 바랍니다
                </li>
                <li>
                  서비스 중단이나 오류로 인한 손실에 대해 책임지지 않습니다
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>3. 금지사항</h2>
              <p className='mb-4'>다음 행위는 금지됩니다:</p>
              <ul className='list-disc pl-6 mb-4'>
                <li>서비스의 정상적인 운영을 방해하는 행위</li>
                <li>다른 사용자에게 피해를 주는 행위</li>
                <li>불법적인 목적으로 서비스를 이용하는 행위</li>
                <li>서비스의 소스코드를 무단으로 복제하는 행위</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>4. 면책조항</h2>
              <p className='mb-4'>
                환율 정보는 외부 API를 통해 제공되며, 정확성을 보장하지
                않습니다. 실제 금융 거래 시에는 반드시 해당 금융기관의 공식
                환율을 확인하시기 바랍니다.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>5. 광고 서비스</h2>
              <p className='mb-4'>
                본 서비스는 Google AdSense를 통해 광고를 게재합니다. 광고 내용에
                대한 책임은 광고주에게 있으며, 본 서비스는 광고 내용에 대해
                책임지지 않습니다.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>6. 약관 변경</h2>
              <p className='mb-4'>
                본 약관은 필요에 따라 변경될 수 있으며, 변경된 약관은 웹사이트에
                게시됩니다. 계속해서 서비스를 이용하시는 경우 변경된 약관에
                동의하는 것으로 간주됩니다.
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
