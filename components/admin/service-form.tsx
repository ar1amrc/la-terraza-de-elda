"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import {
  createService,
  State,
  updateService,
} from "@/lib/actions/service-actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { iconsList } from "../icons/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Service } from "@/lib/definitions";

export default function Form({ service }: { service?: Service }) {
  const initialState = { errors: {} };
  const [icon, setIcon] = useState(service?.icon);

  const functionToCall = service
    ? updateService.bind(null, service.id)
    : createService;

  const [state, dispatch] = useFormState<State | undefined, FormData>(
    functionToCall,
    initialState
  );

  useEffect(() => {
    if (icon) {
      const buttons = document.getElementsByClassName("selected");
      if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove(
            "bg-cyan-700",
            "opacity-80",
            "pointer-events-none",
            "selected"
          );
        }
      }
      const button = document.getElementById(icon);
      if (button) {
        button.classList.add(
          "bg-cyan-700",
          "opacity-80",
          "pointer-events-none",
          "selected"
        );
      }
    }
  }, [icon]);
  
  // function handleClick(keys: string) {
  //   const buttons = document.getElementsByClassName("selected");
  //   if (buttons.length > 0) {
  //     for (let i = 0; i < buttons.length; i++) {
  //       buttons[i].classList.remove(
  //         "bg-cyan-700",
  //         "opacity-80",
  //         "pointer-events-none",
  //         "selected"
  //       );
  //     }
  //   }
  //   const button = document.getElementById(keys);
  //   if (button) {
  //     button.classList.add(
  //       "bg-cyan-700",
  //       "opacity-80",
  //       "pointer-events-none",
  //       "selected"
  //     );
  //   }
  //   setIcon(keys);
  // }

  return (
    <form action={dispatch}>
      <div className="flex flex-col md:grid md:grid-cols-6 gap-4 py-4">
        <div className="flex flex-col md:grid md:grid-cols-4 md:col-span-4 md:items-center md:order-1 gap-2">
          <Label htmlFor="name" className="px-1 md:text-right">
            Nombre
          </Label>
          <Input
            id="name"
            name="name"
            className="col-span-3"
            aria-describedby="name-error"
            defaultValue={service?.name}
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

        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-6 md:order-3 md:items-center  gap-2">
          <Label htmlFor="description" className="px-1 md:text-right">
            Descripción
          </Label>
          <Textarea
            id="description"
            name="description"
            className="col-span-5"
            aria-describedby="description-error"
            defaultValue={service?.description}
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

        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-2 md:items-center md:order-2 gap-2">
          <Label htmlFor="price" className="px-1 md:text-right md:col-span-2">
            Precio
          </Label>
          <Input
            type="number"
            min="0"
            
            step="0.01"
            defaultValue={service?.price}
            id="price"
            name="price"
            className="col-span-4 col-start-3"
            aria-describedby="price-error"
          />
          <div
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
          </div>
        </div>

        <div className="flex flex-col md:grid md:col-span-6 md:grid-cols-6 md:items-center md:order-4 gap-2">
          <Label htmlFor="icon" className="px-1 md:text-right">
            Ícono
          </Label>
          <Input type="hidden" name="icon" value={icon} />
          <div className="flex flex-wrap gap-2 col-start-2 col-span-5">
            {Object.entries(iconsList).map(([elKey, value], index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setIcon(elKey)}
                      variant="outline"
                      type="button"
                      id={elKey}
                    >
                      {value}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{elKey}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
