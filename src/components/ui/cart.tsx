'use client'
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { CartContext, CartProduct } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createOrder } from "@/actions/order";
import { useSession } from "next-auth/react";
import { formatReal } from "@/helpers/formatReal";
import LoginCustomer from "../login-customer";
import { Payment } from "@/actions/payment";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { getProduct } from "@/actions/products";
import { toast } from "./use-toast";
import Spinner from "../spinner";


export default function Cart() {
    const { data, status } = useSession();
    const { products, setProducts, subtotal, total, totalDiscount, removeProductFromCart } = useContext(CartContext);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false)
    const router = useRouter();

    async function handleFinishPurchaseClick() {
        if (data?.user) {

            const checkStock = await Promise.all(
                products.map(async product => {
                    const { product: data } = await getProduct(product.id);

                    if (!data) {
                        toast({ title: `Erro ao buscar o produto ${product.name}`, variant: "destructive" });
                        return null;
                    }

                    if (data.stock === 0) {
                        removeProductFromCart(product.id);
                        toast({ title: `O produto ${product.name} está esgotado`, variant: "destructive" });
                        return null;
                    }

                    if (data.stock < product.quantity) {
                        toast({ title: `Quantidade insuficiente do produto ${product.name}, sua quantidade foi alterada no pedido`, variant: "default" });
                        return { ...product, quantity: data.stock };
                    }

                    return product;
                })
            );

            const finalProducts = checkStock.filter((product): product is CartProduct => product !== null);

            if (!finalProducts.length) return;

            setProducts(finalProducts);
            setIsLoadingPayment(true);
            const order = await createOrder(finalProducts, data?.user.id!);
            const dataresponse = await Payment(finalProducts, order.id);

            router.push(dataresponse.init_point)
        }
    };

    return (
        <div className="flex h-full flex-col gap-8">
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                variant="outline"
            >
                <ShoppingCartIcon size={16} />
                Carrinho
            </Badge>

            <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="flex h-full flex-col gap-8">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <CartItem
                                    key={product.id}
                                    product={computeProductTotalPrice(product as Product) as any}
                                />
                            ))
                        ) : (
                            <p className="text-center font-semibold">
                                Carrinho vazio. Vamos fazer compras?
                            </p>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {products.length > 0 && (
                <div className="flex flex-col gap-3">
                    <Separator />

                    <div className="flex items-center justify-between text-xs">
                        <p>Subtotal</p>
                        <p>{formatReal(subtotal)}</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-xs">
                        <p>Entrega</p>
                        <p>GRÁTIS</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-xs">
                        <p>Descontos</p>
                        <p>- {formatReal(totalDiscount)}</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-sm font-bold">
                        <p>Total</p>
                        <p>{formatReal(total)}</p>
                    </div>
                    {status === 'unauthenticated' ?
                        <LoginCustomer justify="justify-center text-center" />
                        :
                        <Button
                            className="mt-7 font-bold uppercase"
                            onClick={handleFinishPurchaseClick}
                            disabled={isLoadingPayment}
                            variant={isLoadingPayment === true ? "secondary" : "default"}
                        >
                            {isLoadingPayment === true ? <Spinner /> : "Finalizar compra"}
                        </Button>
                    }
                </div>
            )}
        </div>
    );
};
