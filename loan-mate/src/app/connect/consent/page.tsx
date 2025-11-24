"use client";
import Collapse from "@/components/Collapse";

export default function AgreementPage() {
  return (
    <div className="relative min-h-screen bg-white overflow-y-auto">

      {/* 스크롤되는 메인 영역 */}
      <div className="px-2 pb-15 pt-6">
        <h2 className="text-[20px] font-bold text-gray-900 whitespace-nowrap truncate">
          자산 연결을 위해 동의해 주세요
        </h2>

        <h3 className="text-[20px] font-semibold text-gray-700 mt-10 mb-2 whitespace-nowrap truncate">
          전송요구 및 개인(신용)정보 수집·이용 동의
        </h3>
        <p className="text-[16px] text-gray-500 leading-relaxed">
          <span className="text-blue-600">(주)우리은행</span>
          은 「신용정보의 이용 및 보호에 관한 법률」 등 관련 법령에 따라 다음과 같이 귀하의 개인(신용)정보를 처리합니다.
        </p>

        <h3 className="mt-10 text-[18px] font-semibold text-gray-700">
          정보 제공자(전송 요구를 받는 자)
        </h3>
        <br></br>
        <Collapse title="국민은행" contentColor="text-blue-600">
          국민은행 계좌 목록들...
        </Collapse>

        <h3 className="mt-10 text-[18px] font-semibold text-gray-700">
          전송을 요구하는 개인신용정보
        </h3>

        <br></br>

        <ul className="list-disc pl-5 text-[16px] text-gray-500 leading-relaxed">
          <li>
            은행: 계좌(수신/펀드/신탁/ISA/대출상품) 목록, 퇴직연금(개인형 IRP/DC형) 목록,
            선불카드 목록, 수신계좌 정보, 펀드상품 정보, 대출상품 정보, 신탁/ISA상품 정보,
            DB형 퇴직연금 정보, DC형 퇴직연금 정보, 선불카드 정보, 휴면예금 정보
          </li>
        </ul>


        <h3 className="mt-12 text-[18px] font-semibold text-gray-700">
          수집·이용 항목
        </h3>
        <br></br>
        <Collapse title="개인(식별)정보" contentColor="text-gray-700">
          전자서명, 접근토큰, 인증서, 전송요구서
        </Collapse>
        <br></br>
        <Collapse title="신용거래정보" contentColor="text-gray-700">
          전송요구서에 기재된 전송을 요구하는 신용정보
        </Collapse>
      </div>

      {/* 하단 CTA (고정) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-6 pt-4 bg-white">
        <button className="w-full bg-blue-500 text-white font-semibold py-4 rounded-2xl text-[16px]">
          전체 동의하기
        </button>
      </div>
    </div>
  );
}
