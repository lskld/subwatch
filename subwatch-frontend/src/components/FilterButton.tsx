import { IconFilter2 } from "@tabler/icons-react";

export default function FilterButton({
	openFilters,
}: {
	openFilters: () => void;
}) {
	return (
		<button
			onClick={openFilters}
			type="button"
			className="flex gap-2 justify-center items-center bg-btn-secondary cursor-pointer text-sm w-20 h-8.25 xl:w-32 xl:h-12.5 xl:text-xl hover:opacity-75 border"
		>
			Filter <IconFilter2 size={16} />
		</button>
	);
}