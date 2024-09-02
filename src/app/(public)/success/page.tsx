
export default async function Page() {
    const payment = await fetch(`${process.env.HOST_URL}/api/order/payment-success`, { method: 'POST' })
 
    if (payment.status === 400) {
        // Trate o erro adequadamente, por exemplo, lançando uma exceção ou retornando um fallback
        console.error(`Erro na requisição: ${payment.statusText}`);
        return;
    }
    const data = await payment.json()
    console.log(data)
    return (
        <ul>
                <p>
                    pagamento recebido
                </p>
            
        </ul>
    )
}