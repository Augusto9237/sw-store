import { Users } from "lucide-react";
import { CustomersTable } from "./components/customers-table";
import { Badge } from "@/components/ui/badge";
import SearchInput from "@/components/search-input";

export default async function CustomersPage() {
  
  return (
    <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
      <div className="flex justify-between gap-4">
        <SearchInput />
      </div>
      <CustomersTable />
    </div>
  )
}
