'use client'
import { useRef, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import PromoBanner from "@/app/(public)/(home)/components/promo-banner";
import { Banner } from "@prisma/client";
import Link from "next/link";


interface CarouselProps {
    banner: Banner[]
}

export default function CarouselPromo({ banner }: CarouselProps) {
    const [promos, setPromos] = useState<CarouselProps['banner']>(banner)
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[
                plugin.current,
                Autoplay({
                    delay: 8000,
                }),
            ]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {promos.map((promo, index) => (
                    <CarouselItem key={index}>
                        <Link href={promo.link}>
                            <PromoBanner
                                src={promo.image}
                                alt="promo"
                            />
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>


            <CarouselPrevious className="left-4 opacity-20 hover:opacity-50" />
            <CarouselNext className="right-4 opacity-20 hover:opacity-50" />


        </Carousel>
    )
}