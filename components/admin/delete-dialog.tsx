import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export function DeleteDialog({
  action,
  id,
  fromMenu = false,
}: {
  action: any;
  id: string | number;
  fromMenu?: boolean; // true if it's called from menu, false if it's called from item
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {fromMenu ?  <p className="cursor-pointer w-full">Eliminar</p> : <Button  size='sm' variant="outline">
          <Trash2Icon />
        </Button> }
      
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará el elemento de los servidores y no se puede deshacer
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction  asChild>
            <form action={action.bind(null, id)}>
              <Button > Eliminar</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
