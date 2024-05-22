import { Badge } from "@/components/ui/badge";
import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";

import OrderItem from "./components/order-item";

export const dynamic = "force-dynamic";

export default async function OrderPage() {
    const user = await auth()

    if (!user) {
        return null
    }

    const orders = await prismaClient.order.findMany({
        where: {
            userId: (user as any).id,
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return (
        <div className="p-5 xl:px-0 lg:py-8 max-w-[1248px] w-full mx-auto">
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                variant='outline'
            >
                <PackageSearchIcon size={16} />
                Meus Pedidos
            </Badge>
            <div className="mt-5 flex flex-col gap-5">
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} />
                ))}
            </div>
        </div>
    )
}
