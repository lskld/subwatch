import { IconZoomMoneyFilled } from "@tabler/icons-react";
import CreateSubscriptionButton from "../components/CreateSubscriptionButton";
import FilterButton from "../components/FilterButton";
import LogoutButton from "../components/LogoutButton";
import SubscriptionCard from "../components/SubscriptionCard";
import { createSubscription, getSubscriptions } from "../api/subscriptions";
import { useEffect, useState } from "react";
import type { SubscriptionResponse } from "../api/types";

export default function Dashboard() {
	const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>(
		[],
	);
	const totalPrice = subscriptions.reduce(
		(sum, subscription) => sum + subscription.price,
		0,
	);

	useEffect(() => {
		async function loadSubscriptions() {
			const data = await getSubscriptions();
			setSubscriptions(data);
		}
		loadSubscriptions();
	}, []);

	const handleCreate = async () => {
		const newSubscription = await createSubscription({
			title: "Netflix",
			description: null,
			price: 149,
			billingInterval: "Monthly",
			nextBillingDate: "2026-09-25",
			subscriptionCategoryId: 1,
		});
		setSubscriptions((prev) => [...prev, newSubscription]);
	};

	return (
		<section className="w-full xl:w-[70%] mx-auto flex flex-col flex-1 min-h-svh bg-white px-2 xl:px-20">
			<div className="flex justify-end mt-2">
				<LogoutButton />
			</div>
			<div className="flex justify-center items-center gap-2 mt-5 xl:mt-15">
				<IconZoomMoneyFilled className="size-10 xl:size-14" />
				<div>
					<h1 className="xl:text-3xl">Subwatch dashboard</h1>
					<p className="text-right text-gray-500 text-xs xl:text-sm">
						Keep track of all your expenses
					</p>
				</div>
			</div>
			<div className="mt-15 flex justify-between">
				<CreateSubscriptionButton onClick={handleCreate} />
				<FilterButton />
			</div>
			<div className="grid grid-cols-4 text-center text-xs md:text-base mt-10 mb-2">
				<p>Subscription</p>
				<p>Interval</p>
				<p>Billing Date</p>
				<p>Price</p>
			</div>
			{subscriptions.map((subscription) => (
				<SubscriptionCard
					key={subscription.id}
					name={subscription.title}
					billingInterval={subscription.billingInterval}
					billingDate={subscription.nextBillingDate.split("T")[0]}
					price={subscription.price}
				/>
			))}
			{subscriptions.length > 0 ? (
				<div className="flex justify-between text-sm xl:text-base">
					<p>Subscriptions: {subscriptions.length}</p>
					<p>Monthly Total: {totalPrice}</p>
				</div>
			) : (
				<p className="mt-10 text-center">No subscriptions yet</p>
			)}
		</section>
	);
}
