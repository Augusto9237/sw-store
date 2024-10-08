"use server";
import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";
import { OrderProduct, Prisma, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";



interface OrderItem {
    id: string;
    productId: string;
    orderId: string;
    basePrice: Prisma.Decimal;
    discountPercentage: number;
    quantity: number;
    product: Product;
}

export const getOrders = async (name?: string) => {
    const orders = await prismaClient.order.findMany({
        where: {
            user: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
        , orderBy: {
            createdAt: 'asc'
        }
    })

    return { orders }
}

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
    cartProducts.map(async (item) => {
        await prismaClient.product.update({
            where: {
                id: item.id
            },
            data: {
                stock: {
                    decrement: item.quantity
                }
            }
        })
    })

    return order;
};

export async function updateOrder(id: string, orderProducts: OrderItem[]) {
    for (const product of orderProducts) {
        await prismaClient.order.update({
            where: {
                id: id
            },
            data: {
                orderProducts: {
                    updateMany: {
                        where: {
                            id: product.id
                        },
                        data: {
                            basePrice: product.basePrice,
                            discountPercentage: product.discountPercentage,
                            productId: product.productId,
                            quantity: product.quantity
                        }
                    }
                }
            }
        });
    }
}

export const deleteOrder = async (id: string) => {
    const product = await prismaClient.orderProduct.findMany({
        where: {
            orderId: id,
        },
        include: {
            product: true,
        },
    })

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

    product.map(async (item) => {
        await prismaClient.product.update({
            where: {
                id: item.productId
            },
            data: {
                stock: {
                    increment: item.quantity
                }
            }
        })
    })


    return revalidatePath('/order');
}