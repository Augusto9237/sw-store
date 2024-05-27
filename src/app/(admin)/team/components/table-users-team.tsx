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
                    <TableHead>Ações</TableHead>
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
                        <TableCell className="flex items-center gap-2">
                            <Button variant='save' size='icon' className="h-8 w-8">
                                <Pencil size={16} />
                            </Button>
                            <Button variant='outline' size='icon' className="h-9 w-9">
                                <Trash2 size={16} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}