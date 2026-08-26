import { NavLink } from "react-router-dom";

export default function RegisterButton() {
    return (
			<NavLink to={"register"}>
				<button
					type="button"
					className="h-10 w-30 bg-primary cursor-pointer hover:opacity-75 border"
				>
					Register
				</button>
			</NavLink>
		);
}