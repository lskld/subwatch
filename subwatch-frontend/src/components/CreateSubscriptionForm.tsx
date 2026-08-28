import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateSubscriptionRequest, SubscriptionResponse } from "../api/types";
import { createSubscription } from "../api/subscriptions";

export default function CreateSubscriptionForm({
	onSuccess,
}: {
	onSuccess: (subscription: SubscriptionResponse) => void;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateSubscriptionRequest>();

	const handleCreate: SubmitHandler<CreateSubscriptionRequest> = async (
		data,
	) => {
		const newSubscription = await createSubscription(data);
		onSuccess(newSubscription);
	};

	return (
		<form
			className="flex flex-col gap-2 p-3 md:p-10"
			onSubmit={handleSubmit(handleCreate)}
		>
			<h1>Create new subscription</h1>
			<label>Title:</label>
			<input
				className="bg-white border h-7.5 px-1.5"
				placeholder="Eg. Netflix"
				{...register("title")}
			/>
			<label>Description (optional)</label>
			<input
				className="bg-white border h-7.5 px-1.5"
				placeholder="Eg. Shared streaming service"
				{...register("description")}
			/>
			<label>Price:</label>
			<input
				className="bg-white border h-7.5 px-1.5"
				placeholder="Eg. 219"
				{...register("price")}
			/>
			<label>Billing Interval: </label>
			<select
				className="bg-white border h-7.5 px-1.5"
				{...register("billingInterval")}
			>
				<option value="Weekly">Weekly</option>
				<option value="BiWeekly">BiWeekly</option>
				<option value="Monthly">Monthly</option>
				<option value="Quarterly">Quarterly</option>
				<option value="Yearly">Yearly</option>
			</select>
			<label>Next billing date:</label>
			<input
				type="date"
				className="bg-white border h-7.5 px-1.5"
				{...register("nextBillingDate")}
			/>
			<label>Category:</label>
			<select
				className="bg-white border h-7.5 px-1.5"
				{...register("subscriptionCategoryId")}
			>
				<option value="1">Uncategorized</option>
			</select>
			<button
				className="flex justify-center items-center m-auto mt-5 h-10 w-30 bg-btn-primary cursor-pointer hover:opacity-75 border"
				type="submit"
			>
				Create
			</button>
		</form>
	);
}