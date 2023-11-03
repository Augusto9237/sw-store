'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface ActiveLinkProps {
    children: ReactNode;
    href: string
}


export function ActiveLink({ children, href }: ActiveLinkProps) {
    const router = useRouter()
    const path = usePathname()
    const style = clsx('flex pl-8 border-l-8 gap-2 items-center font-semibold', path === href ? 'text-primary  border-primary' : 'border-background')

    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <Link href={href} onClick={handleClick} className={style}>
            {children}
        </Link>
    )
}