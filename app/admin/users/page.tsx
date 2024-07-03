import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Users } from "@/lib/mocks";
import { CircleXIcon, PencilIcon, PlusIcon } from "lucide-react";
import  UserDialog  from "./user-dialog";

export default function Page() {
  const users = Users;

  return (
    <Table>
      <TableCaption>Lista de usuarios del sistema </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Nombre</TableHead>
          <TableHead className="font-bold">Email</TableHead>
          <TableHead className="font-bold">Usuario</TableHead>
          <TableHead className="font-bold">Contraseña</TableHead>
          <TableHead className="font-bold text-center w-[100px]">
            <div className="flex gap-2 items-center">
              <p>Acciones</p>

              <UserDialog />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell className="tex">
              <input type="password" value={user.password} disabled />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-between">
               
                      <UserDialog user={user} edit/>
                    

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <CircleXIcon></CircleXIcon>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eliminar usuario</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
