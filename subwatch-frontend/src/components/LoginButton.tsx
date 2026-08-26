import { NavLink } from "react-router-dom";

export default function LoginButton() {
    return (
			<NavLink to={"login"}>
				<button
					type="button"
					className="h-10 w-30 bg-btn-primary cursor-pointer hover:opacity-75 border"
				>
					Login
				</button>
			</NavLink>
		);
}