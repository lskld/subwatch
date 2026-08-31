import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateSubscriptionCategoryRequest, SubscriptionCategoryResponse } from "../api/types";
import { createSubscriptionCategory } from "../api/subscription-categories";
import { IconArrowLeft } from "@tabler/icons-react";

export default function CreateCategoryForm({ onSuccess, onBack }: { onSuccess: (category: SubscriptionCategoryResponse) => void, onBack: () => void }) {
    const {
            register,
            handleSubmit,
            formState: { errors },
    } = useForm<CreateSubscriptionCategoryRequest>();

    const handleCreate: SubmitHandler<CreateSubscriptionCategoryRequest> = async (
            data,
        ) => {
            const newSubscription = await createSubscriptionCategory(data);
            onSuccess(newSubscription);
        };
    
	return (
		<div className="flex flex-col justify-center items-center">
			<button
				className="flex cursor-pointer"
				type="button"
				onClick={onBack}>
				<IconArrowLeft /> Back
			</button>
			<form
				className="flex flex-col gap-2 p-3 md:p-10"
				onSubmit={handleSubmit(handleCreate)}
			>
				<h1>Create new category</h1>
				<label>
					Title: <span className="text-warning">{errors.title?.message}</span>
				</label>
				<input
					className="bg-white border h-7.5 px-1.5"
					placeholder="Eg. Streaming Services"
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
					placeholder="..."
					{...register("description")}
				/>
				<button
					className="flex justify-center items-center m-auto mt-5 h-10 w-30 bg-btn-primary cursor-pointer hover:opacity-75 border"
					type="submit"
				>
					Create
				</button>
			</form>
		</div>
    )
}