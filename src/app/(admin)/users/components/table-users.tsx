'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminContext } from "@/providers/admin";
import { Prisma } from "@prisma/client";
import { useContext } from "react";


export function TableUsers() {
    const {orders, users } = useContext(AdminContext)

    return (
        <Table>
            <TableHeader>
                <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Ultima compra</TableHead>
                    <TableHead>Total de compras</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id} className='border-b-[1px] max-md:text-sm'>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{orders.length}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}