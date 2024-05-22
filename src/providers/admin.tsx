'use client'
import { getCategories } from "@/actions/category";
import { getOrders } from "@/actions/order";
import { getProducts } from "@/actions/products";
import { getUsersTeam } from "@/actions/team";
import { getUsers } from "@/actions/users";
import { Category, Prisma, Product, User, UserTeam } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Dispatch, ReactNode, SetStateAction, createContext, use, useEffect, useState } from "react";

interface ICartContext {
    products: Product[];
    categories: Category[];
    users: User[];
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
    setUsers: Dispatch<SetStateAction<{
        id: string;
        name: string | null;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>>;
    loading: boolean
}

export const AdminContext = createContext<ICartContext>({
    products: [],
    categories: [],
    setProducts: () => { },
    setCategories: () => { },
    setUsers: () => { },
    users: [],
    usersTeam: [],
    orders: [],
    search: "",
    setSearch: () => { },
    loading: false
});

const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [users, setUsers] = useState<User[]>([]);
    const [usersTeam, setUsersTeam] = useState<UserTeam[]>([]);
    const [orders, setOrders] = useState<ICartContext['orders']>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)

    async function loadMoreData() {
        const { products } = await getProducts('', 18);
        const { categories } = await getCategories()
        const { users } = await getUsers()
        const { orders } = await getOrders()
        const { userTeam } = await getUsersTeam()

        setProducts(products)
        setCategories(categories)
        setUsers(users)
        setOrders(orders)
        setUsersTeam(userTeam)
    }

    useEffect(() => {
        loadMoreData()
        setLoading(false)

    }, [])

    return (
        <AdminContext.Provider value={{ products, categories, users, usersTeam, orders, search, setSearch, setUsers, setProducts, setCategories, loading }}>
            {children}
        </AdminContext.Provider>
    )
};
export default AdminProvider;