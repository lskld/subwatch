import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { authApi } from "../lib/axios-instance";
import { useAuth } from "../lib/auth-context";
import axios from "axios";

type FormInputs = {
	username: string;
	email: string;
	password: string;
};

export default function RegistrationForm() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleRegistration: SubmitHandler<FormInputs> = async (data) => {
		try {
			const response = await authApi.post("/register", data);
			login(response.data.token as string);
			navigate("/dashboard");
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 400) {
				const errors = error.response.data.errors;
				const message = Object.values(errors).flat()[0];
				setError("root", { message: message as string });
			} else {
				setError("root", { message: "An error has occured, try again..." });
			}
		}
	};

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormInputs>();

	return (
		<form
			className="flex flex-col gap-5 xl:border xl:p-20 bg-white justify-center items-center"
			onSubmit={handleSubmit(handleRegistration)}
		>
			<NavLink className="flex m-auto hover:opacity-50" to={"/"}>
				<IconArrowLeft />
				Back home
			</NavLink>
			<h1>Register a user</h1>
			<input
				className="bg-white border h-7.5 px-1.5"
				placeholder="Username"
				{...register("username", {
					required: {
						value: true,
						message: "Username required",
					},
				})}
			/>
			<p className="text-red-500">{errors.username?.message}</p>
			<input
				className="bg-white border h-7.5 px-1.5"
				placeholder="Email"
				{...register("email", {
					required: {
						value: true,
						message: "Email required",
					},
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: "Enter a valid e-mail address",
					},
				})}
			/>
			<p className="text-red-500">{errors.email?.message}</p>
			<input
				type="password"
				className="bg-white border h-7.5 px-1.5"
				placeholder="Password"
				{...register("password", {
					required: {
						value: true,
						message: "Password required",
					},
					pattern: {
						value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
						message:
							"Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
					},
				})}
			/>
			<p className="wrap-break-word w-80 text-center text-red-500">
				{errors.password?.message}
			</p>
			<button
				className="flex justify-center items-center m-auto h-10 w-30 bg-green-400 cursor-pointer hover:opacity-75 border"
				type="submit"
			>
				Register
				<IconArrowRight size={16} />
			</button>
			<p className="wrap-break-word w-80 text-center text-red-500">
				{errors.root?.message}
			</p>
		</form>
	);
}
