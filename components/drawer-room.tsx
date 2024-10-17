"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { es } from "date-fns/locale";
import { Room } from "@/lib/definitions";

export default function DrawerRoom({ room }: { room: Room }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">Reservar</Button>
      </DrawerTrigger>
      <DrawerContent className="h-3/4">
        <DrawerHeader className="flex flex-col items-center justify-center">
          <DrawerTitle>Reservar {room.name}</DrawerTitle>
          <DrawerDescription>
            Seleccione las fechas a reservar
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-center flex-1 overflow-y-auto md:pt-5">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            locale={es}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(date) => {
              const yesterday = new Date();
              yesterday.setDate(new Date().getDate() - 1);
              return date < yesterday;
            }}
          />
        </div>
        <DrawerFooter className="flex flex-row justify-center items-center">
          <Button variant="default" size="lg">
            Reservar
          </Button>
          <DrawerClose>
            <Button variant="outline" size="lg">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
