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

	const handleCreate: SubmitHandler<CreateSubscriptionRequest> = async (data) => {
		const newSubscription = await createSubscription(data);
		onSuccess(newSubscription);
	};

	return (
        <form
            className="flex flex-col gap-2 p-3 md:p-10"
            onSubmit={handleSubmit(handleCreate)}>
            <h1>Create new subscription</h1>
            <input
                className="bg-white border h-7.5 px-1.5"
                placeholder="Title"
            />
            <input
                className="bg-white border h-7.5 px-1.5"
                placeholder="Description"
            />
            <input
                className="bg-white border h-7.5 px-1.5"
                placeholder="Price"
            />
            <input
                className="bg-white border h-7.5 px-1.5"
                placeholder="Billing Interval"
            />
            <input
                className="bg-white border h-7.5 px-1.5"
                placeholder="Next billing date"
            />
            <input
                className="bg-white border h-7.5 px-1.5"
                placeholder="Category"
            />
            <button
                className="flex justify-center items-center m-auto h-10 w-30 bg-btn-primary cursor-pointer hover:opacity-75 border"
                type="submit"
            >
                Create
            </button>
		</form>
	);
}