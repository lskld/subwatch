import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function handleRegistration() {}

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	return (
		<section className="min-h-svh flex justify-center items-center">
			<form className="flex flex-col gap-5 xl:border xl:p-20 bg-white">
				<NavLink className="flex m-auto hover:opacity-50" to={"/"}>
					<IconArrowLeft />
					Back home
				</NavLink>
				<h1>Register a new user</h1>
				<input
					className="bg-white border h-7.5 px-1.5"
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					className="bg-white border h-7.5 px-1.5"
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="bg-white border h-7.5 px-1.5"
					type="text"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className="flex justify-center items-center m-auto h-10 w-30 bg-green-400 cursor-pointer hover:opacity-75 border"
					type="submit"
					onClick={handleRegistration}
				>
					Register
					<IconArrowRight size={16} />
				</button>
			</form>
		</section>
	);
}
