import { IconZoomMoneyFilled } from "@tabler/icons-react";
import LoginButton from "../components/LoginButton";
import RegisterButton from "../components/RegisterButton";

export default function Home() {
	return (
		<section className="min-h-svh flex items-center justify-center">
			<div className="xl:border xl:p-20 flex flex-col gap-10">
				<div className="flex items-center gap-2">
					<IconZoomMoneyFilled className="size-10 xl:size-14" />
					<div>
						<h1 className="xl:text-3xl">Subwatch dashboard</h1>
						<p className="text-right text-gray-500 text-xs xl:text-sm">
							Keep track of all your expenses
						</p>
					</div>
				</div>
				<div className="flex justify-center gap-5">
					<LoginButton />
					<RegisterButton />
				</div>
			</div>
		</section>
	);
}
