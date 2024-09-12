'use server'
import { CartProduct } from "@/providers/cart";


export async function Payment(products: CartProduct[], id: string) {
    try {
        const response = await fetch(`${process.env.HOST_URL}/api/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Especifica que o corpo da requisição está no formato JSON
                // Adicione outros cabeçalhos se necessário, por exemplo, autenticação
            },
            body: JSON.stringify({products, id}) // Converte o objeto para uma string JSON
        });

        if (!response.ok) {
            // Se a resposta não for OK, lance um erro com a mensagem da resposta
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Converte a resposta em JSON
        return data; // Imprime a resposta no console
    } catch (error) {
        // Captura e imprime qualquer erro ocorrido
        console.error('There was a problem with the fetch operation:', error);
    }
}