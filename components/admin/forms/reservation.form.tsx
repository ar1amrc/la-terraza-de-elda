"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";
import { Experience, Reservation, Room } from "@/lib/definitions";
import {
  createReservation,
  State,
  updateReservation,
} from "@/lib/actions/reservation-actions";

export default function Form({
  reservation,
  rooms,
  experiences,
}: {
  reservation?: Reservation;
  rooms: Room[];
  experiences: Experience[];
}) {
  const initialState = { errors: {} };

  const functionToCall = reservation
    ? updateReservation.bind(null, reservation.id)
    : createReservation;

  const [state, dispatch] = useFormState<State | undefined, FormData>(
    functionToCall,
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="flex flex-col md:grid md:grid-cols-6 gap-4 py-4">
        <div className="flex flex-col md:grid md:grid-cols-4 md:col-span-4 md:items-center gap-2">
          <Label htmlFor="name" className="px-1 md:text-right">
            Nombre
          </Label>
          <Input
            id="name"
            name="name"
            className="col-span-3"
            aria-describedby="name-error"
            defaultValue={reservation?.guestsData}
          />
          {/* <div
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
          </div> */}
        </div>

        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-6 md:items-center  gap-2">
          <Label htmlFor="description" className="px-1 md:text-right">
            Descripción
          </Label>
          <Textarea
            id="description"
            name="description"
            className="col-span-5"
            aria-describedby="description-error"
            defaultValue={reservation?.email}
          />
          {/* <div
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
          </div> */}
        </div>

        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-2 md:items-center gap-2">
          <Label htmlFor="price" className="px-1 md:text-right md:col-span-2">
            Precio
          </Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            defaultValue={reservation?.amount}
            id="price"
            name="price"
            className="col-span-4 col-start-3"
            aria-describedby="price-error"
          />
          {/* <div
            id="price-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-3 col-span-3"
          >
            {state?.errors?.price &&
              state?.errors.price.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
}
