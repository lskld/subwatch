import { IconTrash } from "@tabler/icons-react"
import type { SubscriptionResponse } from "../api/types" 

export default function DetailedSubscriptionView({ id, title, description, price, billingInterval, nextBillingDate, subscriptionCategoryResponse }: SubscriptionResponse) {
    return (
        <div className="flex flex-col justify-center gap-5">
            <h1>{title}</h1>
            <div>
            <p>Category: {subscriptionCategoryResponse.title}</p>
            <p>Description: {description ? description : "No description"}</p>
            <p>Price: {price}</p>
            <p>Billing interval: {billingInterval}</p>
                <p>Next billing date: {nextBillingDate.split("T")[0]}</p>
                </div>
            <button
                className="flex items-center justify-center bg-warning w-25 h-8 cursor-pointer hover:opacity-75"
                type="button">
                Delete <IconTrash />
            </button>
        </div>
    )
}