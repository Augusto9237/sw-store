'use client'
import { getOrders } from "@/actions/order";
import { getData } from "@/actions/products";
import { getUsers } from "@/actions/users";
import { Category, Order, Prisma, Product, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Dispatch, ReactNode, SetStateAction, createContext, use, useEffect, useState } from "react";

interface ICartContext {
    products: Product[];
    categories: Category[];
    users: User[];
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
    }[]>>
}

export const AdminContext = createContext<ICartContext>({
    products: [],
    categories: [],
    setProducts: () => { },
    users: [],
    orders: [],
    search: "",
    setSearch: () => { }
});

const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [users, setUsers] = useState<User[]>([]);
    const [orders, setOrders] = useState<ICartContext['orders']>([]);
    const [search, setSearch] = useState("");

    async function loadMoreData() {
        const { categories, products } = await getData()
        const { users } = await getUsers()
        const { orders } = await getOrders()

        setProducts(products)
        setCategories(categories)
        setUsers(users)
        setOrders(orders)
    }

    useEffect(() => {
        loadMoreData()
    }, [])

    return (
        <AdminContext.Provider value={{ products, categories, users, orders, search, setSearch, setProducts }}>
            {children}
        </AdminContext.Provider>
    )
};
export default AdminProvider;