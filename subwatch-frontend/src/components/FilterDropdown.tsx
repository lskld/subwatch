import type { SubscriptionCategoryResponse } from "../api/types"

type FilterProps = {
    categories: SubscriptionCategoryResponse[];
    onSelect: (category: SubscriptionCategoryResponse) => void;
}

export default function FilterDropdown({categories, onSelect}: FilterProps) {
    return (
        <div className="bg-white border flex flex-col text-left w-1/4 self-end">
            {categories.map((category) => (
                <button
                    className="h-8 hover:bg-gray-400 cursor-pointer"
                    onClick={() => onSelect(category)}
                    key={category.id}>{category.title}</button>
            ))}
        </div>
    )
}