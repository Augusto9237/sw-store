'use client'
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_ICON } from "@/constants/category-icon";
import ButtonDeleteCategory from "./button-delete-category";
import { useContext } from "react";
import { AdminContext } from "@/providers/admin";
import Link from "next/link";
import Spinner from "@/components/spinner";
import ModalFormCategory from "./modal-form-category";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

export default function CategoriesList() {
    const { categories} = useContext(AdminContext)

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
                <CardContent className='w-full p-0 gap-4 flex flex-col max-lg:grid grid-cols-2 max-sm:grid-cols-1 mt-8'>
                    {categories.map(category => (
                        <div key={category.id} className="flex border border-input bg-background hover:bg-accent/60 hover:text-accent-foreground w-full justify-between px-2 py-1 items-center gap-2 rounded-lg">
                            <Link href={`/category/${category.slug}`} className="flex gap-2">
                                {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
                                <span className="font-bold text-xs">
                                    {category.name}
                                </span>
                            </Link>
                            <div className="flex items-center gap-2">
                                <ModalFormCategory category={category} />
                                <ButtonDeleteCategory id={category.id} />
                            </div>
                        </div>
                    ))}
                </CardContent>
            )}
        </Card>
    );
}