'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminContext } from "@/providers/admin";
import { Trash2 } from "lucide-react";
import { useContext } from "react";
import ModalEditUserTeam from "./modal-edit-user-team";
import { deleteUserTeam, getUsersTeam } from "@/actions/team";
import { toast } from "@/components/ui/use-toast";


export function TableUsersTeam() {
    const { usersTeam, setUsersTeam } = useContext(AdminContext);

   async function handleDeleteUser(id: string) {
       try {
           await deleteUserTeam(id)
           const { userTeam } = await getUsersTeam()
           setUsersTeam(userTeam)
           
           toast({
               variant: "cancel",
               title: "🗑️ Usuário deletado",
           })
       } catch (error) {
           toast({
               variant: 'cancel',
               title: "⛔  Algo deu errado, tente novamente!",
           })
       }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {usersTeam.map((user) => (
                    <TableRow key={user.id} className='border-b-[1px] max-md:text-sm'>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{
                            user?.role === 'admin' && 'Administrador'
                        }</TableCell>
                        <TableCell className="flex items-center gap-4 justify-center">
                            <ModalEditUserTeam user={user} />

                            <Button variant='outline' className='gap-2' onClick={() => handleDeleteUser(user.id)} >
                                <Trash2 size={16} />
                                <span className="max-sm:hidden">
                                    Excluir
                                </span>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}