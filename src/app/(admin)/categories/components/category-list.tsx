'use client'
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { useContext } from "react";
import { AdminContext } from "@/providers/admin";
import Link from "next/link";
import Spinner from "@/components/spinner";
import ModalFormCategory from "../../products/components/modal-form-category";
import ButtonDeleteCategory from "../../products/components/button-delete-category";
import { Button } from "@/components/ui/button";
import { List, Trash2 } from "lucide-react";
import { Category } from "@prisma/client";
import { deleteCategory } from "@/actions/category";
import { toast } from "@/components/ui/use-toast";

export default function CategoriesList() {
    const { categories, setCategorySelected } = useContext(AdminContext)

    function handleSelectCategory(category: Category){
        setCategorySelected(category)
    }

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
        <Card className='p-5 w-full h-full max-sm:min-h-fit max-lg:min-h-[400px] overflow-hidden'>
            <div className="flex w-full justify-between items-center">
                <h2 className='text-lg font-bold leading-none'>Categorias</h2>
                <ModalFormCategory />
            </div>

            {categories.length < 1 && (
                <div className='w-full h-full flex flex-1 justify-center items-center'>
                    <Spinner />
                </div>
            )}

            {categories.length > 0 && (
                <CardContent className='w-full p-0 gap-4 grid grid-cols-4 max-[1450px]:grid-cols-3 max-md:grid-cols-2  max-sm:grid-cols-1 mt-8'>
                    {categories.map(category => (
                        <div key={category.id} className="flex border border-input bg-background hover:bg-accent/60 hover:text-accent-foreground w-full justify-between px-2 py-1 items-center gap-2 rounded-lg">
                            <Link href={`/category/${category.slug}`} className="flex gap-2">
                                {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
                                <span className="font-bold text-xs">
                                    {category.name}
                                </span>
                            </Link>
                            <div className="flex items-center gap-2">
                                <Button onClick={() => handleSelectCategory(category)} variant='outline' size='icon' className="h-9 w-9">
                                    <List size={16} />
                                </Button>

                                <ModalFormCategory category={category} />
                                
                                <Button variant='outline' size='icon' className="h-9 w-9" onClick={() => handleDelete(category.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            )}
        </Card>
    );
}