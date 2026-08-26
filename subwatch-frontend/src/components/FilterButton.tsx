import { IconFilter2 } from "@tabler/icons-react";

export default function FilterButton() {
    return (
        <button
            type="button"
            className="flex gap-2 justify-center items-center bg-[#D4D4D4] cursor-pointer text-sm w-20 h-8.25 xl:w-32 xl:h-12.5 xl:text-xl hover:opacity-75 border">
            Filter <IconFilter2 size={16} />
        </button>
    )
}