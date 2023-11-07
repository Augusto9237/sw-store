import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { FormProduct } from "./form-product"
import { Plus} from "lucide-react"


export default function ModalAddProduct() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="uppercase font-bold flex items-center gap-2">
                    <Plus  size={16} />
                    Produto
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Produto</DialogTitle>
                    <DialogDescription>
                     <FormProduct/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
