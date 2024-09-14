'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CartContext } from "@/providers/cart"
import { AlertCircle, BadgeAlert, BadgeCheck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext } from "react"

interface SucccessProps {
    params: {
        status: string
    }
}
export default function Success({ params: { status } }: SucccessProps) {
    const { setProducts } = useContext(CartContext);
    const router = useRouter();

    async function handleOk() {
        setProducts([])
        localStorage.removeItem("@fsw-store/cart-products")
        router.push('/')
    }

    if (status !== 'true') {
        return (
            <div className="flex-1 flex justify-center items-center absolute inset-0 backdrop-blur-md bg-card/70 z-50 h-full">
                <Card className="max-w-sm p-5 text-red-600 items-center flex flex-col">
                    <AlertCircle size={50} />
                    <h1>
                        Pagamento não realizado!
                    </h1>
                    <Button variant="destructive" onClick={() => router.push('/')} className="mt-7 font-bold uppercase w-full">
                        Tentar novamente
                    </Button>
                </Card>
            </div>
        )
    } else {
        return (
            <div className="flex-1 flex justify-center items-center absolute inset-0 backdrop-blur-md bg-card/70 z-50 h-full">
                <Card className="max-w-sm p-5 text-green-600 items-center flex flex-col">
                    <CheckCircle size={50} />
                    <h1>
                        Pagamento realizado com sucesso!
                    </h1>
                    <Button onClick={handleOk} className="mt-7 font-bold uppercase w-full bg-green-600 hover:bg-green-700">
                        OK
                    </Button>
                </Card>
            </div>
        )
    }
}