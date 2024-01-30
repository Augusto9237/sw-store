'use client'
import { HomeIcon, LayoutDashboard, LayoutDashboardIcon, LogOutIcon, LucideLayoutDashboard, PackageSearchIcon, ShoppingCartIcon, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ActiveLink } from "./ui/active-link";
import { signOut } from "next-auth/react";

export default function Sidebar() {
    async function handleLogoutClick() {
        await signOut();
    }
    return (
        <Card className="w-64 rounded-none px-0 max-md:hidden">
            <CardHeader className="pl-10">
                <h1 className="font-semibold text-lg md:text-2xl">
                    <span className="text-primary">SW</span> Store
                </h1>
            </CardHeader>

            <CardContent className="w-full flex-1 px-0 pt-6 flex flex-col gap-6 ">
                <ActiveLink href="/dashboard">
                    <LucideLayoutDashboard size={16} />
                    Dashboard
                </ActiveLink>

                <ActiveLink href="/order">
                    <ShoppingCartIcon size={16}/>
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

            <CardFooter className="absolute bottom-0 left-0">
                <Button onClick={handleLogoutClick}  variant='outline' className="w-full justify-start gap-2">
                    <LogOutIcon size={16} />
                    Fazer Logout
                </Button>
            </CardFooter>
        </Card>
    )
}
