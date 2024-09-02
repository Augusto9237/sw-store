
export default async function Page() {
    try {
        // Faz a requisição para o endpoint usando a URL completa a partir de uma variável de ambiente
        const payment = await fetch(`${process.env.HOST_URL}/api/order/payment-success`, {
            method: 'POST'
        });

        // Verifica se a resposta foi bem-sucedida
        if (!payment.ok) {
            console.error(`Erro na requisição: ${payment.status} ${payment.statusText}`);
            return (
                <div>
                    <p>Erro ao processar o pagamento. Por favor, tente novamente.</p>
                </div>
            );
        }

        // Tenta processar a resposta como JSON
        const data = await payment.json();
        console.log(data);

        return (
            <ul>
                <p>Pagamento recebido com sucesso!</p>
            </ul>
        );
    } catch (error) {
        // Captura e exibe qualquer erro que possa ocorrer, incluindo o erro de parsing JSON
        console.error('Erro ao processar a resposta:', error);
        return (
            <div>
                <p>Erro ao processar o pagamento. Por favor, tente novamente.</p>
            </div>
        );
    }
}
