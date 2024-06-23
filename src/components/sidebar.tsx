'use client'
import { Boxes, LogOutIcon, LucideLayoutDashboard, ShoppingCartIcon, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ActiveLink } from "./ui/active-link";
import { SignOutAdmin } from "@/actions/auth";


export default function Sidebar() {

    async function handleLogoutClick() {
        await SignOutAdmin()
    }
    
    return (
        <Card className="w-64 rounded-none px-0 max-lg:hidden">
            <CardHeader className="pl-10 max-xl:pl-8">
                <Link href="/dashboard" className="font-semibold text-2xl max-lg:text-lg flex flex-nowrap">
                    <span className="text-primary">Auto</span> Tech
                </Link>
            </CardHeader>

            <CardContent className="w-full flex-1 px-0 pt-6 flex flex-col gap-6 ">
                <ActiveLink href="/dashboard">
                    <LucideLayoutDashboard size={16} />
                    Dashboard
                </ActiveLink>

                <ActiveLink href="/order">
                    <ShoppingCartIcon size={16} />
                    Pedidos
                </ActiveLink>

                <div className="lg:hidden">
                    <ActiveLink href="/catgories">
                        <Boxes size={16} />
                        Categorias
                    </ActiveLink>
                </div>

                <ActiveLink href="/products">
                    <Boxes size={16} />
                    Produtos
                </ActiveLink>

                <ActiveLink href="/users">
                    <Users size={16} />
                    Clientes
                </ActiveLink>

                <ActiveLink href="/team">
                    <Users size={16} />
                    Usuários
                </ActiveLink>
            </CardContent>

            <CardFooter className="absolute bottom-0 left-0 px-6 max-xl:px-4">
                <Button onClick={handleLogoutClick} variant='outline' className="w-full">
                    <LogOutIcon size={16} />
                    Fazer Logout
                </Button>
            </CardFooter>
        </Card>
    )
}
