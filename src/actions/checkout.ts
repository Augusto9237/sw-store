"use server";

import { CartProduct } from "@/providers/cart";
import Stripe from "stripe";

export const createCheckout = async (
    products: CartProduct[],
    orderId: string,
) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-06-20',
    });



    const checkout = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.HOST_URL}/success`,
        cancel_url: `${process.env.HOST_URL}/?canceled=true`,
        metadata: {
            orderId,
        },
        line_items: products.map((product) => {
            return {
                price_data: {
                    currency: "brl",
                    product_data: {
                        name: product.name,
                        description: product.description,
                        images: product.imageUrls.slice(0, 1),
                    },
                    unit_amount: product.totalPrice * 100,
                },
                quantity: product.quantity,
            };
        }),
    });
    return checkout;
};