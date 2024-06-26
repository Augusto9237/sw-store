'use client'
import { useRef, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"


import banner1 from "../../public/Banner-home-01.png"
import banner2 from "../../public/Banner-home-02.png"
import banner3 from "../../public/Banner-home-03.png"
import PromoBanner from "@/app/(public)/(home)/components/promo-banner";

export default function CarouselPromo() {
    const [promos, setPromos] = useState([banner1, banner2, banner3])
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
                        <PromoBanner
                            src={promo}
                            alt="promo"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>


            <CarouselPrevious className="left-4 opacity-20 hover:opacity-50" />
            <CarouselNext className="right-4 opacity-20 hover:opacity-50" />


        </Carousel>
    )
}