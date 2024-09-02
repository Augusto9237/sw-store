
export default async function Page() {
    const payment = await fetch(`${process.env.HOST_URL}/api/order/payment-success`, { method: 'POST' })
    const posts = await payment.json()
    console.log(posts)
    return (
        <ul>
        
                <p>
                    pagamento recebido
                </p>
            
        </ul>
    )
}