"use client"
import { Card } from "@/components/ui/card";
import { AdminContext } from "@/providers/admin";
import { Users } from "lucide-react";
import { useContext } from "react";

export default function CardTotalUsers() {
    const { users } = useContext(AdminContext)
    return (
        <Card className="flex flex-col h-32 p-5 gap-2">
            <span className='opacity-75 max-md:text-sm'>Total de usuários</span>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl max-md:text-2xl max-sm:text-base font-bold'>{users.length}</h1>
                <Users size={46} className='max-sm:hidden' />
            </div>
        </Card>
    )
}
