// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';

import { redirect } from 'next/navigation'

export async function GET(request: Request) {
    redirect('https://nextjs.org/')
}