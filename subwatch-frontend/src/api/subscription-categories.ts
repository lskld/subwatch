import { mainApi } from "../lib/axios-instance";
import type { CreateSubscriptionCategoryRequest, SubscriptionCategoryResponse } from "./types";

export async function getSubscriptionCategories() {
    const response = await mainApi.get<SubscriptionCategoryResponse[]>("/subscriptioncategories")
    return response.data
}

export async function getSubscriptionCategory({ id }: { id: string }) {
    const response = await mainApi.get<SubscriptionCategoryResponse>(
        `/subscriptioncategories/${id}`,
    );
    return response.data;
}

export async function createSubscriptionCategory({
    title,
    description,
}: CreateSubscriptionCategoryRequest) {
    const data = {
        title,
        description,
    };
    const response = await mainApi.post<SubscriptionCategoryResponse>(
        "/subscriptioncategories",
        data,
    );
    return response.data;
}