import { useForm, type SubmitHandler } from "react-hook-form";
import type {
	CreateSubscriptionRequest,
	SubscriptionCategoryResponse,
	SubscriptionResponse,
} from "../api/types";
import { createSubscription } from "../api/subscriptions";
import CreateCategoryButton from "./CreateCategoryButton";

export default function CreateSubscriptionForm({
	onSuccess,
	categories,
	onRequestNewCategory,
}: {
	onSuccess: (subscription: SubscriptionResponse) => void;
	categories: SubscriptionCategoryResponse[];
	onRequestNewCategory: () => void;
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
			<label>
				Title: <span className="text-warning">{errors.title?.message}</span>
			</label>
			<input
				className="bg-white border h-7.5 px-1.5"
				placeholder="Eg. Netflix"
				{...register("title", {
					required: {
						value: true,
						message: "Required",
					},
				})}
			/>
			<label>
				Description (optional){" "}
				<span className="text-warning">{errors.description?.message}</span>
			</label>
			<input
				className="bg-white border h-7.5 px-1.5"
				placeholder="Eg. Shared streaming service"
				{...register("description")}
			/>
			<label>
				Price: <span className="text-warning">{errors.price?.message}</span>
			</label>
			<input
				className="bg-white border h-7.5 px-1.5"
				placeholder="Eg. 219"
				{...register("price", {
					required: {
						value: true,
						message: "Required",
					},
				})}
			/>
			<label>
				Billing Interval:{" "}
				<span className="text-warning">{errors.billingInterval?.message}</span>
			</label>
			<select
				className="bg-white border h-7.5 px-1.5"
				{...register("billingInterval", {
					required: {
						value: true,
						message: "Required",
					},
				})}
			>
				<option value="Weekly">Weekly</option>
				<option value="BiWeekly">BiWeekly</option>
				<option value="Monthly">Monthly</option>
				<option value="Quarterly">Quarterly</option>
				<option value="Yearly">Yearly</option>
			</select>
			<label>
				Next billing date:{" "}
				<span className="text-warning">{errors.nextBillingDate?.message}</span>
			</label>
			<input
				type="date"
				className="bg-white border h-7.5 px-1.5"
				{...register("nextBillingDate", {
					required: {
						value: true,
						message: "Required",
					},
				})}
			/>
			<label>
				Category:{" "}
				<span className="text-warning">
					{errors.subscriptionCategoryId?.message}
				</span>
			</label>
			<div className="flex flex-row">
				<select
					className="bg-white border h-7.5 px-1.5 w-full"
					{...register("subscriptionCategoryId", {
						required: {
							value: true,
							message: "Required",
						},
					})}
				>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.title}
						</option>
					))}
				</select>
				<CreateCategoryButton onClick={onRequestNewCategory} />
			</div>
			<button
				className="flex justify-center items-center m-auto mt-5 h-10 w-30 bg-btn-primary cursor-pointer hover:opacity-75 border"
				type="submit"
			>
				Create
			</button>
		</form>
	);
}