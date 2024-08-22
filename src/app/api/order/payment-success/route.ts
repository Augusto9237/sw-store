import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
});

export const  POST = async (req: NextRequest, res: NextResponse) => {
    const signature = req.headers.get("stripe-signature");

    console.log("assinatura: ",signature);

    if (!signature) {
        return NextResponse.error();
    }

    const text = await req.text();

    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET_KEY,
    );


    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;

        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ["line_items"],
            },
        );
        const lineItems = sessionWithLineItems.line_items;

        console.log(lineItems);
        
        await prismaClient.order.update({
            where: {
                id: session.metadata.orderId,
            },
            data: {
                status: "PAYMENT_CONFIRMED",
            },
        });
    }

    return NextResponse.json({ received: true });
};
