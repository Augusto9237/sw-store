export const config = {
    stripe: {
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABE_KEY,
        secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
        proPriceId: '' ,
        webhookSecret: '' 
    }
}