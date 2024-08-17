'use server'

import { redirect } from 'next/navigation';
import { auth } from '../auth';
import { CartProduct, createCheckoutSession } from '../services/stripe';

export async function createCheckoutSessionAction(orderId: string, products: CartProduct[]) {
  const session = await auth();

  if (!session?.user.id) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  const checkout = await createCheckoutSession(products, orderId)

  if (!checkout.url) {
    return {
      status: 500,
      message: "Error creating checkout session",
    };
  }
  redirect(checkout.url)
}