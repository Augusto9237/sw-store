'use client'
import { FormEvent, useContext, useEffect } from "react";
import { LogOutIcon, LucideLayoutDashboard, MenuIcon, PackageSearchIcon, SearchIcon, ShoppingCartIcon, UserCog, Users } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "./sheet";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { ActiveLink } from "./active-link";
import { usePathname } from "next/navigation";
import { Input } from "./input";
import { getProducts } from "@/actions/products";
import { AdminContext } from "@/providers/admin";
import { getCustomers } from "@/actions/customers";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export default function HeaderAdmin() {
    const { status, data } = useSession();
    const { setProducts, setCustomers, search, setSearch } = useContext(AdminContext)
    const path = usePathname();

    async function resetData() {
        if (path.slice(1) === 'products') {
            const { products } = await getProducts('', 18)
            setProducts(products);
        }

        if (path.slice(1) === 'order') {
            console.log('test')
        }

        if (path.slice(1) === 'users') {
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
            console.log('test')
        }

        if (path.slice(1) === 'users') {
            const { customers } = await getCustomers(search)
            setCustomers(customers)
        }
    }


    const ROUTE_NAME = {
        dashboard: "Dashboard",
    }

    async function handleLoginClick() {
        await signIn();
    }

    async function handleLogoutClick() {
        await signOut();
    }
    return (
        <Card className="px-8 max-md:px-4 min-h-[74px] w-full items-center flex rounded-none border-x-0" >
            <div className="flex justify-between  items-center w-full max-md:gap-4">
                <Sheet>
                    <SheetTrigger asChild className="lg:hidden md:mr-4">
                        <Button size='icon' variant='outline'>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side='left' className="w-full max-md:max-w-[240px] max-lg:max-w-[340px] px-0">
                        {status === "authenticated" && data?.user && (
                            <div className="flex-col">
                                <div className="flex items-center gap-2 py-4 px-6">
                                    <Avatar>
                                        <AvatarFallback>
                                            {data.user.name?.[0].toUpperCase()}
                                        </AvatarFallback>

                                        {data.user.image && <AvatarImage src={data.user.image!} />}
                                    </Avatar>
                                    <div className="flex-col">
                                        <p className="font-medium">{data.user.name}</p>
                                        <p className="text-sm opacity-75">Administrador</p>
                                    </div>
                                </div>
                                <Separator />
                            </div>
                        )}

                        <div className="mt-4 flex flex-col gap-2">
                            <CardContent className="w-full flex-1 px-0 flex flex-col gap-8 ">
                                <ActiveLink href="/dashboard">
                                    <LucideLayoutDashboard size={16} />
                                    Dashboard
                                </ActiveLink>

                                <ActiveLink href="/order">
                                    <ShoppingCartIcon size={16} />
                                    Pedidos
                                </ActiveLink>

                                <ActiveLink href="/products">
                                    <PackageSearchIcon size={16} />
                                    Produtos
                                </ActiveLink>

                                <ActiveLink href="/customers">
                                    <Users size={16} />
                                    Clientes
                                </ActiveLink>

                                <ActiveLink href="/team">
                                    <Users size={16} />
                                    Usuários
                                </ActiveLink>
                            </CardContent>
                        </div>
                        <SheetFooter className="absolute bottom-5 left-5 right-5">
                            <Button onClick={handleLogoutClick} variant='outline' className="w-full justify-start gap-2">
                                <LogOutIcon size={16} />
                                Fazer Logout
                            </Button>
                        </SheetFooter>
                    </SheetContent>

                </Sheet>

                {path.slice(1) !== 'dashboard' && (
                    <div className="w-full flex-1">
                        <form onSubmit={handleSearchSubmit}>
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-3 max-sm:top-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input
                                    className="w-full bg-accent shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                                    placeholder={`Pesquisar ${path.slice(1) === 'products' && 'produtos' || path.slice(1) === 'order' && 'pedidos' || path.slice(1) === 'customers' && 'clientes' || path.slice(1) === 'team' && 'usuários'}`}
                                    type="search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            </div>
                        </form>
                    </div>
                )}

                {path.slice(1) === 'dashboard' && (
                    <span className="font-bold text-xl">{ROUTE_NAME[path.slice(1) as keyof typeof ROUTE_NAME]}</span>
                )}

                <Popover>
                    {status === "authenticated" && data?.user && (
                        <PopoverTrigger asChild className="max-md:hidden">
                            <div className="flex gap-2">
                                <UserCog />
                                {data.user.name}
                            </div>
                        </PopoverTrigger>
                    )}

                    {status === "authenticated" && data?.user && (
                        <PopoverContent className="max-md:hidden">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    Minha conta
                                </div>

                                <Separator />

                                <Button onClick={handleLogoutClick} variant='outline' className="w-full justify-start gap-2">
                                    <LogOutIcon size={16} />
                                    Fazer Logout
                                </Button>
                            </div>
                        </PopoverContent>
                    )}
                </Popover>
            </div>
        </Card>
    )
}
