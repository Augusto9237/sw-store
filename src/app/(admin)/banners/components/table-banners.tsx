'use client'
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Banner } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import ModalFormEditBanner from './modal-edit-banner';
import { deleteBanner } from '@/actions/banner';
import { Trash2 } from 'lucide-react';
interface TableBannersProps {
    banner: Banner[]
}
export default function TableBanners({ banner }: TableBannersProps) {

    async function handleDeleteBanner(id: string) {
        try {
            await deleteBanner(id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                    <TableHead>Ordem</TableHead>
                    <TableHead>Imagem</TableHead>
                    <TableHead>titulo</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead className='text-center'>•••</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {banner.map((banner, index) => (
                    <TableRow key={banner.id} className='border-b-[1px] max-md:text-sm items-center'>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className='p-1'>
                            <Image src={banner.image} alt={banner.title} height={0} width={150} className='h-12' />
                        </TableCell>
                        <TableCell>{banner.title}</TableCell>
                        <TableCell>
                            <Link href={banner.link}>
                                {banner.link}
                            </Link>
                        </TableCell>
                        <TableCell className='justify-center text-center gap-4 flex p-1 pt-2'>
                            <ModalFormEditBanner banner={banner} />
                            
                            <Button variant='outline' className="flex gap-2" onClick={() => handleDeleteBanner(banner.id)}>
                                <Trash2 size={16} />
                                <span className="max-sm:hidden">
                                    Excluir
                                </span>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
