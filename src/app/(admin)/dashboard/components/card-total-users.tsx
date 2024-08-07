"use client"
import { Card } from "@/components/ui/card";
import { AdminContext } from "@/providers/admin";
import { Users } from "lucide-react";
import { useContext } from "react";

export default function CardTotalUsers() {
    const { customers } = useContext(AdminContext)

    return (
        <Card className="flex flex-col justify-between p-5 max-sm:p-2 gap-2 h-32 max-sm:h-24">
            <div className='flex justify-between items-center max-md:text-sm'>
                <span className='opacity-75 max-md:text-sm'>Clientes</span>
                <Users />
            </div>
            <h1 className='text-4xl max-md:text-2xl max-sm:text-base font-bold'>{customers.length}</h1>
        </Card>
    )
}
