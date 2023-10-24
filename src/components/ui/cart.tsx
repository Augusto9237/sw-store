'use client'
import { useContext } from 'react'
import { Badge } from './badge'
import { ShoppingCartIcon } from 'lucide-react'
import { CartContext } from '@/providers/cart'
import CartItem from './cart-item'
import { computeProductTotalPrice } from '@/helpers/product'
import { Separator } from './separator'
import { ScrollArea } from './scroll-area'
import { Button } from './button'
import { createCheckout } from '@/actions/checkout'
import { loadStripe } from '@stripe/stripe-js'
import { createOrder } from '@/actions/order'
import { useSession } from 'next-auth/react'

export default function Cart() {
    const { products, subtotal, total, totalDiscount } = useContext(CartContext)
    const { data } = useSession();

    async function handleFinishPurchaseClick() {
        if (!data?.user) return;
        
        await createOrder(products, (data.user as any).id)
        const checkout = await createCheckout(products);

        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
        )
        stripe?.redirectToCheckout({
            sessionId: checkout.id,
        })
    }

    return (
        <div className='flex flex-col gap-5 h-full'>
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                variant='outline'
            >
                <ShoppingCartIcon size={16} />
                Carrinho
            </Badge>

            <div className="flex flex-col gap-5 h-full max-h-full overflow-hidden">
                {products.length > 0 ? (
                    <ScrollArea className='h-full'>
                        <div className='flex flex-col gap-5'>
                            {products.map(product => (
                                <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any} />
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <p className='text-center font-semibold'>Você ainda não possui nenhum produto no carrinho</p>
                )}
            </div>

            {products.length > 0 && (
                <div className="flex flex-col gap-3">
                    <Separator />
                    <div className='flex items-center justify-between text-xs'>
                        <p>Subtotal</p>
                        <p>R$ {subtotal.toFixed(2)}</p>
                    </div>

                    <Separator />
                    <div className='flex items-center justify-between text-xs'>
                        <p>Entrega</p>
                        <p>GRÁTIS</p>
                    </div>

                    <Separator />
                    <div className='flex items-center justify-between text-xs'>
                        <p>Descontos</p>
                        <p>- R$ {totalDiscount.toFixed(2)}</p>
                    </div>

                    <Separator />
                    <div className='flex items-center justify-between text-sm font-bold'>
                        <p>Total</p>
                        <p>R$ {total.toFixed(2)}</p>
                    </div>
                    <Button onClick={handleFinishPurchaseClick} className='uppercase font-bold mt-7'>
                        Finalizar compra
                    </Button>
                </div>
            )}
        </div>
    )
}
