import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { NavLink } from "react-router-dom"

type FormInputs = {
    username: string,
    email: string,
    password: string
}

const handleRegistration: SubmitHandler<FormInputs> = (data) => {
    console.log(data)
}

export default function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>()
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
				<p className="text-red-500">{errors.username?.message}</p>
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
				<p className="text-red-500">{errors.email?.message}</p>
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
				<p className="wrap-break-word w-80 text-center text-red-500">
					{errors.password?.message}
				</p>
				<input
					className="bg-white border h-7.5 px-1.5"
					placeholder="Password"
					{...register("password", {
						required: {
							value: true,
							message: "Password required",
						},
						pattern: {
							value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
							message:
								"Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
						},
					})}
				/>
				<button
					className="flex justify-center items-center m-auto h-10 w-30 bg-green-400 cursor-pointer hover:opacity-75 border"
					type="submit"
				>
					Register
					<IconArrowRight size={16} />
				</button>
			</form>
		);
}