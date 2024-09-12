import { NextRequest, NextResponse } from "next/server";
// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const items = data.products.map((product: any) => {
            // Convertendo o basePrice para número
            const basePrice = parseFloat(product.basePrice);
            // Calculando o valor do desconto
            const discountValue = (product.discountPercentage / 100) * basePrice;
            // Calculando o preço unitário com desconto
            const unitPrice = basePrice - discountValue;

            return {
                id: product.id,
                title: product.name,
                quantity: product.quantity,
                unit_price: Number(unitPrice.toFixed(2)),  // Garantindo que o preço tenha 2 casas decimais
                currency_id: "BRL"
            }
        });

        const body = {
            items: items,
            external_reference: data.id,
            back_urls: {
                success: `${process.env.HOST_URL}/api/payment/?success=true`,
                failure: `${process.env.HOST_URL}/api/payment/?canceled=true`,
                pending: `${process.env.HOST_URL}/?pending=true`
            },
            auto_return: "approved"
        }

        const preference = new Preference(client);
        const result = await preference.create({ body });
      
        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
    }
}