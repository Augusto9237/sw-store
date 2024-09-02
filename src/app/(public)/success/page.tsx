
export default async function Page() {
    const payment = await fetch(`${process.env.HOST_URL}/api/order/payment-success`, { method: 'POST' })
    const res = await payment.json()
    console.log(res)
    return (
        <ul>
        
                <p>
                    pagamento recebido
                </p>
            
        </ul>
    )
}