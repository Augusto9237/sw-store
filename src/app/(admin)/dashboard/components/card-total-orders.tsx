"use client"
import { Card } from "@/components/ui/card";
import { AdminContext } from "@/providers/admin";
import { PackageSearch } from "lucide-react";
import { useContext } from "react";


export default function CardTotalOrders() {
    const { orders } = useContext(AdminContext)
    return (
        <Card className="flex flex-col h-32 p-5 gap-2">
            <span className='opacity-75'>Total de pedidos</span>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold'>{orders.length}</h1>
                <PackageSearch size={46} />
            </div>
        </Card>
    )
}
