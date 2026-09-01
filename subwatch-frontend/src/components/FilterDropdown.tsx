import type { SubscriptionCategoryResponse } from "../api/types";

type FilterProps = {
	categories: SubscriptionCategoryResponse[];
	onSelect: (category: SubscriptionCategoryResponse | null) => void;
};

export default function FilterDropdown({ categories, onSelect }: FilterProps) {
	return (
		<div className="bg-white absolute top-full right-0 mt-1 z-10 border flex flex-col text-left w-48 shadow-lg">
			<button
				className="h-8 hover:bg-gray-400 cursor-pointer"
				onClick={() => onSelect(null)}
			>
				No filter
			</button>
			<div className="flex flex-col max-h-40 overflow-y-auto">
				{categories.map((category) => (
					<button
						className="h-8 hover:bg-gray-400 cursor-pointer"
						onClick={() => onSelect(category)}
						key={category.id}
					>
						{category.title}
					</button>
				))}
			</div>
		</div>
	);
}