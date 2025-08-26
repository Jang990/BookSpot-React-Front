// app/privacy-policy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | BookSpot",
  description:
    "서비스의 개인정보 처리방침입니다. 수집 항목, 이용 목적, 보유 기간, 이용자 권리, 광고(구글 애드센스) 안내를 포함합니다.",
  robots: {
    index: true,
    follow: true,
  },
};

// TODO: 아래 상수 값을 프로젝트에 맞게 채우세요.
const SERVICE_NAME = "BookSpot"; // 예: BookRadar
const CONTACT_EMAIL = "sdsd090811@gmail.com"; // 문의용 이메일
const ANNOUNCED_AT = "2025년 08월 26일"; // 공고일자
const EFFECTIVE_AT = "2025년 08월 26일"; // 시행일자

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-gray-900">
      <h1 className="text-2xl font-bold tracking-tight">개인정보처리방침</h1>
      <p className="mt-2 text-gray-600">
        {SERVICE_NAME}({""}
        <span className="font-medium">"서비스"</span>
        )는 이용자의 개인정보를 중요하게 생각합니다. 관련 법령을 준수하며
        안전하게 처리합니다.
      </p>

      {/* 1. 총칙 */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">1. 총칙</h2>
        <p className="mt-2">
          {SERVICE_NAME}는 이용자의 개인정보를 중요시하며, 「정보통신망 이용촉진
          및 정보보호 등에 관한 법률」 등 관련 법령을 준수합니다. 본
          개인정보처리방침은 이용자가 제공하는 개인정보가 어떤 용도와 방식으로
          이용되는지, 그리고 보호를 위해 어떤 조치가 적용되는지 설명합니다.
        </p>
      </section>

      {/* 2. 수집하는 개인정보의 항목 및 수집 방법 */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          2. 수집하는 개인정보의 항목 및 수집 방법
        </h2>
        <p className="mt-2">
          본 서비스는 회원가입 절차 없이 운영합니다. 이름, 이메일 주소, 연락처
          등 개인을 직접 식별할 수 있는 정보를 수집하지 않습니다. 다만, 서비스
          이용 과정에서 아래 정보가 자동으로 생성·수집될 수 있습니다.
        </p>

        {/* 가. 쿠키 */}
        <div className="mt-4 border-l-2 border-gray-200 pl-4">
          <h3 className="font-medium">가. 쿠키 (Cookie)</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <span className="font-medium">수집 항목:</span> 북카트에 담은
              도서의 고유 ID (bookId)
            </li>
            <li>
              <span className="font-medium">수집 목적:</span> 로그인 없이도
              사용자가 북카트 목록을 유지할 수 있도록 편의 기능 제공
            </li>
          </ul>
          <p className="mt-2 text-gray-700">
            쿠키는 이용자 브라우저에 저장되는 작은 텍스트 파일입니다. 이용자는
            브라우저 옵션에서 모든 쿠키 허용, 저장 시 확인, 전체 차단 등을
            선택할 수 있습니다. (쿠키 저장을 거부하면 북카트 기능 이용에 제약이
            있을 수 있습니다.)
          </p>
        </div>

        {/* 나. 로컬 스토리지 */}
        <div className="mt-6 border-l-2 border-gray-200 pl-4">
          <h3 className="font-medium">나. 로컬 스토리지 (Local Storage)</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <span className="font-medium">수집 항목:</span> 마지막으로 조회한
              지도 위치 정보(위도, 경도, 확대 레벨 등)
            </li>
            <li>
              <span className="font-medium">수집 목적:</span> 재방문 시 이전
              지도 위치에서 바로 시작할 수 있도록 사용자 경험 향상
            </li>
          </ul>
        </div>

        {/* 다. 서비스 이용 기록 */}
        <div className="mt-6 border-l-2 border-gray-200 pl-4">
          <h3 className="font-medium">다. 서비스 이용 기록 (Log Data)</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <span className="font-medium">수집 항목:</span> 검색 조건(검색어),
              지도 탐색 위치, 조회한 도서관 ID/도서 ID, 접속 IP, 브라우저 종류
              등
            </li>
            <li>
              <span className="font-medium">수집 목적:</span> 서비스 사용 통계
              분석, 오류 확인 및 품질 개선, 비정상 이용(어뷰징) 방지
            </li>
          </ul>
        </div>
      </section>

      {/* 3. 개인정보의 수집 및 이용 목적 */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          3. 개인정보의 수집 및 이용 목적
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <span className="font-medium">서비스 기능 제공:</span> 북카트,
            마지막 지도 위치 기억 등 개인화 편의 제공
          </li>
          <li>
            <span className="font-medium">서비스 개선 및 신규 개발:</span> 이용
            행태를 통계적으로 분석하여 기능 개선 및 신규 기능 개발에 활용
          </li>
          <li>
            <span className="font-medium">안정적 운영:</span> 부정 이용 방지,
            비인가 사용 방지, 서비스 안정성 확보
          </li>
        </ul>
      </section>

      {/* 4. 광고에 관한 사항 */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          4. 광고에 관한 사항 (Google AdSense)
        </h2>
        <p className="mt-2">
          본 서비스는 제3자 광고 서비스인 Google AdSense를 사용할 수 있습니다.
          광고 제공업체는 더 관련성 높은 광고 제공을 위해 쿠키를 사용할 수
          있습니다. 구글과 같은 제3자 공급업체는 쿠키를 사용하여 사용자의 본
          웹사이트 또는 다른 웹사이트 방문 기록을 기반으로 광고를 게재합니다.
          구글의 광고 쿠키 사용을 통해 구글 및 파트너는 사용자의 방문 기록을
          바탕으로 맞춤 광고를 표시할 수 있습니다.
        </p>
        <p className="mt-2">
          이용자는 구글{" "}
          <a
            className="underline"
            href="https://adssettings.google.com/authenticated"
            target="_blank"
            rel="noreferrer noopener"
          >
            광고 설정
          </a>
          에서 맞춤 광고를 선택 해제할 수 있으며, 관련 정책은{" "}
          <a
            className="underline"
            href="https://policies.google.com/technologies/ads?hl=ko"
            target="_blank"
            rel="noreferrer noopener"
          >
            구글 광고 정책
          </a>
          에서 확인할 수 있습니다.
        </p>
      </section>

      {/* 5. 개인정보의 보유 및 이용기간 */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          5. 개인정보의 보유 및 이용기간
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <span className="font-medium">쿠키 및 로컬 스토리지:</span> 이용자
            브라우저에 저장되며, 이용자가 직접 브라우저 데이터를 삭제하기 전까지
            유지됩니다.
          </li>
          <li>
            <span className="font-medium">서비스 이용 기록:</span> 서비스 개선
            및 통계 분석의 목적 달성 시 또는 관련 법령에 따른 보관 기간 종료 시
            지체 없이 파기합니다.
          </li>
        </ul>
      </section>

      {/* 6. 이용자의 권리 및 그 행사방법 */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          6. 이용자의 권리 및 그 행사방법
        </h2>
        <p className="mt-2">
          이용자는 언제든지 브라우저 설정을 통해 쿠키 및 로컬 스토리지 저장을
          거부하거나 삭제할 수 있습니다.
        </p>
        <p className="mt-2">
          <span className="font-medium">쿠키 설정 거부 방법(Chrome 예시):</span>{" "}
          브라우저 우측 상단의 ‘더보기’ &gt; ‘설정’ &gt; ‘개인정보 보호 및 보안’
          &gt; ‘쿠키 및 기타 사이트 데이터’에서 변경할 수 있습니다.
        </p>
      </section>

      {/* 7. 개인정보 처리방침 변경 */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">7. 개인정보 처리방침 변경</h2>
        <p className="mt-2">
          본 정책의 내용이 추가·삭제·수정될 경우, 시행일 7일 전부터 웹사이트
          공지사항을 통해 안내합니다.
        </p>
      </section>

      {/* 8. 문의처 */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">8. 문의처</h2>
        <p className="mt-2">
          본 개인정보 처리와 관련한 문의는 아래 이메일로 연락해 주세요.
        </p>
        <p className="mt-1 font-medium">이메일: {CONTACT_EMAIL}</p>
      </section>

      {/* 날짜 */}
      <section className="mt-10 border-t pt-6 text-gray-700">
        <p>공고일자: {ANNOUNCED_AT}</p>
        <p>시행일자: {EFFECTIVE_AT}</p>
      </section>
    </main>
  );
}
