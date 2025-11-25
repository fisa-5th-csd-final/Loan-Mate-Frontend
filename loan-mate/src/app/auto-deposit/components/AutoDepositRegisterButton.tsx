"use client";

import { useRouter } from "next/navigation";
import CommonButton from "@/components/button/CommonButton";

export default function AutoDepositRegisterButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/apply");
  };

  return (
    <div className="mt-4">
      <CommonButton 
        label="자동 예치 등록하기"
        size="lg"
        widthClassName="w-full"
        onClick={handleClick}
      />
    </div>
  );
}
