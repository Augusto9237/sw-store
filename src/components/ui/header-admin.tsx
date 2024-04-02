'use client'
import { FormEvent, useContext, useEffect, useState } from "react";
import { BellIcon, HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, LucideLayoutDashboard, MenuIcon, PackageSearchIcon, PercentIcon, SearchIcon, ShoppingCartIcon, User2, Users } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./sheet";


import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { ActiveLink } from "./active-link";
import { usePathname } from "next/navigation";
import { Input } from "./input";
import { useCookies } from 'react-cookie';
import { getData } from "@/actions/products";
import { AdminContext } from "@/providers/admin";

export default function HeaderAdmin() {
    const { status, data } = useSession();
    const { setProducts } = useContext(AdminContext)
    const [search, setSearch] = useState("");
    const path = usePathname();

    async function resetData() {
        const { products } = await getData()
        setProducts(products)
    }

    useEffect(() => {
        setSearch('')
        resetData()

    }, [path,])



    async function handleSearchSubmit(e: FormEvent) {
        e.preventDefault();

        if (path.slice(1) === 'products') {
            const { products } = await getData(search)
            setProducts(products);
        }

        if (path.slice(1) === 'order') {
         console.log('test')
        }

        if (path.slice(1) === 'users') {
            console.log('test')
        }
    }



    const ROUTE_NAME = {
        dashboard: "Dashboard",
        order: "Pedidos",
        products: "Produtos",
        users: "Usuários",
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
                    <SheetTrigger asChild className="md:hidden">
                        <Button size='icon' variant='outline'>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side='left' className="w-full max-md:max-w-[100px] md:max-w-[440px]">
                        {status === "authenticated" && data?.user && (
                            <div className="flex-col">
                                <div className="flex items-center gap-2 py-4">
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
                            <CardContent className="w-full flex-1 px-0 pt-8 flex flex-col gap-8 ">
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

                                <ActiveLink href="/users">
                                    <Users size={16} />
                                    Clientes
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
                                <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input
                                    className="w-full bg-accent shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                                    placeholder={`Pesquisar ${path.slice(1) === 'products' && 'produtos' || path.slice(1) === 'order' && 'pedidos' || path.slice(1) === 'users' && 'usuários'}`}
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

                <div>
                    <BellIcon />
                </div>
            </div>
        </Card>
    )
}
