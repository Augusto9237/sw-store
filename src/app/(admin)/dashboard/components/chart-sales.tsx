"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useContext } from "react"
import { AdminContext } from "@/providers/admin"
import { computeProductTotalPrice } from "@/helpers/product"
import { TotalSumOrders } from "@/helpers/order"
import { Prisma } from "@prisma/client"


export const description = "A bar chart with a label"


const chartConfig = {
    desktop: {
        label: `R$`,
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig


interface GroupedOrders {
    date: string;
    orders: Prisma.OrderGetPayload<{
        include: {
            orderProducts: {
                include: {
                    product: true;
                }
            }
        }
    }>[];
}


export function ChartSales() {
    const { customers, orders } = useContext(AdminContext);

    const filterAndGroupOrdersByDay = (orders: GroupedOrders['orders']): GroupedOrders[] => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Filtrar apenas as ordens do mês atual
        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
        });

        // Agrupar as ordens por dia
        const groupedOrdersMap: Record<string, GroupedOrders['orders']> = filteredOrders.reduce((acc, order) => {
            const orderDate = new Date(order.createdAt);
            const dateKey = orderDate.toISOString().split('T')[0]; // YYYY-MM-DD

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(order);
            return acc;
        }, {} as Record<string, GroupedOrders['orders']>);

        // Converter o objeto agrupado em um array de objetos { date: string, orders: Order[] }
        const groupedOrdersArray: GroupedOrders[] = Object.entries(groupedOrdersMap).map(([date, orders]) => ({
            date,
            orders,
        }));

        return groupedOrdersArray;
    };

    const groupedOrders = filterAndGroupOrdersByDay(orders);

    const chartData = groupedOrders.map((item) => {
        const day = item.date.split('-')[2];

        return (
            { month: day, desktop:  TotalSumOrders(item.orders) }
        )
    })


    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Vendas</CardTitle>
                <CardDescription>Setembro</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Todas as vendas aprovadas referente ao mês atual
                </div>
            </CardFooter>
        </Card>
    )
}