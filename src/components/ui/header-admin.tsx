'use client'
import { BellIcon, HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, PackageSearchIcon, PercentIcon, ShoppingCartIcon, User2 } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

export default function HeaderAdmin() {
    const { status, data } = useSession();
    const { products } = useContext(CartContext)

    async function handleLoginClick() {
        await signIn();
    }

    async function handleLogoutClick() {
        await signOut();
    }
    return (
        <Card className="px-8 py-6 w-full items-center flex rounded-none border-x-0" >
            <div className="flex justify-between  items-center w-full">
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
                                <Button onClick={handleLoginClick} variant='outline' className="w-full justify-start gap-2">
                                    <LogInIcon size={16} />
                                    Fazer Login
                                </Button>
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
                                        Catálogo
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>

                <h1 className="font-bold text-xl">Dashboard</h1>

                <div>
                    <BellIcon />
                </div>
            </div>
        </Card>
    )
}
