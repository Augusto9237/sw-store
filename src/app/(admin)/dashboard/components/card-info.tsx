import { Card } from '@/components/ui/card'
import { PackageSearch } from 'lucide-react'

export default function CardInfo({ordersCount}: any) {
    return (
        <Card className="flex flex-col h-32 p-5 gap-2">
            <span className='opacity-75'>Total de pedidos</span>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold'>{ordersCount}</h1>
                <PackageSearch size={46}/>
            </div>
        </Card>
    )
}
