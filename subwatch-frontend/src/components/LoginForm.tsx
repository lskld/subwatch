import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth-context";
import { mainApi } from "../lib/axios-instance";
import axios from "axios";
import type { AuthResult, LoginRequest } from "../api/types";

export default function LoginForm() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin: SubmitHandler<LoginRequest> = async (data) => {
		try {
			const response = await mainApi.post<AuthResult>("/auth/login", data);
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
	} = useForm<LoginRequest>();

	return (
		<form
			className="flex flex-col gap-5 xl:border xl:p-20 md:bg-white justify-center items-center"
			onSubmit={handleSubmit(handleLogin)}
		>
			<NavLink className="flex m-auto hover:opacity-50" to={"/"}>
				<IconArrowLeft />
				Back home
			</NavLink>
			<h1>Login with existing user</h1>
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
			<p className="text-warning">{errors.email?.message}</p>
			<input
				type="password"
				className="bg-white border h-7.5 px-1.5"
				placeholder="Password"
				{...register("password", {
					required: {
						value: true,
						message: "Password required",
					},
				})}
			/>
			<p className="wrap-break-word w-80 text-center text-warning">
				{errors.password?.message}
			</p>
			<button
				className="flex justify-center items-center m-auto h-10 w-30 bg-btn-primary cursor-pointer hover:opacity-75 border"
				type="submit"
			>
				Sign in
				<IconArrowRight size={16} />
			</button>
			<p className="wrap-break-word w-80 text-center text-warning">
				{errors.root?.message}
			</p>
		</form>
	);
}