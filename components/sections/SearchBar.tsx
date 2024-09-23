"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { search } from "@/lib/actions/search-actions";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, SearchIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function SearchBar({ className, nav = false }: { className?: string, nav?: boolean }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });


  return (
    <div className={className ??
      "grid grid-cols-6 gap-2 w-11/12 md:w-4/6 h-20 -mt-4 rounded-sm bg-white drop-shadow-lg z-10 px-1 "}>
      <form
        action={search}
        className="grid grid-cols-6 gap-2 items-center justify-center  col-span-6"
      >
        <div className="col-span-4">
          <div className="flex flex-col justify-between">
            {!nav &&
            <div className="flex items-center justify-around">
              <span>Entrada</span>

              <span>Salida</span>
            </div>

            }

            <div className="grid gap-2 col-span-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "justify-between  font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <div className="flex flex-1 items-center justify-around">
                          <span>
                            {" "}
                            {format(date.from, "LLL dd, y", { locale: es })}
                          </span>
                          <span> - </span>
                          <br className="hidden md:block lg:hidden" />
                          <span>
                            {format(date.to, "LLL dd, y", { locale: es })}
                          </span>
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
              <Input type="hidden" name="date" value={JSON.stringify(date)} />
            </div>
          </div>
        </div>
        <div className="flex  flex-1 flex-col items-center justify-center h-16 gap-1  ">
          <Label htmlFor="guests" className="pt-1 md:text-right">
            <span className="block sm:hidden">
              <UsersIcon className="h-4 w-4" />
            </span>
           {!nav && <span className="hidden sm:block">Huespédes</span> } 
          </Label>
          <Input
            type="number"
            min="1"
            max={6}
            step="1"
            defaultValue={1}
            id="guests"
            name="guests"
            aria-describedby="guests-error"
          />
        </div>
        <div className=" flex flex-col h-full py-2.5 justify-end sm:m-auto ">
          <Button>
            <span className="block sm:hidden">
              <SearchIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Buscar</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
