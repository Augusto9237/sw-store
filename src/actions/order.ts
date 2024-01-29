"use server";
import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";
import { revalidatePath } from "next/cache";

export const createOrder = async (
    cartProducts: CartProduct[],
    userId: string,
) => {
    const order = await prismaClient.order.create({
        data: {
            userId,
            status: "WAITING_FOR_PAYMENT",
            orderProducts: {
                createMany: {
                    data: cartProducts.map((product) => ({
                        basePrice: product.basePrice,
                        discountPercentage: product.discountPercentage,
                        productId: product.id,
                        quantity: product.quantity,
                    })),
                },
            },
        },
    });

    return order;
};

export const updateOrder = async (cartProducts: CartProduct[],
    id: string,) => {
    await prismaClient.orderProduct.updateMany({
        where: {
            orderId: id
        },
        data:
            cartProducts.map((product) => ({
                basePrice: product.basePrice,
                discountPercentage: product.discountPercentage,
                productId: product.id,
                quantity: product.quantity,
            }))
    })
}

export const deleteOrder = async (id: string) => {
    await prismaClient.orderProduct.deleteMany({
        where: {
            orderId: id,
        },
    });

    await prismaClient.order.delete({
        where: {
            id: id,
        },
        include: {
            orderProducts: true,
        },
    });

    return revalidatePath('/order');
}