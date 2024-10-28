"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import {
  createExperience,
  State,
  updateExperience,
} from "@/lib/actions/experience-actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../ui/button";
import { Experience } from "@/lib/definitions";
import FileUploadForm from "../upload/FileUploadForm";

export default function Form({ experience }: { experience?: Experience }) {
  const initialState = { message: null as unknown as string, errors: {} };

  const functionToCall = experience
    ? updateExperience.bind(null, experience.id)
    : createExperience;

  const [state, dispatch] = useFormState<State, FormData>(
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
            defaultValue={experience?.name}
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

        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-6  md:items-center  gap-2">
          <Label htmlFor="description" className="px-1 md:text-right">
            Descripción
          </Label>
          <Textarea
            id="description"
            name="description"
            className="col-span-5"
            aria-describedby="description-error"
            defaultValue={experience?.description}
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
        <div className="flex flex-col md:grid md:grid-cols-6 md:col-span-6  md:items-center  gap-2">
          <Label htmlFor="images" className="px-1 md:text-right">
            Imágenes
          </Label>
          <FileUploadForm objectToSearch={experience} />
          {experience && <input name="oldImages" value={experience.images} hidden />}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
}
