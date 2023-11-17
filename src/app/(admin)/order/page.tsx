import { prismaClient } from "@/lib/prisma"
import TableOrder from "./components/table-order";




async function getData() {
    const orders = await prismaClient.order.findMany({
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    const users = await prismaClient.user.findMany();

    return { orders, users }
}
export default async function OrdersPage() {
    const { orders, users } = await getData()
    return (
            <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
                <div className="flex w-full justify-between items-center pr-5">
                    <h2 className='text-lg font-bold leading-none'>Todos os pedidos</h2>
                </div>
                <TableOrder orders={orders} users={users} />
            </div>
    )
}
