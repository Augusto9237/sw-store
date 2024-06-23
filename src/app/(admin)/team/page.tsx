import ModalAddUserTeam from "./components/modal-add-user-team";
import { TableUsersTeam } from "./components/table-users-team";

export default async function Team() {
    return (
        <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
            <div className="flex w-full justify-between items-center">
                <h2 className='text-lg font-bold leading-none'>Usuários</h2>
                <ModalAddUserTeam/>
            </div>
            <TableUsersTeam />
        </div>
    )
}
