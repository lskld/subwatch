import { NavLink } from "react-router-dom";

export default function LoginButton() {
    return (
        <NavLink to={"login"}>
			<button
				type="button"
				className="h-10 w-30 bg-green-400 cursor-pointer hover:opacity-75"
			>
				Login
			</button>
		</NavLink>
    )
}