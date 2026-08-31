import { IconTrash, IconUpload } from "@tabler/icons-react";
import type {
	SubscriptionCategoryResponse,
	SubscriptionResponse,
	UpdateSubscriptionRequest,
} from "../api/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { updateSubscription } from "../api/subscriptions";

type SubViewProps = {
	subResponse: SubscriptionResponse;
	onDelete: () => void;
	onUpdate: (subscription: SubscriptionResponse) => void;
	categories: SubscriptionCategoryResponse[];
	deleteError: string | null;
};

export default function ViewEditSubscription({
	subResponse,
	onDelete,
	onUpdate,
	categories,
	deleteError,
}: SubViewProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateSubscriptionRequest>({
		defaultValues: {
			title: subResponse.title,
			description: subResponse.description,
			price: subResponse.price,
			billingInterval: subResponse.billingInterval,
			nextBillingDate: subResponse.nextBillingDate.split("T")[0],
			subscriptionCategoryId: subResponse.subscriptionCategoryResponse.id,
		},
	});

	const handleUpdate: SubmitHandler<UpdateSubscriptionRequest> = async (
		data,
	) => {
		const updatedSubscription = await updateSubscription(subResponse.id, data);
		onUpdate(updatedSubscription);
	};

	return (
		<div className="flex flex-col justify-center gap-5 p-6">
			<form
				className="flex flex-col gap-2 p-3 md:p-10"
				onSubmit={handleSubmit(handleUpdate)}
			>
				<h1 className="mb-5">Subscription details</h1>
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
					<span className="text-warning">
						{errors.billingInterval?.message}
					</span>
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
					<span className="text-warning">
						{errors.nextBillingDate?.message}
					</span>
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
				</div>
				<div className="flex gap-2 self-center mt-5">
					<button
						className="flex gap-2 items-center justify-center bg-warning w-25 h-8 cursor-pointer hover:opacity-75"
						type="button"
						onClick={onDelete}
					>
						Delete <IconTrash size={16} />
					</button>
					<button
						className="flex gap-2 items-center justify-center bg-primary-blue w-25 h-8 cursor-pointer hover:opacity-75"
						type="submit"
					>
						Update <IconUpload size={16} />
					</button>
				</div>
			</form>
			{deleteError && <p>{deleteError}</p>}
		</div>
	);
}
