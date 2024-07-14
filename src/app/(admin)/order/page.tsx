
import { Badge } from "@/components/ui/badge";
import TableOrder from "./components/table-order";
import { ShoppingCartIcon } from "lucide-react";

export default async function OrdersPage() {

    return (
            <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
            <Badge
                className="w-fit gap-2 border-2 border-primary px-3 py-[0.375rem] text-base max-sm:text-xs uppercase"
                variant='outline'
            >
                <ShoppingCartIcon size={16} />
                Pedidos
            </Badge>
                <TableOrder/>
            </div>
    )
}
