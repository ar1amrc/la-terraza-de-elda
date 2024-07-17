"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { createRoom, State, updateRoom } from "@/lib/actions/room-actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Room } from "@/lib/definitions";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { useState } from "react";
import FileUploadForm from "./upload/FileUploadForm";

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs", disable: false },
  { label: "Vite", value: "vite" },
  { label: "Remix", value: "remix" },
  { label: "React", value: "react" },
];

export default function Form({
  services,
  room,
  ps = [],
  es = []
}: {
  services: Option[];
  room?: Room;
  ps?: Option[];
  es?: Option[];
}) {
  const initialState = { errors: {} };

  const functionToCall = room ? updateRoom.bind(null, room.id) : createRoom;
  const [primary, setPrimary] = useState<Option[]>(ps);
  const [extra, setExtra] = useState<Option[]>(es);

  const [state, dispatch] = useFormState<State | undefined, FormData>(
    functionToCall,
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="flex flex-col md:grid md:grid-cols-6 gap-4 py-4">
        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="name" className="px-1 md:text-right">
            Nombre
          </Label>
          <Input
            id="name"
            name="name"
            className="col-span-2"
            aria-describedby="name-error"
            defaultValue={room?.name}
          />
          <div
            id="name-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.name &&
              state?.errors.name.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-6 md:items-center gap-2">
          <Label
            htmlFor="description"
            className="px-1 md:text-right md:text-xs lg:text-sm"
          >
            Descripción
          </Label>
          <Textarea
            id="description"
            name="description"
            className="col-span-5"
            aria-describedby="description-error"
            defaultValue={room?.description}
          />
          <div
            id="description-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-3"
          >
            {state?.errors?.description &&
              state?.errors.description.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="price" className="px-1 md:text-right">
            Precio
          </Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            defaultValue={room?.price}
            id="price"
            name="price"
            className="col-span-2"
            aria-describedby="price-error"
          />
          <div
            id="price-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.price &&
              state?.errors.price.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label
            htmlFor="capacity"
            className="px-1 md:text-right md:text-xs lg:text-sm"
          >
            Capacidad
          </Label>
          <Input
            type="number"
            min="0"
            step="1"
            defaultValue={room?.capacity}
            id="capacity"
            name="capacity"
            className="col-span-2"
            aria-describedby="capacity-error"
          />
          <div
            id="capacity-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.capacity &&
              state?.errors.capacity.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="primaryServices" className="px-1 md:text-right">
            Servicios
          </Label>
          <Input type="hidden" name="primaryServices" value={primary.map((e) => e.value)} />
          <div className="col-span-2">
            <MultipleSelector
              value={primary}
              onChange={setPrimary}
              defaultOptions={services}
              placeholder="Seleccione...."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  No se encuentran resultados
                </p>
              }
              className="overflow-hidden"
              hidePlaceholderWhenSelected
            />
          </div>
          <div
            id="primaryServices-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.primaryServices &&
              state?.errors.primaryServices.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="extraServices" className="px-1 md:text-right">
            Servicios extra
          </Label>
          <Input type="hidden" name="extraServices" value={extra.map((e) => e.value)} />
          <div className="col-span-2">
            <MultipleSelector
              value={extra}
              onChange={setExtra}
              defaultOptions={services}
              placeholder="Seleccione..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  No se encuentran resultados
                </p>
              }
              className="overflow-hidden"
              hidePlaceholderWhenSelected
            />
          </div>
          <div
            id="extra-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.extraServices &&
              state?.errors.extraServices.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-6  md:items-center  gap-2">

        <FileUploadForm objectToSearch={room} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
}
