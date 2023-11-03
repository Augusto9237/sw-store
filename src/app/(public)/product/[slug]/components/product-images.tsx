'use client'
import Image from "next/image"
import { useState } from "react";

interface ProductImagesProps {
    name: string;
    imagesUrls: string[]
}
export default function ProductImages({ imagesUrls, name }: ProductImagesProps) {
    const [currentImage, setCurrentImage] = useState(imagesUrls[0]);

    function handleImageClick(imageUrl: string) {
        setCurrentImage(imageUrl);
    }

    return (
        <div className="flex flex-col flex-1 relative">
            <div className="bg-accent h-[380px] md:h-full md:min-h-[600px] lg:max-w-[732px] w-full items-center flex justify-center rounded-[10px]">
                <Image
                    src={currentImage}
                    alt={name}
                    height={0}
                    width={0}
                    sizes="100vh"
                    className="h-auto max-h-[70%] w-auto max-w-[90%]"
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8 px-5 md:absolute md:flex flex-col">
                {
                    imagesUrls.map(imagesUrl => (
                        <button
                            key={imagesUrl}
                            className={`bg-accent md:bg-background md:px-3 rounded-lg flex justify-center items-center h-[77px] md:max-w-[77px]
                         ${imagesUrl === currentImage && "border-2 border-solid border-primary"}
                        `}
                            onClick={() => handleImageClick(imagesUrl)}
                        >
                            <Image
                                src={imagesUrl}
                                alt={name}
                                height={0}
                                width={0}
                                sizes="100vw"
                                className="h-auto max-h-[70%] w-auto max-w-[90%]"
                            />
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
