import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeString = new Date(response?.created * 1000).toLocaleTimeString();

  try {
    let event = stripe.webhooks.constructEvent(payload, sig!, process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET_KEY!);
    console.log("event: ",event.type);
  } catch (error) {
    console.log(error);
  }
}