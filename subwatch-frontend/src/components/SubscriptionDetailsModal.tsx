import { IconX } from "@tabler/icons-react";
import type { ReactNode } from "react";

export default function SubscriptionDetailsModal({ onClose, children }: { onClose: () => void; children: ReactNode }) {
    return (
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
				<div className="bg-white p-6">
					<button className="cursor-pointer" onClick={onClose}>
						<IconX />
					</button>
					{children}
				</div>
			</div>
		);
}