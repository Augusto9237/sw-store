import ModalAddUserTeam from "./components/modal-add-user-team";
import { TableUsersTeam } from "./components/table-users-team";
import SearchInput from "@/components/search-input";

export default async function Team() {
    return (
        <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
            <div className="flex justify-between gap-4">
                <SearchInput />
                <ModalAddUserTeam />
            </div>
            <TableUsersTeam />
        </div>
    )
}
