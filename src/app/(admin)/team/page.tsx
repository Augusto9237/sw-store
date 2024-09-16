import { Card } from "@/components/ui/card";
import ModalAddUserTeam from "./components/modal-add-user-team";
import { TableUsersTeam } from "./components/table-users-team";
import SearchInput from "@/components/search-input";

export default async function Team() {
    return (
        <Card className='p-5 w-full h-full overflow-hidden min-h-full space-y-5'>
            <div className="flex justify-between gap-4">
                <SearchInput />
                <ModalAddUserTeam />
            </div>
            <TableUsersTeam />
        </Card>
    )
}
