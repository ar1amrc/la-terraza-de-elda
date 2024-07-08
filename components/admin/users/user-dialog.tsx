"use client";

import { useFormState } from "react-dom";
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
import { State, createUser, updateUser } from "@/lib/actions";
import { User } from "@/lib/definitions";

import { PencilIcon, PlusIcon } from "lucide-react";

export default function UserDialog({
  user,
  edit = false,
}: {
  user?: User;
  edit?: boolean;
}) {
//   const updateUserWithId = updateUser.bind(null, user.id);
  const functionToCall = edit ? updateUser.bind(null, user?.id) : createUser;
  const initialState = { errors: {} };

  const [state, dispatch] = useFormState<State | undefined, FormData>(
    functionToCall,
    initialState
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {edit ? (
          <Button variant="outline" size="sm">
            <PencilIcon />
          </Button>
        ) : (
          <Button className="bg-teal-800" size="sm">
            <PlusIcon />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{edit ? "Editar usuario" : "Nuevo usuario"}</DialogTitle>
          {edit && (
            <DialogDescription>
              Haz cambios al usuario. Click en guardar cuando esté listo
            </DialogDescription>
          )}
        </DialogHeader>
        <form action={dispatch}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={user?.name}
                className="col-span-3"
                aria-describedby="name-error"
              />
              <div
                id="name-error"
                aria-live="polite"
                aria-atomic="true"
                className="col-start-2 col-span-3"
              >
                {state?.errors?.name &&
                  state?.errors.name.map((error: string) => (
                    <p className="text-xs text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="username" className="text-right">
                Usuario
              </Label>
              <Input
                id="username"
                name="username"
                defaultValue={user?.username}
                className="col-span-3"
                aria-describedby="username-error"
              />
              <div
                id="username-error"
                aria-live="polite"
                aria-atomic="true"
                className="col-start-2 col-span-3"
              >
                {state?.errors?.username &&
                  state?.errors.username.map((error: string) => (
                    <p className="text-xs text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                defaultValue={user?.email}
                className="col-span-3"
                aria-describedby="email-error"
              />
              <div
                id="email-error"
                aria-live="polite"
                aria-atomic="true"
                className="col-start-2 col-span-3"
              >
                {state?.errors?.email &&
                  state?.errors.email.map((error: string) => (
                    <p className="text-xs text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="password" className="text-right">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                defaultValue={user?.password}
                className="col-span-3"
                aria-describedby="password-error"
              />
              <div
                id="password-error"
                aria-live="polite"
                aria-atomic="true"
                className="col-start-2 col-span-3"
              >
                {state?.errors?.password &&
                  state?.errors.password.map((error: string) => (
                    <p className="text-xs text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="confirmPassword" className="text-right">
                Repetir Contraseña
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                defaultValue={user?.password}
                className="col-span-3"
                aria-describedby="confirmPassword-error"
              />
              <div
                id="confirmPassword-error"
                aria-live="polite"
                aria-atomic="true"
                className="col-start-2 col-span-3"
              >
                {state?.errors?.confirmPassword &&
                  state?.errors.confirmPassword.map((error: string) => (
                    <p className="text-xs text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button  className="bg-teal-800"  type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
