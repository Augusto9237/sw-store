import { Prisma } from "@prisma/client";
import { computeProductTotalPrice } from "./product";

interface CardTotalProps {
    orders: Prisma.OrderGetPayload<{
        include: {
            orderProducts: {
                include: {
                    product: true;
                }
            }
        }
    }>[];
}

export function TotalSumOrders(orders: CardTotalProps['orders']) {
    let soma = 0;
    for (const obj of orders) {
        const total = obj.orderProducts.reduce((acc, orderProduct) => {
            const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)
            return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
        }, 0);
        soma += total;
    }
    return soma;
}
