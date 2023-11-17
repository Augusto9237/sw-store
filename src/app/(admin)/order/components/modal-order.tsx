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
import { GanttChartSquare } from "lucide-react";
import { useState } from "react";


export default function ModalOrder() {
    const [isOpen, setIsOpen] = useState(false);
  return (
      <Dialog modal={isOpen}>
          <DialogTrigger asChild onClick={() => setIsOpen(true)}>
             <Button variant='secondary' size='icon'>
                  <GanttChartSquare size={16} />
             </Button>
          </DialogTrigger>

          {isOpen && (
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle className="text-center">Pedido</DialogTitle>
                  </DialogHeader>
              </DialogContent>
          )}
      </Dialog>
  )
}
