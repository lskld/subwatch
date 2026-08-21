import { IconZoomMoneyFilled } from "@tabler/icons-react"

export default function Dashboard() {
    return (
			<>
				<section className="bg-white flex flex-col">
					<div className="flex justify-center items-center gap-2 mt-5 xl:mt-15">
						<IconZoomMoneyFilled className="size-10 xl:size-14" />
						<div>
							<h1 className="xl:text-3xl">Subwatch dashboard</h1>
							<p className="text-right text-gray-500 text-xs xl:text-sm">
								Keep track of all your expenses
							</p>
						</div>
					</div>
				</section>
			</>
		);
}
