import { NavLink } from "react-router-dom";
import { useAuth } from "../lib/auth-context";
import { mainApi } from "../lib/axios-instance";
import { IconDoorExit } from "@tabler/icons-react";

export default function LogoutButton() {
	const { logout } = useAuth();

	const handleLogout = async () => {
		const response = await mainApi.post("/auth/logout");
		if (response.status === 200) {
			logout();
		}
	};

	return (
		<NavLink to={"/"}>
			<button
				onClick={handleLogout}
				type="button"
				className="flex items-center justify-center gap-2 h-8 w-25 xl:h-10 xl:w-30 bg-btn-warning cursor-pointer hover:opacity-75 border"
			>
				Logout
				<IconDoorExit size={16} />
			</button>
		</NavLink>
	);
}