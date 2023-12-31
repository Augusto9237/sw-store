'use client'
import { BellIcon, HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, LucideLayoutDashboard, MenuIcon, PackageSearchIcon, PercentIcon, ShoppingCartIcon, User2, Users } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./sheet";


import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { ActiveLink } from "./active-link";
import { usePathname } from "next/navigation";

export default function HeaderAdmin() {
    const { status, data } = useSession();
    const path = usePathname()

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
        <Card className="px-8 py-6 w-full items-center flex rounded-none border-x-0" >
            <div className="flex justify-between  items-center w-full">
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

                                <ActiveLink href="/orders">
                                    <ShoppingCartIcon size={16} />
                                    Pedidos
                                </ActiveLink>

                                <ActiveLink href="/products">
                                    <PackageSearchIcon size={16} />
                                    Produtos
                                </ActiveLink>

                                <ActiveLink href="/products">
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

                <h1 className="font-bold text-xl">{ROUTE_NAME[path.slice(1) as keyof typeof ROUTE_NAME]}</h1>

                <div>
                    <BellIcon />
                </div>
            </div>
        </Card>
    )
}
