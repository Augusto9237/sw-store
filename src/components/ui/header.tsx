'use client'
import { useRouter } from 'next/navigation'
import { HomeIcon, ListOrderedIcon, LogOutIcon, MenuIcon, PackageSearchIcon, PercentIcon, SearchIcon, ShoppingCartIcon, User2 } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { Badge } from "./badge";
import { FormEvent, useContext, useState } from "react";
import { CartContext } from "@/providers/cart";
import { Input } from "./input";
import { SignOutCustomer } from '@/actions/auth';
import LoginCustomer from '../login-customer';
import Logo from '../logo';

export default function Header() {
    const { status, data } = useSession();
    const [search, setSearch] = useState("")
    const { products } = useContext(CartContext);

    const router = useRouter()

    async function handleLoginClick() {
        await signIn();
    }

    async function handleLogoutClick() {
        await SignOutCustomer()
        window.location.reload()
    }

    async function handleSearchSubmit(e: FormEvent) {
        e.preventDefault();
        router.push(`/search/${search}`)
    }

    return (
        <Card className="px-[1.875rem] py-2 sm:p-[1.875rem] max-sm:px-5 fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-card/70 rounded-none border-none" >
            <div className="flex justify-between  items-center max-w-[1248px] w-full mx-auto gap-4 lg:gap-8">
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button size='icon' variant='outline'>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left">
                        <SheetHeader className="text-left text-lg font-semibold">
                            Menu
                        </SheetHeader>

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
                                        <p className="text-sm opacity-75">Boas compras!</p>
                                    </div>
                                </div>
                                <Separator />
                            </div>
                        )}

                        <div className="mt-4 flex flex-col gap-2">
                            {status === "unauthenticated" && (
                                <LoginCustomer />
                            )}

                            {status === "authenticated" && (
                                <Button onClick={handleLogoutClick} variant='outline' className="w-full justify-start gap-2">
                                    <LogOutIcon size={16} />
                                    Fazer Logout
                                </Button>
                            )}

                            <SheetClose asChild>
                                <Link href="/">
                                    <Button variant='outline' className="w-full justify-start gap-2">
                                        <HomeIcon size={16} />
                                        Início
                                    </Button>
                                </Link>
                            </SheetClose>

                            <SheetClose asChild>
                                <Link href="/orders">
                                    <Button variant='outline' className="w-full justify-start gap-2">
                                        <PackageSearchIcon size={16} />
                                        Meus Pedidos
                                    </Button>
                                </Link>
                            </SheetClose>

                            <SheetClose asChild>
                                <Link href="/deals">
                                    <Button variant='outline' className="w-full justify-start gap-2">
                                        <PercentIcon size={16} />
                                        Ofertas
                                    </Button>
                                </Link>
                            </SheetClose>

                            <SheetClose asChild>
                                <Link href="/catalog">
                                    <Button variant='outline' className="w-full justify-start gap-2">
                                        <ListOrderedIcon size={16} />
                                        Categorias
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>

                <Link href="/">
                    <Logo />
                </Link>

                <div className="flex flex-1 gap-8 items-center justify-center max-md:hidden">
                    <Link href="/">
                        <h1 className="font-semibold">
                            Início
                        </h1>
                    </Link>

                    <Link href="/catalog">
                        <h1 className="font-semibold">
                            Categorias
                        </h1>
                    </Link>

                    <Link href="/deals">
                        <h1 className="font-semibold">
                            Ofertas
                        </h1>
                    </Link>
                </div>

                <div className="w-full flex-1 max-sm:hidden">
                    <form onSubmit={handleSearchSubmit} >
                        <div className="relative">
                            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <Input
                                className="w-full bg-accent shadow-none appearance-none pl-8"
                                placeholder="Pesquisar"
                                type="search"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-4">
                    <Popover>
                        {status === "authenticated" && data?.user && (
                            <PopoverTrigger asChild className="max-md:hidden">
                                <Avatar className="h-10 w-10">
                                    {data?.user?.image && <AvatarImage src={data.user.image!} />}
                                </Avatar>
                            </PopoverTrigger>
                        )}

                        {status === "unauthenticated" && (
                            <PopoverTrigger asChild className="max-md:hidden">
                                <Button size='icon' variant='outline' className="relative">
                                    <User2 />
                                </Button>
                            </PopoverTrigger>
                        )}

                        {status === "authenticated" && data?.user && (
                            <PopoverContent className="max-md:hidden">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarFallback>
                                                {data?.user?.name?.[0].toUpperCase()}
                                            </AvatarFallback>

                                            {data?.user?.image && <AvatarImage src={data.user.image!} />}
                                        </Avatar>
                                        <div className="flex-col">
                                            <p className="font-medium">{data?.user?.name}</p>
                                            <p className="text-sm opacity-75">Boas compras!</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <Link href="/orders">
                                        <Button variant='outline' className="w-full justify-start gap-2">
                                            <PackageSearchIcon size={16} />
                                            Meus Pedidos
                                        </Button>
                                    </Link>

                                    <Button onClick={handleLogoutClick} variant='outline' className="w-full justify-start gap-2">
                                        <LogOutIcon size={16} />
                                        Fazer Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        )}
                        {status === "unauthenticated" && (
                            <PopoverContent className="max-md:hidden">
                                <LoginCustomer />
                            </PopoverContent>
                        )}
                    </Popover>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size='icon' variant='outline' className="relative">
                                {products.length > 0 && (
                                    <Badge className="absolute top-0 -right-2 px-1.5">
                                        <p className="text-xs">{products.length}</p>
                                    </Badge>
                                )}
                                <ShoppingCartIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full max-w-[350px] md:max-w-[440px]">
                            <Cart />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative w-full hidden max-sm:flex mt-2" >
                <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                    className="w-full bg-accent shadow-none appearance-none pl-8"
                    placeholder="Pesquisar"
                    type="search"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </form>

        </Card>
    )
}
