'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { GanttChartSquare, Pencil } from "lucide-react";
import { useState } from "react";


export default function ModalEditOrder() {
    const [isOpen, setIsOpen] = useState(false);
  return (
      <Dialog modal={isOpen}>
          <DialogTrigger asChild onClick={() => setIsOpen(true)}>
              <Button variant='save' size='icon'>
                  <Pencil size={16} />
              </Button>
          </DialogTrigger>

          {isOpen && (
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle className="text-center">Editar Pedido</DialogTitle>
                  </DialogHeader>
              </DialogContent>
          )}
      </Dialog>
  )
}
