import { deleteOrder } from "@/actions/order";
import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const reqUrl = new URL(req.url);
    const { searchParams } = req.nextUrl;
    const status = searchParams.get('collection_status');
    const id = searchParams.get('external_reference');
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (canceled === 'true' && (status !== 'approved')) {
        if (id) {
            await deleteOrder(id);
        }
        return NextResponse.redirect(new URL(`${process.env.HOST_URL}/success/false`));
    }

    if (id && status === 'approved') {
        await prismaClient.order.update({
            where: {
                id: id,
            },
            data: {
                status: "PAYMENT_CONFIRMED",
            },
        });
    }
  
    return NextResponse.redirect(new URL(`${process.env.HOST_URL}/success/true`));
};