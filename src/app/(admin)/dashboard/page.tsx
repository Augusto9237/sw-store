import { Card, CardContent } from '@/components/ui/card'
import TableOrder from './components/table-order'
import TopProductItem from './components/top-product-item'
import CardTotalOrders from './components/card-total-orders'
import CardInvoicingTotal from './components/card-invoicing-total'
import CardTotalUsers from './components/card-total-users'
import { getProducts } from '@/actions/products'
import CardTotalSalesDay from './components/card-totalsales-day'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { ChartSales } from './components/chart-sales'

export default async function DashboardPage() {

  const { products } = await getProducts('', 8);

  return (
    <div className='flex  w-full h-full flex-col'>
      <section className='grid grid-cols-2 sm:grid-cols-4 gap-8 max-lg:gap-4 max-md:gap-2 w-full mb-8 max-sm:mb-4'>
        <CardTotalSalesDay />
        <CardTotalOrders />
        <CardInvoicingTotal />
        <CardTotalUsers />
      </section>

      <section className='flex max-lg:flex-col h-full gap-8 max-lg:gap-4 w-full'>
        <ChartSales />

        <Card className='flex w-full max-sm:mb-4 flex-col p-5 bg-background rounded-lg'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold'>Ultimos Pedidos</h2>

            <Link href="/order" className='flex gap-1 items-center'>
              <span className='font-semibold leading-snug'>
                Ver todos
              </span>
              <ChevronRight />
            </Link>
          </div>
          <TableOrder />
        </Card>
      </section>
    </div>
  )
}
