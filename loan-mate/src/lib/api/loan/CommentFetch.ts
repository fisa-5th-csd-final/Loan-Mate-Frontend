// src/lib/api/loan/CommentFetch.ts

import type { LoanAiCommentResponse } from "@/../types/loan/LoanAiCommentResponse";
import { apiClient } from "@/lib/api/client";
import type { SuccessBody } from "@/../types/response";
import { API } from "@/consts/ROUTES";

export async function fetchLoanComment(loanId: number): Promise<string> {
    const response = await apiClient.get<SuccessBody<LoanAiCommentResponse>>(API.LOAN.COMMENT(loanId));

    if (!response || !response.data) {
        throw new Error("Invalid response from loan comment API");
    }

    return response.data.comment;
}
