'use client'
import { SearchIcon } from 'lucide-react'
import React, { FormEvent, useContext, useEffect } from 'react'
import { Input } from './ui/input'
import { AdminContext } from '@/providers/admin'
import { usePathname } from 'next/navigation'
import { getCustomers } from '@/actions/customers'
import { getProducts } from '@/actions/products'
import { getOrders } from '@/actions/order'

export default function SearchInput() {
    const { setProducts, setCustomers, setOrders,search, setSearch } = useContext(AdminContext)
    
    const path = usePathname();

    async function resetData() {
        if (path.slice(1) === 'products') {
            const { products } = await getProducts('', 18)
            setProducts(products);
        }

        if (path.slice(1) === 'order') {
            const {orders} = await getOrders()
            setOrders(orders)
        }

        if (path.slice(1) === 'customers') {
            const { customers } = await getCustomers()
            setCustomers(customers)
        }
    }

    useEffect(() => {
        setSearch('')
        resetData()

    }, [path])

    async function handleSearchSubmit(e: FormEvent) {
        e.preventDefault();

        if (path.slice(1) === 'products') {
            const { products } = await getProducts(search)
            setProducts(products);
        }

        if (path.slice(1) === 'order') {
            const { orders } = await getOrders(search)
            setOrders(orders)
        }

        if (path.slice(1) === 'customers') {
            const { customers } = await getCustomers(search)
            setCustomers(customers)
        }
    }
    
    return (
        <div className="w-full flex-1">
            <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-3  h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        className="w-full bg-accent shadow-none appearance-none pl-8 md:w-2/3 "
                        placeholder={`Pesquisar ${path.slice(1) === 'products' && 'produto' || path.slice(1) === 'categories' && 'categoria' || path.slice(1) === 'order' && 'pedido' || path.slice(1) === 'customers' && 'cliente' || path.slice(1) === 'team' && 'usuário' || path.slice(1) === 'banners' && 'banner'}`}
                        type="search"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>
            </form>
        </div>
    )
}
