'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const initialState = {
    message: '',
}

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { ImagePlus, Plus } from "lucide-react"
import { createCategory } from "@/actions/category"
import { toast } from "@/components/ui/use-toast"
import React, { FormEvent, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { uploadImage } from "@/actions/images"
import Image from "next/image"
import { set } from "date-fns"

export default function ModalAddImage() {
    const [isOpen, setIsOpen] = useState(false);
    const [imgKey, setImgKey] = useState('');

    async function onSubmitImage(event: React.FormEvent<HTMLFormElement>) {
        // Evitar o envio padrão do formulário
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const { key } = await uploadImage(formData);
        setImgKey(key);
    }

    return (
        <Dialog modal={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button type='button' size='icon' variant='outline'>
                    <ImagePlus size={16} />
                </Button>
            </DialogTrigger>

            {isOpen && (
                <DialogContent className="max-w-[360px] w-full">
                    <DialogHeader>
                        <DialogTitle className="text-center">Adicionar Imagem</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmitImage}>
                        <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-4">
                                <Input name="image" type="file" className="placeholder:text-accent-foreground/50" placeholder='Digite ou cole a url da imagem da categoria' />
                            </div>
                            <div className="grid items-center gap-4">
                                <Image
                                    id="image-preview"
                                    src={imgKey ? `https://sw-store-images.s3.sa-east-1.amazonaws.com/${imgKey}` : '/placeholder-image.webp'}
                                    alt="Image Preview"
                                    className="aspect-square w-full rounded-md object-cover"
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-center gap-5 ">
                            <Button variant='save' className="uppercase font-semibold">Salvar</Button>

                            <DialogClose asChild>
                                <Button variant="secondary" className="uppercase font-semibold" type="reset">Cancelar</Button>
                            </DialogClose>
                        </div>
                    </form>
                </DialogContent>
            )}
        </Dialog>

    )
}
