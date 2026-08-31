import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { PriceHistoryResponse } from "../api/types"

type PriceHistoryChartProps = {
    priceHistories: PriceHistoryResponse[];
}

export default function PriceHistoryChart({ priceHistories }: PriceHistoryChartProps) {
    const chartData = priceHistories.map((ph) => ({
        date: ph.startDate.split("T")[0],
        price: ph.price
    }))

    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#000" />
            </LineChart>
        </ResponsiveContainer>
    )
}