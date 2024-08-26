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
        <Card className='p-5 w-full lg:max-w-sm  h-full min-h-fit'>
          <h2 className='text-lg font-bold'>Top Produtos</h2>
          <div className='w-full  gap-4 grid max-sm:gap-2 max-sm:grid-cols-1max-lg:grid-cols-2 mt-8 max-sm:mt-4 overflow-y-auto'>
            {products.map(product => (
              <TopProductItem key={product.id} product={product} />
            ))}
          </div>
        </Card>

        <div className='flex w-full max-sm:mb-4 flex-col p-5 bg-background rounded-lg'>
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
        </div>
      </section>
    </div>
  )
}
