import { NavLink } from "react-router-dom";

export default function RegisterButton() {
    return (
        <NavLink to={"register"}>
			<button
				type="button"
				className="h-10 w-30 bg-green-400 cursor-pointer hover:opacity-75"
			>
				Register
			</button>
		</NavLink>
    )
}