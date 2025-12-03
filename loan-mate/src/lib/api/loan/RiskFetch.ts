import { API } from "@/consts/ROUTES";
import { apiClient } from "../client";
import { LoanRiskResponse, TotalLoanRiskResponse } from "@/../types/loan";
import { SuccessBody } from "@/../types/response";

export const fetchLoanRisk = async (loanId: number): Promise<LoanRiskResponse> => {
    const response = await apiClient.get<SuccessBody<LoanRiskResponse>>(API.LOAN.RISK(loanId));
    return response.data;
};

export const fetchTotalLoanRisk = async (): Promise<TotalLoanRiskResponse> => {
    const response = await apiClient.get<SuccessBody<TotalLoanRiskResponse>>(API.LOAN.TOTAL_RISK);
    return response.data;
};
