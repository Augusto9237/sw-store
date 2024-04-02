'use client'
import { CardContent } from "@/components/ui/card";
import { CATEGORY_ICON } from "@/constants/category-icon";
import ModalEditCategory from "./modal-edit-category";
import ButtonDeleteCategory from "./button-delete-category";
import { useContext } from "react";
import { AdminContext } from "@/providers/admin";
import Link from "next/link";

export default function CategoriesList() {
    const { categories } = useContext(AdminContext)
 return (
     <CardContent className='w-full p-0 gap-4 flex flex-col max-md:grid grid-cols-2 mt-8'>
         {categories.map(category => (
             <div key={category.id} className="flex border border-input bg-background hover:bg-accent/60 hover:text-accent-foreground w-full justify-between px-2 py-1 items-center gap-2 rounded-lg">

                 <Link href={`/category/${category.slug}`} className="flex gap-2">
                     {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
                     <span className="font-bold text-xs">
                         {category.name}
                     </span>
                 </Link>


                 <div className="flex items-center gap-2">
                     <ModalEditCategory category={category} />

                     <ButtonDeleteCategory id={category.id} />
                 </div>
             </div>
         ))}
     </CardContent>
 );
}