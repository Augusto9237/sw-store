'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminContext } from "@/providers/admin";
import { Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";


export function TableUsersTeam() {
    const { usersTeam } = useContext(AdminContext);

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
                            <Button variant='save' className='gap-2' >
                                <Pencil size={16} />
                                <span className="max-sm:hidden">
                                    Editar
                                </span>

                            </Button>
                            <Button variant='outline' className='gap-2' >
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