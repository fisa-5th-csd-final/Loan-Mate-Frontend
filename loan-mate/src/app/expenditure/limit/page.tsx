"use client";

import MessageBox from "@/components/box/MessageBox";
import TableSection from "@/components/ui/TableSection";
import { TableRow, TableCell } from "@/components/ui/Table";
import { expenditureLimitSample } from "@/data/expenditure-limit.sample";
import { formatCurrency } from "@/lib/util/NumberFormatter";
import PageWithCTA from "../_components/PageWithCTA";
import { useRouter } from "next/navigation"
import { ConsumptionCategoryKeyMap, ConsumptionCategoryMeta } from "../_components/ConsumptionCategoryMeta";
import { ConsumptionCategory, ExpenditureCategory } from "@/models/expenditure-limit";
import SegmentProgressBar from "@/components/SegmentProgressBar";
import CommonButton from "@/components/button/CommonButton";

function convertCategoriesToSegments(categories: ExpenditureCategory[]) {
  return categories.map((cat) => {
    const key = ConsumptionCategoryKeyMap[cat.name];
    const meta = ConsumptionCategoryMeta[key];

    return {
      label: cat.name,
      percent: cat.ratio / 100,
      color: meta.bg,
    };
  });
}

export default function ExpenditureLimitPage() {
  const data = expenditureLimitSample;
  const router = useRouter();

  return (
    <PageWithCTA
      ctaLabel="상환금 납부하러 가기"
      onClick={() => console.log("저장")}
    >
      {/* 상단 영역 */}
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-gray-900 text-[18px] font-semibold">
          한도를 수정할 수 있어요
        </p>

        <button
          className="px-3 py-1 text-[12px] rounded-full bg-gray-100 text-gray-700 border border-gray-300"
          onClick={() => console.log("수정하기 클릭")}
        >
          수정하기
        </button>

      </div>

      {/* 한도 설명 박스 */}
      <MessageBox>
        {data.limit.summaryMessage}
      </MessageBox>

      {/* 예외 수입/지출 추가 섹션 */}
      <div className="mt-6 mb-4 px-1">
        <p className="text-[18px] font-semibold text-gray-900">
          예상치 못한 변동이 있나요?
        </p>
        <p className="text-[15px] text-gray-600 mt-1">
          이번 달 수입·지출에 특별한 변화가 있다면 아래에서 추가해 한도를 다시 계산해보세요.
        </p>

        {/* 버튼 영역 */}
        <div className="flex gap-3 mt-4">

          {/* 예외 수입 추가하기 버튼 */}
          <CommonButton
            label="예외 수입 추가하기"
            onClick={() => router.push("/expenditure/add-unexpected/income")}
            widthClassName="w-1/2"
            size="lg"
            colorClassName="bg-[#E3F2FD] hover:bg-[#D6EBFB]"
            textColorClassName="text-[#0A4AAC]"
            className="border border-[#B7D7F5]"
          />

          {/* 예외 지출 추가하기 버튼 */}
          <CommonButton
            label="예외 지출 추가하기"
            onClick={() => router.push("/expenditure/add-unexpected/outlay")}
            widthClassName="w-1/2"
            size="lg"
            colorClassName="bg-[#FFE7D9] hover:bg-[#FFDCCB]"
            textColorClassName="text-[#8A3A16]"
            className="border border-[#F8C7B3]"
          />

        </div>
      </div>

      {/* 카테고리 지출 테이블 */}
      <TableSection
        topContent={
          <SegmentProgressBar
            segments={convertCategoriesToSegments(data.categories)}
          />
        }
        header={
          <>
            <span className="text-center">카테고리</span>
            <span className="text-center">지출 금액</span>
            <span className="text-center">사용 가능 금액</span>
          </>
        }
        rows={
          <>
            {data.categories.map((cat) => {
              const key = ConsumptionCategoryKeyMap[cat.name]; // ← 한국어 enum → 영문 meta key
              const meta = ConsumptionCategoryMeta[key];
              const Icon = meta.icon;

              return (
                <TableRow key={cat.id}>
                  <TableCell className="text-center font-medium">
                    <div className="flex items-center gap-3">
                      {/* 아이콘 영역 */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: meta.hex + "20" }} // 20 = 투명도
                      >
                        <Icon size={20} color={meta.hex} />
                      </div>

                      {/* 텍스트 영역 */}
                      <div className="flex flex-col text-sm">
                        <span className="font-medium text-gray-900">{cat.name}</span>
                        <span className="text-gray-500 text-[11px]">{cat.ratio}%</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-medium">
                    {formatCurrency(cat.spent)}
                  </TableCell>

                  <TableCell className="text-center font-medium">
                    {formatCurrency(cat.available)}
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        }
      />


      {/* 이번 달 사용/잔여 금액 */}
      <div className="flex gap-3 px-1 mt-5">
        <MessageBox className="flex-1 text-left">
          <span>이번 달에 총 </span>
          <span className="font-semibold text-blue-700">
            {formatCurrency(data.limit.usedAmount)}
          </span>
          <span> 쓸 수 있어요</span>
        </MessageBox>

        <MessageBox className="flex-1 text-left">
          <span>이번 달에 총 </span>
          <span className="font-semibold text-blue-700">
            {formatCurrency(data.limit.availableAmount)}
          </span>
          <span> 쓸 수 있어요</span>
        </MessageBox>
      </div>

      {/* 내 이자를 확인해요 */}
      <div className="flex items-center justify-between mt-10 mb-4 px-1">
        <p className="text-gray-900 text-[18px] font-semibold">
          내 이자를 확인해요
        </p>
      </div>

      {/* 이자 테이블 */}
      <TableSection
        columns="1.5fr 1fr 1fr"
        header={
          <>
            <span className="text-center">대출명</span>
            <span className="text-center">다음달 이자</span>
            <span className="text-center">상환일</span>
          </>
        }
        rows={data.loanRepayments.map((loan) => (
          <TableRow key={loan.id}>
            <TableCell className="text-center font-medium">{loan.loanName}</TableCell>
            <TableCell className="text-center font-medium">
              {formatCurrency(loan.nextRepayment)}
            </TableCell>
            <TableCell className="text-center font-medium">
              {loan.dueDate}
            </TableCell>
          </TableRow>
        ))}
      />
      {/* 내 상환금을 확인해요 */}
      <div className="flex items-center justify-between mt-10 mb-4 px-1">
        <p className="text-gray-900 text-[18px] font-semibold">
          내 상환금을 확인해요
        </p>
      </div>

      {/* 상환금 테이블 */}
      <TableSection
        columns="1.5fr 1fr 1fr"
        header={
          <>
            <span className="text-center">대출명</span>
            <span className="text-center">다음달 이자</span>
            <span className="text-center">상환일</span>
          </>
        }
        rows={data.loanRepayments.map((loan) => (
          <TableRow key={loan.id}>
            <TableCell className="text-center font-medium">{loan.loanName}</TableCell>
            <TableCell className="text-center font-medium">
              {formatCurrency(loan.nextRepayment)}
            </TableCell>
            <TableCell className="text-center font-medium">
              {loan.dueDate}
            </TableCell>
          </TableRow>
        ))}
      />

    </PageWithCTA>

  );
}

