import { Card, CardContent } from '@/components/ui/card'
import TableOrder from './components/table-order'
import TopProductItem from './components/top-product-item'
import CardTotalOrders from './components/card-total-orders'
import CardInvoicingTotal from './components/card-invoicing-total'
import CardTotalUsers from './components/card-total-users'
import { getProducts } from '@/actions/products'

export default async function DashboardPage() {

  const { products } = await getProducts('', 8);


  return (
    <div className='flex flex-1 flex-col h-full gap-8'>
      <div className='grid grid-cols-4 gap-8 max-md:gap-4 w-full'>
        <CardTotalOrders />
        <CardInvoicingTotal />
        <CardTotalUsers />
      </div>

      <div className='flex max-md:flex-col  h-full gap-8'>
        <Card className='p-5  md:max-w-[355px] w-full h-full min-h-fit max-md:min-h-[380px] overflow-hidden'>
          <h2 className='text-lg font-bold'>Top Produtos</h2>

          <CardContent className='w-full p-0 gap-4 flex flex-col max-md:grid grid-cols-2  mt-8'>
            {products.map(product => (
              <TopProductItem key={product.id} product={product} />
            ))}
          </CardContent>
        </Card>

        <div className='flex flex-1 flex-col p-5 bg-background rounded-lg'>
          <h2 className='text-lg font-bold'>Ultimos Pedidos</h2>
          <TableOrder />
        </div>
      </div>
    </div>
  )
}
