import { ArrowBigDown } from "lucide-react";
import { Badge,BadgeProps } from "./badge";
import { twMerge } from "tailwind-merge";

export default function DiscountBadge({ children, className, ...props }: BadgeProps) {
    return (
        <Badge className={twMerge("px-2 py-[2px]", className)} {...props}>
            <ArrowBigDown size={14} /> {children}%
        </Badge>
    )
}
