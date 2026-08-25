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
            onSubmit={handleSubmit(handleRegistration)}>
            <NavLink className="flex m-auto hover:opacity-50" to={"/"}>
					<IconArrowLeft />
					Back home
				</NavLink>
            <h1>Register a user</h1>
            <input
                className="bg-white border h-7.5 px-1.5"
                placeholder="Username"
                {...register("username")} />
            <input
                className="bg-white border h-7.5 px-1.5"
                placeholder="Email"
                {...register("email")} />
            <input
                className="bg-white border h-7.5 px-1.5"
                placeholder="Password"
                {...register("password")} />
            <button
					className="flex justify-center items-center m-auto h-10 w-30 bg-green-400 cursor-pointer hover:opacity-75 border"
					type="submit"
				>
					Register
					<IconArrowRight size={16} />
				</button>
		</form>
    )
}