import { IconPlus } from "@tabler/icons-react";

export default function CreateCategoryButton({ onClick }: { onClick: () => void } ) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="flex justify-center items-center h-7.5 w-10 bg-btn-primary cursor-pointer hover:opacity-75 border">
			<IconPlus />
		</button>
    )
}