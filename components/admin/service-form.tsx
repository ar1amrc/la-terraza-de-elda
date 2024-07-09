"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { createService, State } from "@/lib/actions/service-actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import {
  AirVent,
  Car,
  CreditCard,
  Fan,
  Phone,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Wifi,
} from "lucide-react";
import { MouseEvent, SyntheticEvent, useState } from "react";

const iconsList = {
  wifi: <Wifi />,
  phone: <Phone />,
  air: <AirVent />,
  fan: <Fan />,
  plane: <Plane />,
  "plane-landing": <PlaneLanding />,
  "plane-takeoff": <PlaneTakeoff />,
  "credit-card": <CreditCard />,
  car: <Car />,
};

export default function Form() {
  const initialState = { errors: {} };
  const [icon, setIcon] = useState("");

  const [state, dispatch] = useFormState<State | undefined, FormData>(
    createService,
    initialState
  );
  function handleClick(keys: string) {
    const buttons = document.getElementsByClassName("selected");
    if (buttons.length > 0) {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove(
          "bg-teal-600",
          "opacity-80",
          "pointer-events-none",
          "selected"
        );
      }
    }
    const button = document.getElementById(keys);
    if (button) {
      button.classList.add(
        "bg-teal-600",
        "opacity-80",
        "pointer-events-none",
        "selected"
      );
    }
    setIcon(keys);
  }

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
          />
          <div id="name-error" aria-live="polite" aria-atomic="true"  className="col-start-2 col-span-3">
            {state?.errors?.name &&
              state?.errors.name.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-6 md:order-3  gap-2">
          <Label htmlFor="description" className="px-1 md:text-right">
            Descripción
          </Label>
          <Textarea
            id="description"
            name="description"
            className="col-span-5"
            aria-describedby="description-error"
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
            id="price"
            name="price"
            className="col-span-4 col-start-3"
            aria-describedby="email-error"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true"  className="col-start-3 col-span-3">
            {state?.errors?.price &&
              state?.errors.price.map((error: string) => (
                <p className="text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col md:grid md:col-span-6 md:grid-cols-6 md:order-4 gap-2">
          <Label htmlFor="icon" className="px-1 md:text-right">
            Ícono
          </Label>
          <Input type="hidden" name="icon" value={icon} />
          <div className="flex flex-wrap gap-2 col-start-2 col-span-5">
            {Object.entries(iconsList).map(([elKey, value], index) => (
              <Button
                onClick={() => handleClick(elKey)}
                variant="outline"
                type="button"
                key={index}
                id={elKey}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="bg-teal-800" type="submit">
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}
