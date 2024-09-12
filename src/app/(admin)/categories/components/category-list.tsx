'use client'
import { Card, CardContent } from "@/components/ui/card";
import { useContext } from "react";
import { AdminContext } from "@/providers/admin";
import Link from "next/link";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { ExternalLink, List, Trash2 } from "lucide-react";
import { Category } from "@prisma/client";
import ModalFormCategory from "./modal-form-category";
import SearchInput from "@/components/search-input";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import ModalFormEditCategory from "./modal-edit-category";
import { deleteCategory, getCategories } from "@/actions/category";
import { toast } from "@/components/ui/use-toast";

export default function CategoriesList() {
    const { categories, setCategorySelected, setCategories, products } = useContext(AdminContext)

    function handleSelectCategory(category: Category) {
        setCategorySelected(category)
    }

    async function handleDelete(id: string) {

        try {
            await deleteCategory(id)
            toast({
                variant: "cancel",
                title: "🗑️ Categoria deletada",
            })
            const { categories: newCategories } = await getCategories()
            setCategories(newCategories)
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }
    }

    return (
        <Card className='p-5 w-full h-full overflow-hidden min-h-full'>
            <div className="flex justify-between gap-4">
                <SearchInput />
                <ModalFormCategory />
            </div>

            {categories.length < 1 && (
                <div className='w-full h-full flex flex-1 justify-center items-center'>
                    <Spinner />
                </div>
            )}

            {categories.length > 0 && (
                <CardContent className='w-full mt-8'>
                    <Table>
                        <TableHeader>
                            <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                                <TableHead className="w-28">Imagem</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead className="max-w-[50px]">slug</TableHead>
                                <TableHead className="max-w-[140px]">Produtos</TableHead>
                                <TableHead className="text-center">•••</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {categories.map(category => {
                                const productsFiltered = products.filter(product => product.categoryId === category.id).slice(0, 3)

                                return (
                                    <TableRow key={category.id} className='border-b-[1px] border-input max-md:text-sm'>
                                        <TableCell className="flex items-center  w-28">
                                            <Image src={category.imageUrl} alt={category.name} width={0} height={0} className="w-10 h-9" sizes="100vw" />
                                        </TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell className="md:max-w-[50px]">{category.slug}</TableCell>
                                        <TableCell className="max-w-[140px]">
                                            <div className="flex gap-1 items-center">
                                                {productsFiltered.map(product => (
                                                    <>
                                                        <p key={product.id} className="truncate">
                                                            {product.name}
                                                        </p>,
                                                    </>
                                                ))}

                                            </div>
                                        </TableCell>
                                        <TableCell className="md:max-w-[160px] overflow-hidden">
                                            <div className="flex gap-4 w-full">
                                                <Button variant="outline" onClick={() => handleSelectCategory(category)} className="w-full flex gap-2">
                                                    <ExternalLink size={16} />
                                                    <span className="max-lg:hidden">
                                                        Detalhes
                                                    </span>
                                                </Button>
                                                <ModalFormEditCategory category={category} />
                                                <Button variant='outline' className="w-full flex gap-2" onClick={() => handleDelete(category.id)}>
                                                    <Trash2 size={16} />
                                                    <span className="max-lg:hidden">
                                                        Excluir
                                                    </span>
                                                </Button>
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                )
                            }
                            )}
                        </TableBody>
                    </Table >
                </CardContent>
            )
            }
        </Card >
    );
}