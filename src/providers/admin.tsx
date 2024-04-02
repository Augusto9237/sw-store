'use client'
import { getData } from "@/actions/products";
import { Category, Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

interface ICartContext {
    products: Product[];
    categories: Category[];
    setProducts: Dispatch<SetStateAction<{
        id: string;
        name: string;
        slug: string;
        description: string;
        basePrice: Decimal;
        imageUrls: string[];
        categoryId: string;
        discountPercentage: number;
    }[]>>
}

export const AdminContext = createContext<ICartContext>({
    products: [],
    categories: [],
    setProducts: () => { }
});

const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    async function loadMoreData() {
        const { categories, products } = await getData()
        setProducts(products)
        setCategories(categories)
    }

    useEffect(() => {
        loadMoreData()
    }, [])

    return (
        <AdminContext.Provider value={{ products, categories, setProducts }}>
            {children}
        </AdminContext.Provider>
    )
};
export default AdminProvider;