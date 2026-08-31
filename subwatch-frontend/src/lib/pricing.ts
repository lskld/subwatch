const MONTHLY_CONVERSION_FACTORS: Record<string, number> = {
	Weekly: 52 / 12,
	BiWeekly: 26 / 12,
	Monthly: 1,
	Quarterly: 1 / 3,
	Yearly: 1 / 12,
};

export function toMonthlyPrice(price: number, billingInterval: string): number {
    return price * MONTHLY_CONVERSION_FACTORS[billingInterval]
}