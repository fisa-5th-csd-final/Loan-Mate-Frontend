import { useState, useMemo, useEffect, useCallback } from "react";
import { ConsumptionCategoryKey } from "@/models/expenditure-limit";
import { SpendingRecommendResponse, SpendingLimitPayload } from "@/lib/api/expenditure/types";
import { useUpdateSpendingLimitMutation } from "@/lib/api/expenditure/hooks";

/**
 * 
 * @param recommend 추천 지출
 * @returns 
 * 사용자에게 추천 지출 한도를 보여줄 때의 로직
 */
export function useSpendingRecommendationManager(
  recommend: SpendingRecommendResponse | undefined
) {
  const KEYS: ConsumptionCategoryKey[] = [
    "FOOD",
    "TRANSPORT",
    "SHOPPING",
    "ENTERTAINMENT",
  ];

  // AI baseline - 서버에서 내려주는 추천 지출 값
  const aiBaseline = useMemo<Record<ConsumptionCategoryKey, number>>(() => {
    const src =
      recommend?.aiOriginalValues &&
      Object.keys(recommend.aiOriginalValues).length > 0
        ? recommend.aiOriginalValues
        : recommend?.categoryRecommendation;

    return KEYS.reduce((acc, key) => {
      acc[key] = src?.[key] ?? 0;
      return acc;
    }, {} as Record<ConsumptionCategoryKey, number>);
  }, [recommend]);

  // (현재 추천 금액: 사용자 커스텀 포함)
  const base = useMemo<Record<ConsumptionCategoryKey, number>>(() => {
    return KEYS.reduce((acc, key) => {
      acc[key] = recommend?.categoryRecommendation?.[key] ?? 0;
      return acc;
    }, {} as Record<ConsumptionCategoryKey, number>);
  }, [recommend]);

  const [edited, setEdited] = useState(base);
  const [draft, setDraft] = useState(base);

  useEffect(() => {
    setEdited(base);
    setDraft(base);
  }, [base]);

  const updateMut = useUpdateSpendingLimitMutation();

  const applyDraft = useCallback(async () => {
    setEdited(draft);

    const payload: SpendingLimitPayload = {
      user_limit_amount: draft,
    };

    await updateMut.mutateAsync(payload);
  }, [draft, updateMut]);

  const isOverBaseline = useCallback(() => {
    return KEYS.some((k) => draft[k] > aiBaseline[k]);
  }, [draft, aiBaseline]);

  return {
    KEYS,
    edited,
    draft,
    setDraft,
    aiBaseline,
    applyDraft,
    isOverBaseline,
    isLoading: updateMut.isPending,
  };
}
