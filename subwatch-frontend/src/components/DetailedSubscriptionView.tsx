import { IconTrash } from "@tabler/icons-react";
import type { SubscriptionResponse } from "../api/types";

type SubViewProps = {
	subResponse: SubscriptionResponse;
	onDelete: () => void;
	deleteError: string | null;
};

export default function DetailedSubscriptionView({
	subResponse,
	onDelete,
	deleteError,
}: SubViewProps) {
	return (
		<div className="flex flex-col justify-center gap-5 p-6">
			<h1>{subResponse.title}</h1>
			<div>
				<p>Category: {subResponse.subscriptionCategoryResponse.title}</p>
				<p>
					Description:{" "}
					{subResponse.description ? subResponse.description : "No description"}
				</p>
				<p>Price: {subResponse.price}</p>
				<p>Billing interval: {subResponse.billingInterval}</p>
				<p>Next billing date: {subResponse.nextBillingDate.split("T")[0]}</p>
			</div>
			<button
				className="flex items-center justify-center bg-warning w-25 h-8 cursor-pointer hover:opacity-75"
				type="button"
				onClick={onDelete}
			>
				Delete <IconTrash />
			</button>
			{deleteError && <p>{deleteError}</p>}
		</div>
	);
}
