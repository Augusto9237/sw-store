import { Card } from "@/components/ui/card";
import {Users } from "lucide-react";

interface CardTotalUsersProps {
    countUsers: number
}
export default function CardTotalUsers({countUsers}: CardTotalUsersProps) {
    return (
        <Card className="flex flex-col h-32 p-5 gap-2">
            <span className='opacity-75'>Total de usuários</span>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold'>{countUsers}</h1>
                <Users size={46} />
            </div>
        </Card>
    )
}
