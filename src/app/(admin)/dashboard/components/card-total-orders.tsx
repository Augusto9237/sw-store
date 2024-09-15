"use client"

import { Card } from "@/components/ui/card";
import { AdminContext } from "@/providers/admin";
import { PackageSearch } from "lucide-react";
import { useContext } from "react";


export default function CardTotalOrders() {
    const { orders } = useContext(AdminContext)
    return (
        <Card className="flex flex-col justify-between p-5 max-sm:p-2 gap-2 h-32 max-sm:h-24">
            <div className='flex justify-between items-center'>
                <span className='opacity-75 max-md:text-sm'>Pedidos</span>
                <PackageSearch />
            </div>
            <h1 className='text-4xl max-md:text-2xl max-sm:text-base font-bold'>{orders.length}</h1>
        </Card>
    )
}
