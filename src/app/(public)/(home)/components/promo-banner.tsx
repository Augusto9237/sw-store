import { ImageProps } from "next/image";
import Image from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
    return (
        <div className="overflow-hidden px-5 h-full max-h-fit w-full md:px-0">
            <Image
                height={0}
                width={0}
                className="h-full md:max-h-[600px] w-full max-md:rounded-[10px]"
                sizes="100vw"
                alt={alt}
                {...props}
            />
        </div>
    );
}

export default PromoBanner;