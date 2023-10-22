import { ComponentProps } from "react";

const SectionTitle = ({ children, ...props }: ComponentProps<"p">) => {
    return (
        <p className="pl-5 mb-3 font-bold uppercase" {...props}>
            {children}
        </p>
    );
}

export default SectionTitle;