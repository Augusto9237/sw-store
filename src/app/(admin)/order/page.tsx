
import TableOrder from "./components/table-order";
import SearchInput from "@/components/search-input";

export default async function OrdersPage() {

    return (
            <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
            <div className="flex justify-between gap-4">
                <SearchInput />
            </div>
                <TableOrder/>
            </div>
    )
}
