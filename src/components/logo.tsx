import Image from "next/image";


export default function Logo() {
    return (
        <Image
            src="/logo2.png"
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-32 max-sm:w-28 h-auto object-cover"
        />
    )
}
