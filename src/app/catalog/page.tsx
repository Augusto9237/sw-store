import { Badge } from "@/components/ui/badge";
import { ShapesIcon } from "lucide-react";

const CatalogPage = () => {
    return (
        <div className="p-5">
            <Badge
                className="gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                variant='outline'
            >
                <ShapesIcon size={16} />
                Catalogo
            </Badge>
        </div>
    )
}

export default CatalogPage;