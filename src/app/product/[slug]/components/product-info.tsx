'use client'
import { Button } from "@/components/ui/button"
import DiscountBadge from "@/components/ui/discount-badge"
import { ProductWithTotalPrice } from "@/helpers/product"
import { CartContext } from "@/providers/cart"
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react"
import { useContext, useState } from "react"

interface ProductInfoProps {
    product: ProductWithTotalPrice
}

export default function ProductInfo({ product}: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const {addProductToCart} = useContext(CartContext)

    function handleDecreaseQuantityClick() {
        setQuantity((prev) => prev === 1 ? prev : prev - 1)
    }

    function handleIncreaseQuantityClick() {
        setQuantity((prev) =>  prev + 1)
    }

    function handleAddToCartClick() {
        addProductToCart({...product, quantity})
    } 

    return (
        <div className="flex flex-col px-5">
            <h2 className="text-lg">{product.name}</h2>

            <div className="flex items-center gap-1">
                <h1 className="text-xl font-bold">R$ {product.totalPrice.toFixed(2)}</h1>
                {product.discountPercentage > 0 && (
                    <DiscountBadge>
                        {product.discountPercentage}
                    </DiscountBadge>
                )}
            </div>
            {product.discountPercentage > 0 && (
                <p className="opacity-75 text-sm line-through">
                    R$ {Number(product.basePrice).toFixed(2)}
                </p>
            )}

            <div className="mt-4 flex items-center gap-2">
                <Button size="icon" variant='outline' onClick={handleDecreaseQuantityClick}>
                    <ArrowLeftIcon size={16} />
                </Button>

                <span>{quantity}</span>

                <Button size="icon" variant='outline' onClick={handleIncreaseQuantityClick}>
                    <ArrowRightIcon size={16} />
                </Button>
            </div>
            
            <div className="mt-8 flex flex-col gap-3">
                <h3 className="font-bold">Descrição</h3>
                <p className="text-sm opacity-60 text-justify">{product.description}</p>
            </div>

            <Button onClick={handleAddToCartClick} className="mt-8 uppercase font-bold">Adicionar ao carrinho</Button>

            <div className="bg-accent flex item px-5 py-5 mt-5 rounded-lg justify-between">
                <div className="flex items-center gap-2">
                    <TruckIcon />
                    <div>
                        <p className="text-xs">Entrega via correios</p>
                        <p className="text-primary text-xs">Envio para todo o Brasil</p>
                    </div>
                </div>

                <p className="text-xs font-bold">Frete gratis</p>
            </div>
        </div>
    )
}
