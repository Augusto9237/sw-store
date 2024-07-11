import { Users } from "lucide-react";
import { CustomersTable } from "./components/customers-table";
import { Badge } from "@/components/ui/badge";

export default async function CustomersPage() {
  
  return (
    <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
      <Badge
        className="w-fit gap-2 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant='outline'
      >
        <Users size={16} />
        Clientes
      </Badge>
      <CustomersTable />
    </div>
  )
}
