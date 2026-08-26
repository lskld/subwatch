import { IconPlus } from "@tabler/icons-react";

export default function CreateSubscriptionButton() {
    return (
			<button
				type="button"
				className="flex gap-2 justify-center items-center bg-btn-primary cursor-pointer text-sm w-40 h-8.25 xl:w-60 xl:h-12.5 xl:text-xl hover:opacity-75 border"
			>
				New subscription <IconPlus size={16} />
			</button>
		);
}