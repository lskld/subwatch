import { IconZoomMoneyFilled } from "@tabler/icons-react";
import CreateSubscriptionButton from "../components/CreateSubscriptionButton";
import FilterButton from "../components/FilterButton";
import LogoutButton from "../components/LogoutButton";
import SubscriptionCard from "../components/SubscriptionCard";
import { getSubscriptions } from "../api/subscriptions";
import { useEffect, useState } from "react";
import type {
	SubscriptionCategoryResponse,
	SubscriptionResponse,
} from "../api/types";
import CreateSubscriptionModal from "../components/CreateSubscriptionModal";
import CreateSubscriptionForm from "../components/CreateSubscriptionForm";
import { getSubscriptionCategories } from "../api/subscription-categories";
import CreateCategoryForm from "../components/CreateCategoryForm";
import SubscriptionDetailsModal from "../components/SubscriptionDetailsModal";
import DetailedSubscriptionView from "../components/DetailedSubscriptionView";

export default function Dashboard() {
	const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>(
		[],
	);
	const [categories, setCategories] = useState<SubscriptionCategoryResponse[]>(
		[],
	);
	const [subModalView, setSubModalView] = useState<
		"subscription" | "category" | null
	>(null);

	const [selectedSubscription, setSelectedSubscription] =
		useState<SubscriptionResponse | null>(null);

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

	useEffect(() => {
		async function loadCategories() {
			const data = await getSubscriptionCategories();
			setCategories(data);
		}
		loadCategories();
	}, []);

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
				<CreateSubscriptionButton
					onClick={() => setSubModalView("subscription")}
				/>
				{subModalView && (
					<CreateSubscriptionModal onClose={() => setSubModalView(null)}>
						{subModalView === "subscription" && (
							<CreateSubscriptionForm
								categories={categories}
								onSuccess={(newSubscription) => {
									setSubscriptions((prev) => [...prev, newSubscription]);
									setSubModalView(null);
								}}
								onRequestNewCategory={() => setSubModalView("category")}
							/>
						)}
						{subModalView === "category" && (
							<CreateCategoryForm
								onBack={() => setSubModalView("subscription")}
								onSuccess={(newCategory) => {
									setCategories((prev) => [...prev, newCategory]);
									setSubModalView("subscription");
								}}
							></CreateCategoryForm>
						)}
					</CreateSubscriptionModal>
				)}
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
					onClick={() => setSelectedSubscription(subscription)}
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
			{selectedSubscription && (
				<SubscriptionDetailsModal onClose={() => setSelectedSubscription(null)}>
					<DetailedSubscriptionView
						id={selectedSubscription.id}
						title={selectedSubscription.title}
						description={selectedSubscription.description}
						price={selectedSubscription.price}
						billingInterval={selectedSubscription.billingInterval}
						nextBillingDate={selectedSubscription.nextBillingDate}
						subscriptionCategoryResponse={
							selectedSubscription.subscriptionCategoryResponse
						}
					/>
				</SubscriptionDetailsModal>
			)}
		</section>
	);
}
