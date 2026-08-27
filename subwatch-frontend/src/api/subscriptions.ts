import { mainApi } from "../lib/axios-instance";
import type { SubscriptionResponse } from "./types";

export async function getSubscriptions() {
    const response = await mainApi.get<SubscriptionResponse[]>("/subscriptions")
    return response.data
}