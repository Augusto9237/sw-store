import { Badge } from "@/components/ui/badge";
import ModalAddUserTeam from "./components/modal-add-user-team";
import { TableUsersTeam } from "./components/table-users-team";
import { Users } from "lucide-react";

export default async function Team() {
    return (
        <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
            <div className="flex w-full justify-between items-center">
                <Badge
                    className="w-fit gap-2 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                    variant='outline'
                >
                    <Users size={16} />
                    Usuários
                </Badge>
                <ModalAddUserTeam />
            </div>
            <TableUsersTeam />
        </div>
    )
}
