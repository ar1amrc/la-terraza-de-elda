import { Button } from "@/components/ui/button";
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
import { Trash2Icon } from "lucide-react";
import UserDialog from "@/components/admin/users/user-dialog";
import { deleteUser } from "@/lib/actions/user-actions";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { getUsers } from "@/lib/data";

export default async function Page() {
  const users = await getUsers();

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
              <div className="flex gap-2">
                <UserDialog user={user} edit />
                <DeleteDialog action={deleteUser} id={user.id} />
                {/* <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <form action={deleteUser.bind(null, user?.id)}>
                        <Button variant="outline">
                          <Trash2Icon />
                        </Button>
                      </form>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eliminar usuario</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
