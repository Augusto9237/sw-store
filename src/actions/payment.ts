'use server'
import { MercadoPagoConfig, Payment } from 'mercadopago';

export async function PaymentMp() {
    const client = new MercadoPagoConfig({ accessToken:  process.env.ACCESS_TOKEN });
    const payments = new Payment(client);

    payments.create({
        body: {
            additional_info: {
                items: [
                    {
                        id: 'MLB2907679857',
                        title: 'Point Mini',
                        description: 'Point product for card payments via Bluetooth.',
                        picture_url: 'https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png',
                        category_id: 'electronics',
                        quantity: 1,
                        unit_price: 58.8,
                    }
                ],
                payer: {
                    first_name: 'Test',
                    last_name: 'Test',
                    phone: {
                        area_code: '11',
                        number: '987654321'
                    },
                    address: {
                        street_number: "5"
                    }
                },
                shipments: {
                    receiver_address: {
                        zip_code: '12312-123',
                        state_name: 'Rio de Janeiro',
                        city_name: 'Buzios',
                        street_name: 'Av das Nacoes Unidas',
                        street_number: 3003
                    }
                }
            },
            binary_mode: false,
            capture: false,
            description: 'Payment for product',
            external_reference: 'MP0001',
            installments: 1,
            metadata: null,
            payer: {
                entity_type: 'individual',
                type: 'customer',
                email: 'test_user_123@testuser.com',
                identification: {
                    type: 'CPF',
                    number: '95749019047'
                }
            },
            payment_method_id: 'master',
            token: 'ff8080814c11e237014c1ff593b57b4d',
            transaction_amount: 58.8
        },
        requestOptions: { idempotencyKey: 'abc' }
    })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
}