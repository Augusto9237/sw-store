import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormProduct } from "./form-product"

export default function ModalAddProduct() {



    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>+ Produto</Button>
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
