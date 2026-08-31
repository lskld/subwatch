import { mainApi } from "../lib/axios-instance";
import type {
	CreateSubscriptionRequest,
	SubscriptionResponse,
	UpdateSubscriptionRequest,
} from "./types";

export async function getSubscriptions() {
	const response = await mainApi.get<SubscriptionResponse[]>("/subscriptions");
	return response.data;
}

export async function getSubscription({ id }: { id: string }) {
	const response = await mainApi.get<SubscriptionResponse>(
		`/subscriptions/${id}`,
	);
	return response.data;
}

export async function createSubscription({
	title,
	description,
	price,
	billingInterval,
	nextBillingDate,
	subscriptionCategoryId,
}: CreateSubscriptionRequest) {
	const data = {
		title,
		description,
		price,
		billingInterval,
		nextBillingDate,
		subscriptionCategoryId,
	};
	const response = await mainApi.post<SubscriptionResponse>(
		"/subscriptions",
		data,
	);
	return response.data;
}

export async function deleteSubscription(id: number) {
	await mainApi.delete(`/subscriptions/${id}`);
}

export async function updateSubscription(
	id: number,
	updateReq: UpdateSubscriptionRequest,
) {
	const response = await mainApi.put<SubscriptionResponse>(
		`/subscriptions/${id}`,
		updateReq,
	);
	return response.data;
}