// "use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function SearchBar() {
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: new Date(),
//     to: addDays(new Date(), 3),
//   });
  return (
    <div className=" bg-cyan-800 border-2  border-red-600  rounded-sm">
      <p className="text-lg">Fechas Entrada - Salida:</p>

      {/* <div className="grid gap-2 col-span-2">
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
                    {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                    <br className="hidden md:block lg:hidden" />
                    {format(date.to, "LLL dd, y", { locale: es })}
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
      </div> */}
      <div>
        <Button>Buscar</Button>
      </div>
    </div>
  );
}
