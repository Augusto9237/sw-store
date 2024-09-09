import Link from "next/link"

interface SucccessProps {
    params: {
        status: string
    }
}
export default async function Success({ params: { status } }: SucccessProps) {
    if (status !== 'true') {
        return (
            <div className="flex-1 text-center">
                <h1>
                    Pagamento não aprovado
                </h1>
                <Link href="/" className="text-primary font-semibold">
                    Voltar para home
                </Link>
            </div>
        )
    } else {

        return (
            <div className="flex-1 text-center">
                <h1>
                    Pagamento Realizado com sucesso
                </h1>
                <Link href="/" className="text-primary font-semibold">
                    Voltar para home
                </Link>
            </div>
        )
    }
}