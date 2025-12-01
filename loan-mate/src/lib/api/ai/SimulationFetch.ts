import { apiClient } from "@/lib/api/client";
import type { AiSimulationResponse } from "../../../../types/ai/AiSimulation";
import { SuccessBody } from "../../../../types/response";
import { API } from "@/consts/ROUTES";
import { SimulationRequest } from "../../../../types/ai/AiSimulation";

// API 호출
export async function simulationFetch(requestBody: SimulationRequest): Promise<AiSimulationResponse> {
    const response = await apiClient.post<SuccessBody<AiSimulationResponse>>(API.LOAN.SIMULATION, requestBody);
    if (!response || !response.data) {
        throw new Error("Invalid response from AI Simulation API");
    }
    return response.data;
}
