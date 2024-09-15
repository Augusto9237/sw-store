'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatReal } from "@/helpers/formatReal";
import { TotalSumOrders } from "@/helpers/order";
import { AdminContext } from "@/providers/admin";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import { useContext } from "react";


export function CustomersTable() {
    const { orders, customers } = useContext(AdminContext)

    return (
        <Table className="mt-5">
            <TableHeader>
                <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                    <TableHead>Cliente</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Última compra</TableHead>
                    <TableHead>Total de compras</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customers.map((customer) => {
                    const ordersFiltered = orders.filter((order) => order.userId === customer.id);
                    const total = TotalSumOrders(ordersFiltered)

                    return (
                        <TableRow key={customer.id} className='border-b-[1px] border-input max-md:text-sm'>
                            <TableCell className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {customer?.name!.toUpperCase()}
                                    </AvatarFallback>

                                    {customer?.image && <AvatarImage src={customer.image!} />}
                                </Avatar>
                                {customer?.name}
                            </TableCell>
                            <TableCell>{customer?.email}</TableCell>
                            <TableCell>{ordersFiltered.length > 0 ? format(new Date(ordersFiltered[0].createdAt), 'dd/MM/yyyy') : null}</TableCell>
                            <TableCell>{formatReal(Number(total))}</TableCell>
                        </TableRow>
                    )
                }
                )}
            </TableBody>
        </Table>
    )
}