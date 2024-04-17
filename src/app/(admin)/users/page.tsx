import { prismaClient } from "@/lib/prisma";
import TableOrder from "../dashboard/components/table-order";
import { TableUsers } from "./components/table-users";


export default async function UsersPage() {
  
  return (
    <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
      <div className="flex w-full justify-between items-center pr-5">
        <h2 className='text-lg font-bold leading-none'>Clientes</h2>
      </div>
      <TableUsers />
    </div>
  )
}
