'use client'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AdminContext } from "@/providers/admin";
import { useContext, useState } from "react";
import { deleteCategory } from "@/actions/category";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ModalEditProduct from "./modal-edit-product";
import ProductImages from "./product-images";
import { formatReal } from "@/helpers/formatReal";
import { computeProductTotalPrice } from "@/helpers/product";
import ButtonDelete from "./button-delete";

interface ProductImagesProps {
    name: string;
    imagesUrls: string[]
}

export default function ProductInfo() {
    const { productSelected, products } = useContext(AdminContext)
    const [totaLoading, setTotalLoading] = useState(false);
    const product = products.find(product => product.id === productSelected?.id);
    const total = product && computeProductTotalPrice(product)
    async function handleDelete(id: string) {

        try {
            await deleteCategory(id)
            toast({
                variant: "cancel",
                title: "🗑️ Categoria deletada",
            })
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }
    }

    return (
        <Card className="w-full h-full overflow-hidden max-sm:min-h-[420px]">
            {product ?
                <>
                    <CardHeader>
                        <h2 className='text-lg font-bold leading-none text-center'>Produto</h2>
                    </CardHeader>

                    <CardContent className="flex gap-8 max-sm:flex-col max-md:flex-row lg:flex-col justify-between ">

                        <ProductImages imagesUrls={product?.imageUrls!} name={product?.name!} />

                        <div className="flex flex-col w-full">
                            <h2 className="font-semibold">Informações do produto</h2>
                            <div className="text-sm overflow-hidden truncate">
                                <span className="font-semibold">Nome:</span> {product.name}
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold">Slug:</span> {product.slug}
                            </div>
                            <div className="text-sm min-h-[200px] h-full max-h-[200px] overflow-hidden flex-1 text-justify">
                                <span className="font-semibold">Descrição:</span> {product.description}</div>
                            <div className="text-sm">
                                <span className="font-semibold">Preço base:</span> {formatReal(Number(product.basePrice))}
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold">Desconto:</span> {product.discountPercentage} %</div>
                            <div className="text-sm">
                                <span className="font-semibold">Preço final:</span> {formatReal(Number(total?.totalPrice))}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="gap-4">
                        <ModalEditProduct product={{ ...product, basePrice: Number(product.basePrice) }} setTotalLoading={setTotalLoading} />
                        <ButtonDelete idProduct={product.id} />
                    </CardFooter>
                </>
                :
                <>
                    <CardContent className="flex items-center justify-center flex-1 h-full">
                        <h1>
                            Nenhuma categoria selecionada
                        </h1>
                    </CardContent>
                </>}
        </Card>
    )
}