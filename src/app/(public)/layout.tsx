import type { Metadata } from 'next'
import { Maven_Pro } from 'next/font/google'
import '../globals.css'
import Header from '@/components/ui/header'
import { AuthProvider } from '@/providers/auth'
import Footer from '@/components/ui/footer'
import CartProvider from '@/providers/cart'

import { Toaster } from "@/components/ui/toaster"
import { Suspense } from 'react'
import Spinner from '@/components/spinner'

const inter = Maven_Pro({
  weight: ['400', '600', '900'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Autotech',
  description: 'Som e eletrônicos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className='flex h-full flex-col'>
          <AuthProvider>
            <CartProvider>
              <Header />
              <Suspense fallback={<Loading />}>
                <div className='flex-1 pt-[6.46rem]'>
                {children}
                </div>
              </Suspense>
              <Footer />
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}

function Loading() {
  return <div className="flex flex-1 h-full justify-center items-center">
    <Spinner />
  </div>;
}
