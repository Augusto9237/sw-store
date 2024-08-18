"use client";

import { toast } from "@/components/ui/use-toast";
import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
    quantity: number;
}

interface ICartContext {
    products: CartProduct[];
    cartTotalPrice: number;
    cartBasePrice: number;
    cartTotalDiscount: number;
    total: number;
    subtotal: number;
    totalDiscount: number;
    addProductToCart: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cartTotalDiscount: 0,
    total: 0,
    subtotal: 0,
    totalDiscount: 0,
    addProductToCart: () => { },
    decreaseProductQuantity: () => { },
    increaseProductQuantity: () => { },
    removeProductFromCart: () => { },
});

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState<CartProduct[]>([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("@fsw-store/cart-products") || '[]')
        if (storedProducts) {
            setProducts(storedProducts);
            setIsLoading(true)
        }
    }, []);


    useEffect(() => {
        if (isLoading) {
            localStorage.setItem("@fsw-store/cart-products", JSON.stringify(products));
        }
    }, [products, isLoading]);

    // Total sem descontos
    const subtotal = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + Number(product.basePrice) * product.quantity;
        }, 0);
    }, [products]);

    // Total com descontos
    const total = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + product.totalPrice * product.quantity;
        }, 0);
    }, [products]);

    const totalDiscount = subtotal - total;

    const addProductToCart = (product: CartProduct) => {
        // se o produto já estiver no carrinho, apenas aumente a sua quantidade
        const productIsAlreadyOnCart = products.some(
            (cartProduct) => cartProduct.id === product.id,
        );

        if (productIsAlreadyOnCart) {
            setProducts((prev) =>
                prev.map((cartProduct) => {
                    if (cartProduct.id === product.id) {
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity + product.quantity,
                        };
                    }

                    return cartProduct;
                }),
            );

            localStorage.setItem("@fsw-store/cart-products", JSON.stringify(
                (prev: CartProduct[]) =>
                    prev.map((cartProduct) => {
                        if (cartProduct.id === product.id) {
                            return {
                                ...cartProduct,
                                quantity: cartProduct.quantity + product.quantity,
                            };
                        }

                        return cartProduct;
                    }),
            ));
            return;
        }

        // se não, adicione o produto à lista
        setProducts((prev) => [...prev, product]);
        return;
    };

    const decreaseProductQuantity = (productId: string) => {
        setProducts((prev) =>
            prev
                .map((cartProduct) => {
                    if (cartProduct.id === productId) {
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity - 1,
                        };
                    }

                    return cartProduct;
                })
                .filter((cartProduct) => cartProduct.quantity > 0),
        );
    };

    const increaseProductQuantity = (productId: string) => {
        setProducts((prev) =>
            prev.map((cartProduct) => {
                if (cartProduct.id === productId) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1,
                    };
                }

                return cartProduct;
            }),
        );
    };

    const removeProductFromCart = (productId: string) => {
        setProducts((prev) =>
            prev.filter((cartProduct) => cartProduct.id !== productId),
        );
        toast({
            variant: "cancel",
            title: "🗑️ Produto removido do carrino!",
        })
    };

    return (
        <CartContext.Provider
            value={{
                products,
                addProductToCart,
                decreaseProductQuantity,
                increaseProductQuantity,
                removeProductFromCart,
                total,
                subtotal,
                totalDiscount,
                cartTotalPrice: 0,
                cartBasePrice: 0,
                cartTotalDiscount: 0,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;