import { mainApi } from "../lib/axios-instance";
import type { PriceHistoryResponse, CreatePriceHistoryRequest } from "./types";

export async function createPricehistory({ price, startDate, endDate, subscriptionId }: CreatePriceHistoryRequest) {
    const data = {
        price,
        startDate,
        endDate,
        subscriptionId
    }

    const response = await mainApi.post<PriceHistoryResponse>("/pricehistories", data)
    return response.data
}

export async function getPricehistory(id: number) {
    const response = await mainApi.get<PriceHistoryResponse>(`/pricehistory/${id}`)
    return response.data
}

export async function getPriceHistories() {
    const response = await mainApi.get<PriceHistoryResponse[]>("/pricehistories")
    return response.data
}

export async function deletePricehistory(id: number) {
    await mainApi.delete(`/pricehistory/${id}`)
}