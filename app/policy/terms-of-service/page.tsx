// app/terms-of-service/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | BookSpot",
  description:
    "BookSpot 서비스 이용약관입니다. 서비스 이용, 회원, 의무, 책임 제한 등에 관한 규정을 안내합니다.",
  robots: {
    index: true,
    follow: true,
  },
};

const SERVICE_NAME = "BookSpot"; // 서비스 이름
const CONTACT_EMAIL = "sdsd090811@gmail.com"; // 문의용 이메일
const ANNOUNCED_AT = "2025년 08월 26일"; // 공고일자
const EFFECTIVE_AT = "2025년 08월 26일"; // 시행일자

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-gray-900">
      <h1 className="text-2xl font-bold tracking-tight">이용약관</h1>
      <p className="mt-2 text-gray-600">
        {SERVICE_NAME} 서비스에 오신 것을 환영합니다. 본 약관은 {SERVICE_NAME}(
        {""}
        <span className="font-medium">"서비스"</span>)의 이용과 관련하여 필요한
        사항을 규정합니다.
      </p>

      {/* 1조 (목적) */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">제 1 조 (목적)</h2>
        <p className="mt-2">
          본 약관은 {SERVICE_NAME}(이하 "회사"라 함)이 제공하는 {SERVICE_NAME}{" "}
          서비스(이하 "서비스"라 함)의 이용과 관련하여 "회사"와 "이용자" 간의
          권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      {/* 2조 (용어의 정의) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">제 2 조 (용어의 정의)</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <span className="font-medium">"서비스"</span>라 함은 {SERVICE_NAME}
            이 제공하는 전국 도서관 도서 검색 및 위치 안내 등 제반 서비스를
            의미합니다.
          </li>
          <li>
            <span className="font-medium">"이용자"</span>라 함은 본 약관에 따라
            "서비스"에 접속하여 "서비스"가 제공하는 콘텐츠를 이용하는 "회원" 및
            "비회원"을 말합니다.
          </li>
          <li>
            <span className="font-medium">"회원"</span>이라 함은 "서비스"에
            접속하여 소셜 로그인 등을 통해 회원가입을 완료한 자로서, "서비스"의
            정보와 "내 책장" 등 개인화 기능을 지속적으로 이용할 수 있는 자를
            말합니다.
          </li>
          <li>
            <span className="font-medium">"비회원"</span>이라 함은 "회원"이
            아니면서 "서비스"가 제공하는 일부 기능을 이용하는 자를 말합니다.
          </li>
        </ul>
      </section>

      {/* 3조 (약관의 명시와 개정) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">제 3 조 (약관의 명시와 개정)</h2>
        <p className="mt-2">
          1. "회사"는 본 약관의 내용을 "이용자"가 쉽게 알 수 있도록 "서비스"
          초기 화면 또는 연결 화면을 통해 게시합니다.
        </p>
        <p className="mt-2">
          2. "회사"는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및
          정보보호 등에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서 본
          약관을 개정할 수 있습니다.
        </p>
        <p className="mt-2">
          3. "회사"가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
          현행약관과 함께 제1항의 방식에 따라 그 적용일자 7일 전부터 적용일자
          전일까지 공지합니다.
        </p>
      </section>

      {/* 4조 (서비스의 제공 및 변경) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          제 4 조 (서비스의 제공 및 변경)
        </h2>
        <p className="mt-2">1. "서비스"는 다음과 같은 업무를 수행합니다.</p>
        <ul className="mt-1 list-inside list-['가.'] space-y-1 pl-4">
          <li>전국 도서관 소장 도서 정보 검색</li>
          <li>도서관 위치 및 정보 안내</li>
          <li>'내 책장' 등 개인화 기능 제공 (회원 한정)</li>
          <li>기타 {SERVICE_NAME}가 개발하거나 제휴를 통해 제공하는 서비스</li>
        </ul>
        <p className="mt-2">
          2. "서비스"에서 제공하는 도서관의 도서 정보 및 운영 정보는 각 도서관의
          사정에 따라 실제 정보와 다소 차이가 있을 수 있습니다. "회사"는 정보의
          정확성을 높이기 위해 노력하나, 이로 인한 불이익에 대해 책임을 지지
          않습니다.
        </p>
        <p className="mt-2">
          3. "회사"는 상당한 이유가 있는 경우 운영상, 기술상의 필요에 따라
          제공하는 "서비스"의 전부 또는 일부를 변경할 수 있습니다.
        </p>
      </section>

      {/* 5조 (회원 가입 및 탈퇴) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">제 5 조 (회원 가입 및 탈퇴)</h2>
        <p className="mt-2">
          1. "회원" 가입은 "이용자"가 "서비스"가 정한 소셜 로그인(Google, Kakao
          등) 절차를 통해 동의 의사를 표시함으로써 신청이 완료됩니다.
        </p>
        <p className="mt-2">
          2. "회원"은 "서비스" 내 '내 정보' 페이지의 '회원탈퇴' 메뉴를 통하여
          언제든지 회원 탈퇴를 요청할 수 있으며, "회사"는 관련 법령이 정하는
          바에 따라 이를 즉시 처리합니다.
        </p>
        <p className="mt-2">
          3. 회원 탈퇴 시 "회원"이 작성한 '내 책장' 정보 등은 즉시 삭제되며
          복구되지 않습니다.
        </p>
      </section>

      {/* 6조 (이용자의 의무) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">제 6 조 (이용자의 의무)</h2>
        <p className="mt-2">"이용자"는 다음 행위를 하여서는 안 됩니다.</p>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>타인의 정보를 도용하는 행위</li>
          <li>"회사"의 허락 없이 "서비스"를 상업적 목적으로 이용하는 행위</li>
          <li>
            비정상적인 방법(크롤링, 스크래핑, 자동화 프로그램 등)으로 "서비스"의
            데이터를 수집하거나 서버에 부하를 주는 행위
          </li>
          <li>
            "회사"나 제3자의 저작권 등 지식재산권을 침해하거나 명예를 훼손하는
            행위
          </li>
          <li>기타 불법적이거나 부당한 행위</li>
        </ul>
      </section>

      {/* 7조 (책임의 제한 - 면책 조항) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          제 7 조 (책임의 제한 - 면책 조항)
        </h2>
        <p className="mt-2">
          1. "회사"는 천재지변 또는 이에 준하는 불가항력으로 인하여 "서비스"를
          제공할 수 없는 경우에는 "서비스" 제공에 관한 책임이 면제됩니다.
        </p>
        <p className="mt-2">
          2. "회사"는 "이용자"의 귀책사유로 인한 "서비스" 이용의 장애에 대하여
          책임을 지지 않습니다.
        </p>
        <p className="mt-2">
          3. "회사"는 "서비스"가 제공하는 도서관 정보, 도서 데이터 등(제3자가
          제공하는 정보)의 정확성, 신뢰도에 관하여 보증하지 않으며, 이로 인해
          발생한 "이용자"의 손해에 대하여 책임을 지지 않습니다.
        </p>
        <p className="mt-2">
          4. "서비스"는 Google AdSense 등 제3자가 제공하는 광고를 포함할 수
          있으며, "회사"는 해당 광고나 이를 통해 연결되는 웹사이트의 내용에 대해
          보증하거나 책임을 지지 않습니다.
        </p>
      </section>

      {/* 8조 (분쟁 해결) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">제 8 조 (분쟁 해결)</h2>
        <p className="mt-2">
          "서비스" 이용과 관련하여 "회사"와 "이용자" 간에 발생한 분쟁에 관한
          소송은 대한민국 법률을 준거법으로 하며, 민사소송법상의 관할 법원에
          제기합니다.
        </p>
      </section>

      {/* 9조 (문의처) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">제 9 조 (문의처)</h2>
        <p className="mt-2">
          본 약관 및 서비스 이용과 관련한 문의는 아래 이메일로 연락해 주세요.
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
