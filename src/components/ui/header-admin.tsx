'use client'
import { FormEvent, useContext, useEffect } from "react";
import { Boxes, GalleryHorizontal, LogOutIcon, MenuIcon, PieChart, ShapesIcon, ShoppingCartIcon, User, UserCog, Users } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./sheet";

import { signOut, useSession } from "next-auth/react";
import { Separator } from "./separator";
import { ActiveLink } from "./active-link";
import { usePathname } from "next/navigation";
import { getProducts } from "@/actions/products";
import { AdminContext } from "@/providers/admin";
import { getCustomers } from "@/actions/customers";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import ModalMyAccount from "../my-account";
import Link from "next/link";

import { AvatarImage, AvatarFallback, Avatar } from "./avatar";
import { SignOut } from "@/actions/auth";
import Logo from "../logo";

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
        order: "Pedidos",
        categories: "Categorias",
        products: "Produtos",
        customers: "Clientes",
        team: "Usuários",
        banners: "Banners"
    }

    async function handleLogoutClick() {
        await SignOut();
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
                        <SheetHeader className="mb-4">
                            <Link href="/dashboard" className="w-full justify-center flex">
                               <Logo/>
                            </Link>
                            {status === "authenticated" && data?.user && (
                                <div className="flex items-center gap-2 pl-6">
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
                            )}
                        </SheetHeader>

                        <Separator />

                        <div className="mt-4 flex flex-col gap-2">
                            <CardContent className="w-full flex-1 px-0 flex flex-col gap-4 ">
                                <ActiveLink href="/dashboard">
                                    <PieChart size={16} />
                                    Dashboard
                                </ActiveLink>

                                <ActiveLink href="/order">
                                    <ShoppingCartIcon size={16} />
                                    Pedidos
                                </ActiveLink>

                                <ActiveLink href="/customers">
                                    <Users size={16} />
                                    Clientes
                                </ActiveLink>

                                <ActiveLink href="/banners">
                                    <GalleryHorizontal size={16} />
                                    Banners
                                </ActiveLink>

                                <ActiveLink href="/categories">
                                    <ShapesIcon size={16} />
                                    Categorias
                                </ActiveLink>

                                <ActiveLink href="/products">
                                    <Boxes size={16} />
                                    Produtos
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

                <span className="font-bold text-xl">{ROUTE_NAME[path.slice(1) as keyof typeof ROUTE_NAME]}</span>


                <Popover>
                    {status === "authenticated" && data?.user && (
                        <PopoverTrigger asChild >
                            <div className="flex gap-2">
                                <User />

                                <span className="max-md:hidden">
                                    Olá,
                                    {data.user.name}
                                </span>
                            </div>
                        </PopoverTrigger>
                    )}

                    {status === "authenticated" && data?.user && (
                        <PopoverContent className="max-md:max-w-[184px]">
                            <div className="flex flex-col gap-4">
                                <ModalMyAccount />

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
