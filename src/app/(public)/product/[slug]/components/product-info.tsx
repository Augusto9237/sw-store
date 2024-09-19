'use client'
import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import DiscountBadge from "@/components/ui/discount-badge"
import { formatReal } from "@/helpers/formatReal"
import { ProductWithTotalPrice } from "@/helpers/product"
import { CartContext } from "@/providers/cart"
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

interface ProductInfoProps {
    product: ProductWithTotalPrice
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const { addProductToCart } = useContext(CartContext);
    const { toast } = useToast()

    function handleDecreaseQuantityClick() {
        if (quantity > 1) {
            setQuantity((prev) => prev === 1 ? prev : prev - 1)
        }

    }

    function handleIncreaseQuantityClick() {
        if (product.stock - 1 >= quantity) {
            setQuantity((prev) => prev + 1)
        }
    }

    function handleAddToCartClick() {
        addProductToCart({ ...product, quantity })
        toast({
            variant: 'success',
            title: "✅  Produto adicionado ao carrino!",
        })
    }

    return (
        <div className="flex flex-col px-5 lg:p-10 lg:max-w-[472px] lg:bg-accent rounded-[10px]">
            <h2 className="text-lg">{product.name}</h2>

            <div className="flex items-center gap-1">
                <h1 className="text-xl font-bold">{formatReal(Number(product.totalPrice))}</h1>
                {product.discountPercentage > 0 && (
                    <DiscountBadge>
                        {product.discountPercentage}
                    </DiscountBadge>
                )}
            </div>
            {product.discountPercentage > 0 && (
                <p className="opacity-75 text-sm line-through">
                    {formatReal(Number(product.basePrice))}
                </p>
            )}

            <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button size="icon" variant='outline' onClick={handleDecreaseQuantityClick}>
                        <ArrowLeftIcon size={16} />
                    </Button>

                    <span>{quantity}</span>

                    <Button size="icon" variant='outline' disabled={product.stock < 1} onClick={handleIncreaseQuantityClick}>
                        <ArrowRightIcon size={16} />
                    </Button>
                </div>
                <p>{product.stock} {`Disponív${product.stock > 1 ? 'eis' : 'el'}`}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
                <h3 className="font-bold">Descrição</h3>
                <p className="text-sm opacity-60 text-justify">{product.description}</p>
            </div>

            {product.stock < 1 && (
                <span className="text-primary font-bold bg-primary/5 p-2 text-center mt-8 rounded-md">Produto esgotado</span>
            )}

            {product.stock > 0 && (
                <Button onClick={handleAddToCartClick} className="mt-8 uppercase font-bold">Adicionar ao carrinho</Button>
            )}

            <div className="bg-accent md:bg-accent-foreground/5 flex item px-5 py-5 mt-5 rounded-lg justify-between">
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
