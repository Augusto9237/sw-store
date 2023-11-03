import { Card, CardContent } from '@/components/ui/card'
import CardInfo from './components/card-info'
import { prismaClient } from '@/lib/prisma'
import TableOrder from './components/table-order'
import TopProductItem from './components/top-product-item'

export default async function DashboardPage() {

  const orders = await prismaClient.order.findMany({
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })

  const topProducts = await prismaClient.product.findMany({
    take: 8
  })


  return (
    <div className='flex flex-1 flex-col h-full gap-8'>
      <div className='grid grid-cols-4 gap-8 w-full'>
        <CardInfo ordersCount={orders.length}/>
        <CardInfo ordersCount={orders.length} />
        <CardInfo ordersCount={orders.length} />
        <CardInfo ordersCount={orders.length} />
      </div>

      <div className='flex h-full gap-8'>
        <Card className='p-5  max-w-[355px] w-full h-full overflow-hidden'>
          <h2 className='text-lg font-bold'>Top Produtos</h2>

          <CardContent className='w-full p-0 gap-4 flex flex-col mt-8'>
            {topProducts.map(product => (
              <TopProductItem key={product.id} product={product}/>
            ))}
          </CardContent>
        </Card>

        <div className='flex flex-1 flex-col p-5 bg-background rounded-lg'>
          <h2 className='text-lg font-bold pl-4'>Ultimos Pedidos</h2>
          <TableOrder orders={orders} />
        </div>
      </div>
    </div>
  )
}
