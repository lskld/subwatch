type SubscriptionCardProps = {
	name: string;
	billingInterval: string;
	billingDate: string;
	price: number;
};

export default function SubscriptionCard({
	name,
	billingInterval,
	billingDate,
	price,
}: SubscriptionCardProps) {
	return (
		<button className="flex mb-2 text-xs md:text-base hover:opacity-75 cursor-pointer">
			<div className="flex items-center justify-center w-1/4 h-8 xl:h-12 bg-primary-blue">
				<p>{name}</p>
			</div>
			<div className="flex items-center justify-center w-1/4 h-8 xl:h-12 bg-primary-yellow">
				<p>{billingInterval}</p>
			</div>
			<div className="flex items-center justify-center w-1/4 h-8 xl:h-12 bg-primary-red">
				<p>{billingDate.toString()}</p>
			</div>
			<div className="flex items-center justify-center w-1/4 h-8 xl:h-12 bg-primary">
				<p>{price}</p>
			</div>
		</button>
	);
}