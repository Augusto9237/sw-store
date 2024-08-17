declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
        STRIPE_SECRET_KEY: string;
        NEXT_PUBLIC_STRIPE_SECRET_KEY: string
        NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET_KEY: string;
        AWS_URL: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        HOST_URL: string;
    }
}