import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormCategory } from "./form-category"

export default function ModalAddCategory() {
    


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>+ Categoria</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Categoria</DialogTitle>
                    <DialogDescription>
                     <FormCategory/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
