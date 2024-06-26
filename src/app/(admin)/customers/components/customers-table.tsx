'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatReal } from "@/helpers/formatReal";
import { TotalSumOrders } from "@/helpers/order";
import { AdminContext } from "@/providers/admin";
import { format } from "date-fns";
import { useContext } from "react";


export function CustomersTable() {
    const { orders, customers } = useContext(AdminContext)

    return (
        <Table>
            <TableHeader>
                <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                    <TableHead>Nome</TableHead>
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
                        <TableRow key={customer.id} className='border-b-[1px] max-md:text-sm'>
                            <TableCell className="flex text-nowrap truncate min-w-fit overflow-hidden">{customer?.name}</TableCell>
                            <TableCell className="flex text-nowrap truncate min-w-fit overflow-hidden">{customer?.email}</TableCell>
                            <TableCell className="flex text-nowrap truncate min-w-fit overflow-hidden">{format(new Date(ordersFiltered[0].createdAt), 'dd/MM/yyyy')}</TableCell>
                            <TableCell className="flex text-nowrap truncate min-w-fit overflow-hidden">{formatReal(Number(total))}</TableCell>
                        </TableRow>
                    )
                }
                )}
            </TableBody>
        </Table>
    )
}