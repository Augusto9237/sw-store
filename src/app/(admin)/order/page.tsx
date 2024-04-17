import TableOrder from "./components/table-order";

export default async function OrdersPage() {

    return (
            <div className='flex flex-col w-full h-full p-5 gap-8 bg-background rounded-lg'>
                <div className="flex w-full justify-between items-center pr-5">
                    <h2 className='text-lg font-bold leading-none'>Pedidos</h2>
                </div>
                <TableOrder/>
            </div>
    )
}
