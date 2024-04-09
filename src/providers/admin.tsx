'use client'
import { getData } from "@/actions/products";
import { getUsers } from "@/actions/users";
import { Category, Product, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

interface ICartContext {
    products: Product[];
    categories: Category[];
    users: User[];
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
    setProducts: () => { },
    users: [],
});

const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [users, setUsers] = useState<User[]>([])

    async function loadMoreData() {
        const { categories, products } = await getData()
        const { users } = await getUsers()
        setProducts(products)
        setCategories(categories)
        setUsers(users)
    }

    useEffect(() => {
        loadMoreData()
    }, [])

    return (
        <AdminContext.Provider value={{ products, categories, users, setProducts }}>
            {children}
        </AdminContext.Provider>
    )
};
export default AdminProvider;