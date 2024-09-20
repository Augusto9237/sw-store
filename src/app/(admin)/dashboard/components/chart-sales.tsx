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
import { TotalSumOrders } from "@/helpers/order"
import { Prisma } from "@prisma/client"


const chartConfig = {
    desktop: {
        label: `R$`,
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

interface OrderProps {
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


interface GroupedOrders {
    date: string;
    total: number;
}


export function ChartSales() {
    const { orders } = useContext(AdminContext);

    const filterAndGroupOrdersByDay = (orders: OrderProps['orders']): GroupedOrders[] => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
        });

        const groupedOrdersMap: Record<string, OrderProps['orders']> = filteredOrders.reduce((acc, order) => {
            const orderDate = new Date(order.createdAt);
            const dateKey = orderDate.toISOString().split('T')[0];

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(order);
            return acc;
        }, {} as Record<string, OrderProps['orders']>);

        const groupedOrdersArray: GroupedOrders[] = Object.entries(groupedOrdersMap).map(([date, orders]) => ({
            date,
            total: TotalSumOrders(orders)
        }));

        return groupedOrdersArray;
    };

    const groupedOrders = filterAndGroupOrdersByDay(orders);

    const chartData = groupedOrders.map((item) => {
        const day = item.date.split('-')[2];

        return (
            { month: day, desktop: item.total }
        )
    })


    return (
        <Card className="w-full">
            <CardHeader className="p-5">
                <CardTitle className="text-lg">Perfomance de vendas</CardTitle>
                <CardDescription className="text-base">Setembro</CardDescription>
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
                        <Bar dataKey="desktop"  fill="var(--color-desktop)" radius={8}>
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