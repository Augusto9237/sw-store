import { CustomersTable } from "./components/customers-table";
import SearchInput from "@/components/search-input";
import { Card } from "@/components/ui/card";

export default async function CustomersPage() {
  
  return (
    <Card className='p-5 w-full h-full overflow-hidden min-h-full'>
      <div className="flex justify-between gap-4">
        <SearchInput />
      </div>
      <CustomersTable />
    </Card>
  )
}
