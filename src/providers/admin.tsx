'use client'
import { getCategories } from "@/actions/category";
import { getCustomers } from "@/actions/customers";
import { getOrders } from "@/actions/order";
import { getProducts } from "@/actions/products";
import { getUsersTeam } from "@/actions/team";

import { Category, Prisma, Product, User, UserTeam } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Dispatch, ReactNode, SetStateAction, createContext, use, useEffect, useState } from "react";

interface ICartContext {
    products: Product[];
    categories: Category[];
    customers: User[];
    usersTeam: UserTeam[];
    orders: Prisma.OrderGetPayload<{
        include: {
            orderProducts: {
                include: {
                    product: true;
                }
            }
        }
    }>[];
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    setProducts: Dispatch<SetStateAction<{
        id: string;
        name: string;
        slug: string;
        description: string;
        basePrice: Decimal;
        imageUrls: string[];
        categoryId: string;
        discountPercentage: number;
    }[]>>,
    setCategories: Dispatch<SetStateAction<{
        id: string;
        name: string;
        slug: string;
        imageUrl: string;
    }[]>>;
    setCustomers: Dispatch<SetStateAction<{
        id: string;
        name: string | null;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>>;
    setUsersTeam: Dispatch<SetStateAction<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
    }[]>>
    loading: boolean
}

export const AdminContext = createContext<ICartContext>({
    products: [],
    categories: [],
    setProducts: () => { },
    setCategories: () => { },
    setCustomers: () => { },
    setUsersTeam: () => { },
    customers: [],
    usersTeam: [],
    orders: [],
    search: "",
    setSearch: () => { },
    loading: false
});

const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [customers, setCustomers] = useState<User[]>([]);
    const [usersTeam, setUsersTeam] = useState<UserTeam[]>([]);
    const [orders, setOrders] = useState<ICartContext['orders']>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)

    async function loadMoreData() {
        const { products } = await getProducts('', 18);
        const { categories } = await getCategories()
        const { customers } = await getCustomers()
        const { orders } = await getOrders()
        const { userTeam } = await getUsersTeam()

        setProducts(products)
        setCategories(categories)
        setCustomers(customers)
        setOrders(orders)
        setUsersTeam(userTeam)
    }

    useEffect(() => {
        loadMoreData()
        setLoading(false)

    }, [])

    return (
        <AdminContext.Provider value={{ products, categories, customers, usersTeam, orders, search, setSearch, setCustomers, setUsersTeam, setProducts, setCategories, loading }}>
            {children}
        </AdminContext.Provider>
    )
};
export default AdminProvider;