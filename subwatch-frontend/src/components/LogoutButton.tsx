import { NavLink } from "react-router-dom";
import { useAuth } from "../lib/auth-context";
import { mainApi } from "../lib/axios-instance";

export default function LogoutButton() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        const response = await mainApi.post("/auth/logout")
        if (response.status === 200) {
            logout()
        }
	};

    return (
			<NavLink to={"/"}>
            <button
                    onClick={handleLogout}
					type="button"
					className="h-10 w-30 bg-red-400 cursor-pointer hover:opacity-75 border"
				>
					Logout
				</button>
			</NavLink>
		);
}