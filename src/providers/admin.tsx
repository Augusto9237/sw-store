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
    productSelected: Product | null;
    categories: Category[];
    categorySelected: Category | null;
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
    setOrders: Dispatch<SetStateAction<Prisma.OrderGetPayload<{
        include: {
            orderProducts: {
                include: {
                    product: true;
                }
            }
        }
    }>[]>>
    setSearch: Dispatch<SetStateAction<string>>;
    setProducts: Dispatch<SetStateAction<{
        id: string;
        name: string;
        slug: string;
        description: string;
        basePrice: Prisma.Decimal;
        imageUrls: string[];
        stock: number;
        categoryId: string;
        discountPercentage: number;
    }[]>>
    setCategories: Dispatch<SetStateAction<{
        id: string;
        name: string;
        slug: string;
        imageUrl: string;
    }[]>>;
    setProductSelected: Dispatch<SetStateAction<{
        id: string;
        name: string;
        slug: string;
        description: string;
        basePrice: Prisma.Decimal;
        imageUrls: string[];
        stock: number;
        categoryId: string;
        discountPercentage: number;
    } | null>>;
    setCategorySelected: Dispatch<SetStateAction<{
        id: string;
        name: string;
        slug: string;
        imageUrl: string;
    } | null>>
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
    productSelected: null,
    categories: [],
    categorySelected: null,
    setCategorySelected: () => { },
    setProducts: () => { },
    setOrders: () => { },
    setProductSelected: () => { },
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
    const [categorySelected, setCategorySelected] = useState<Category | null>(null)
    const [productSelected, setProductSelected] = useState<Product | null>(null)
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
        <AdminContext.Provider value={{ products, productSelected, categories, categorySelected, customers, usersTeam, orders, search, setSearch, setCategorySelected, setProductSelected, setOrders, setCustomers, setUsersTeam, setProducts, setCategories, loading }}>
            {children}
        </AdminContext.Provider>
    )
};
export default AdminProvider;