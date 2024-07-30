"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";
import { Reservation, Room } from "@/lib/definitions";
import {
  createReservation,
  State,
  updateReservation,
} from "@/lib/actions/reservation-actions";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Form({
  reservation,
  rooms,
  experiences,
  services,
  extra = [],
  exp = [],
}: {
  reservation?: Reservation;
  rooms: Room[];
  experiences: Option[];
  services: Option[];
  extra?: Option[];
  exp?: Option[];
}) {
  const initialState = { errors: {} };

  const [extraServices, setExtraServices] = useState<Option[]>(extra);
  const [experiencesSelected, setExperiencesSelected] = useState<Option[]>(exp);
  const [date, setDate] = useState<DateRange | undefined>({
    from: reservation?.startDate ? new Date(reservation.startDate) : new Date(),
    to: reservation?.endDate ? new Date(reservation.endDate) : addDays(new Date(), 3),
  });

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
        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-6 md:items-center  gap-2">
          <Label htmlFor="guestsData" className="px-1 md:text-right">
            Datos de reserva
          </Label>
          <Textarea
            id="guestsData"
            name="guestsData"
            className="col-span-5"
            aria-describedby="guestsData-error"
            defaultValue={reservation?.guestsData}
            placeholder="Datos de los huéspedes (nombre, contacto, documento de identificación, etc)"
          />
          <div
            id="guestsData-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-4"
          >
            {state?.errors?.guestsData &&
              state?.errors.guestsData.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="email" className="px-1 md:text-right">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            className="col-span-2"
            aria-describedby="email-error"
            defaultValue={reservation?.email}
          />
          <div
            id="email-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.email &&
              state?.errors.email.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="date" className="px-1 md:text-right">
            Fechas
          </Label>
          <Input
            type="hidden"
            name="date"
            value={JSON.stringify(date)}
          />
          <div className="grid gap-2 col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <div>
                        {format(date.from, "LLL dd, y", {locale: es})} -{" "}
                      <br className="hidden md:block lg:hidden" />
                        {format(date.to, "LLL dd, y", {locale: es})}
                      </div>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Seleccione las fechas</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  disabled={(date) => {
                    const yesterday = new Date();
                    yesterday.setDate(new Date().getDate() - 1);
                    return date < yesterday;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div
            id="email-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.email &&
              state?.errors.email.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="status" className="px-1 md:text-right">
            Habitación
          </Label>
          <div className="col-span-2">
            <Select name="room" defaultValue={reservation?.roomId.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {rooms.map((room: Room) => (
                    <SelectItem key={room.id} value={room.id.toString()}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div
            id="status-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.status &&
              state?.errors.status.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="status" className="px-1 md:text-right">
            Status
          </Label>
          <div className="col-span-2">
            <Select name="status"  defaultValue={reservation?.status}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="confirmed">Confirmada</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div
            id="status-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.status &&
              state?.errors.status.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="guests" className="px-1 md:text-right">
            Huespédes
          </Label>
          <Input
            type="number"
            min="1"
            max={6}
            step="1"
            defaultValue={reservation?.guests ?? 1}
            id="guests"
            name="guests"
            className="col-span-2"
            aria-describedby="guests-error"
          />
          <div
            id="guests-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.guests &&
              state?.errors.guests.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="amount" className="px-1 md:text-right">
            Precio
          </Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            defaultValue={reservation?.amount ?? 0}
            id="amount"
            name="amount"
            className="col-span-2"
            aria-describedby="amount-error"
          />
          <div
            id="amount-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.amount &&
              state?.errors.amount.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-6 md:items-center  gap-2">
          <Label htmlFor="additionalData" className="px-1 md:text-right">
            Observaciones
          </Label>
          <Textarea
            id="additionalData"
            name="additionalData"
            className="col-span-5"
            aria-describedby="additionalData-error"
            defaultValue={reservation?.guestsData}
            placeholder="Cualquier dato adicional sobre la reserva (alergias, vegano, petición especial, etc.)"
          />
          <div
            id="additionalData-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-4"
          >
            {state?.errors?.additionalData &&
              state?.errors.additionalData.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="extraServices" className="px-1 md:text-right">
            Servicios
          </Label>
          <Input
            type="hidden"
            name="extraServices"
            value={extraServices.map((e) => e.value)}
          />
          <div className="col-span-2">
            <MultipleSelector
              value={extraServices}
              onChange={setExtraServices}
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
            id="extraServices-error"
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

        <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-3 md:items-center gap-2">
          <Label htmlFor="experiences" className="px-1 md:text-right">
            Experiencias
          </Label>
          <Input
            type="hidden"
            name="experiences"
            value={extraServices.map((e) => e.value)}
          />
          <div className="col-span-2">
            <MultipleSelector
              value={experiencesSelected}
              onChange={setExperiencesSelected}
              defaultOptions={experiences}
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
            id="experiences-error"
            aria-live="polite"
            aria-atomic="true"
            className="col-start-2 col-span-2"
          >
            {state?.errors?.experiences &&
              state?.errors.experiences.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
}
