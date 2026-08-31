import type { components } from "./generated-types";

export type CreatePriceHistoryRequest =
	components["schemas"]["CreatePriceHistoryRequest"];
export type CreateSubscriptionCategoryRequest =
	components["schemas"]["CreateSubscriptionCategoryRequest"];
export type CreateSubscriptionRequest = Omit<
	components["schemas"]["CreateSubscriptionRequest"],
	"billingInterval"
> & { billingInterval: string };
export type LoginRequest = components["schemas"]["LoginRequest"];
export type RegisterRequest = components["schemas"]["RegisterRequest"];
export type UpdatePriceHistoryRequest =
	components["schemas"]["UpdatePriceHistoryRequest"];
export type UpdateSubscriptionCategoryRequest =
	components["schemas"]["UpdateSubscriptionCategoryRequest"];
export type UpdateSubscriptionRequest =
	components["schemas"]["UpdateSubscriptionRequest"];
export type AuthResult = components["schemas"]["AuthResult"];
export type UserResponse = components["schemas"]["UserResponse"];
export type PriceHistoryResponse =
	components["schemas"]["PriceHistoryResponse"];
export type SubscriptionCategoryResponse =
	components["schemas"]["SubscriptionCategoryResponse"];
export type SubscriptionResponse = Omit<
	components["schemas"]["SubscriptionResponse"],
	"billingInterval" | "price" | "id"
> & { billingInterval: string; price: number; id: number };