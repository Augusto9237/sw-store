
import { Card } from "@/components/ui/card";
import TableOrder from "./components/table-order";
import SearchInput from "@/components/search-input";

export default async function OrdersPage() {

    return (
        <Card className='p-5 w-full h-full overflow-hidden min-h-full'>
            <div className="flex justify-between gap-4">
                <SearchInput />
            </div>
            <TableOrder />
        </Card>
    )
}
