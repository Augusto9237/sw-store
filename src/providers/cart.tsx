'use client'
import { ReactNode, createContext, useState } from "react";
import { Product } from "@prisma/client";

interface CartProduct extends Product {
    quantity: number;
}

interface ICartContext {
    products: CartProduct[];
    cartTotalPrice: number;
    cartBasePrice: number;
    cartTotalDiscount: number;
    addProductToCart(product: CartProduct): void

}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cartTotalDiscount: 0,
    addProductToCart: () => { },
})

export default function CartProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<CartProduct[]>([])

    function addProductToCart(product: CartProduct) {
        setProducts((prev) => [...prev, product])
    }
    return (
        <CartContext.Provider value={{
            products,
            addProductToCart,
            cartTotalPrice: 0,
            cartBasePrice: 0,
            cartTotalDiscount: 0,
        }}>
            {children}
        </CartContext.Provider>
    )
}
