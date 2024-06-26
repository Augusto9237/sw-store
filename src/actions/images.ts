'use server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '@/lib/s3Client'

export async function uploadImage(formData: FormData) {
    const image = formData.get('image') as File;
    const arrayBuffer = await image.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const putObjectParams = new PutObjectCommand({
        Bucket: 'sw-store-images',
        Key: image.name,
        Body: imageBuffer,
        ContentType: image.type
    })

    await s3Client.send(putObjectParams)
    return { key: image.name }
}