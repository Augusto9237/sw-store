import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
});


export async function POST(req: NextRequest) {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
        return NextResponse.json({ error: 'Assinatura Stripe ausente' }, { status: 400 });
    }

    const text = await req.text();
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            text,
            signature,
            process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET_KEY,
        );
    } catch (err) {
        console.error('Erro ao validar o webhook:', err);
        return NextResponse.json({ error: 'Erro ao validar o webhook' }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;

        if (!session.metadata.orderId) {
            console.error('orderId não encontrado no metadata da sessão');
            return NextResponse.json({ error: 'orderId não encontrado' }, { status: 400 });
        }

        try {
            const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
                event.data.object.id,
                { expand: ["line_items"] },
            );

            console.log(sessionWithLineItems.line_items);

            await prismaClient.order.update({
                where: { id: session.metadata.orderId },
                data: { status: "PAYMENT_CONFIRMED" },
            });
        } catch (err) {
            console.error('Erro ao processar a sessão do Stripe:', err);
            return NextResponse.json({ error: 'Erro ao processar o pagamento' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
};