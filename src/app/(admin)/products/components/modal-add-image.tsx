'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, UseFormSetValue, useForm } from "react-hook-form"
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

import { ImageOff, ImagePlus, Plus, Upload } from "lucide-react"
import React, { useState } from "react"
import { uploadImage } from "@/actions/images"
import Image from "next/image"
import Spinner from "@/components/spinner"

interface ModalAddImageProps {
    index?: number;
    updatedValues?: {
        url: string;
    }[];
    setValueImageProducts?: UseFormSetValue<{
        name: string;
        slug: string;
        categoryId: string;
        description: string;
        basePrice: number;
        discountPercentage: number;
        imageUrls: {
            url: string;
        }[];
    }>;
    setValueImageCategories?: UseFormSetValue<{
        name: string;
        slug: string;
        imageUrl: string;
    }>
}

export default function ModalAddImage({ index, updatedValues, setValueImageProducts, setValueImageCategories }: ModalAddImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    async function onSubmitImage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.target as HTMLFormElement);
            setIsLoading(true)
            const { url } = await uploadImage(formData);
            if (!url) return;

            if (updatedValues?.length && index && setValueImageProducts) {
                updatedValues[index] = { url: url };

                setValueImageProducts('imageUrls', updatedValues);
            }

            if (setValueImageCategories) {
                setValueImageCategories('imageUrl', url);
            }

            setPreviewUrl(null);
            setIsOpen(false);
        } catch (error) {

        }
    }

    return (
        <Dialog modal={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button type='button' size='icon' variant='outline'>
                    <ImagePlus size={16} />
                </Button>
            </DialogTrigger>

            {isOpen && (
                <DialogContent className="max-w-[360px] w-full overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="text-center">Adicionar Imagem</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmitImage}>
                        {isLoading && (
                            <div className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-white/20 z-50">
                                <Spinner />
                            </div>
                        )}
                        <div className="flex flex-col min-h-[280px] max-h-[280px] overflow-hidden mb-4 rounded-lg">
                            <Image
                                id="image-preview"
                                src={previewUrl && previewUrl !== '' ? previewUrl : "/placeholder-image.avif"}
                                alt="Image Preview"
                                sizes="100vw"
                                className="h-[240px] max-h-[100%] w-auto max-w-full object-cover"
                                width={0}
                                height={0}
                            />

                            <Button variant="outline" className="relative flex gap-2 items-center">
                                <input
                                    required
                                    type="file"
                                    name="image"
                                    className="absolute top-0 cursor-pointer opacity-0"
                                    onChange={handleImageChange}
                                />
                                <Upload size={16} />
                                Selecionar imagem
                            </Button>
                        </div>
                        <div className="flex w-full justify-center gap-4">
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
