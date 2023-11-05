import { Card } from "@/components/ui/card";
import { PackageSearch } from "lucide-react";

interface CardTotalOrdersProps {
    countOrders: number
}
export default function CardTotalOrders({countOrders}: CardTotalOrdersProps) {
    return (
        <Card className="flex flex-col h-32 p-5 gap-2">
            <span className='opacity-75'>Total de pedidos</span>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold'>{countOrders}</h1>
                <PackageSearch size={46} />
            </div>
        </Card>
    )
}
