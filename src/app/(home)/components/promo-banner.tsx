import { ImageProps } from "next/image";
import Image from "next/image";

const PromoBanner = ({alt, ...props}: ImageProps) => {
    return (
        <Image
            height={0}
            width={0}
            className="h-auto md:max-h-[500px] w-full px-5 md:px-0"
            sizes="100vw"
            alt={alt}
            {...props}
        />);
}

export default PromoBanner;