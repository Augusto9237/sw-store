'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminContext } from "@/providers/admin";
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
                    <TableHead>•••</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {usersTeam.map((user) => (
                    <TableRow key={user.id} className='border-b-[1px] max-md:text-sm'>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.role}</TableCell>
                        <TableCell>{user?.role}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}