"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ExperienceSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
});

const ExperienceCreate = ExperienceSchema.omit({ id: true });

export type State = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
  };
  message?: string | null;
};

export async function createExperience(
  prevState: State | undefined,
  formData: FormData
) {

  const validatedFields = ExperienceCreate.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltantes. Error al crear Servicio",
    };
  }

  const { name, description } = validatedFields.data;
  revalidatePath("/admin/experiencies");
}


export async function updateExperience(
  id: number = -1,
  prevState: State | undefined,
  formData: FormData
) {

console.log(formData);


  const priceFD = formData.get("price") ? parseFloat(formData.get("price") as string) : undefined ;

  const validatedFields = ExperienceCreate.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltantes. Error al crear Servicio",
    };
  }

  const { name, description} = validatedFields.data;
  revalidatePath("/admin/experiencies");
//  redirect("/admin/Experiences");
}

export async function deleteExperience(id: number) {
  
 // throw new Error("Failed to Delete Invoice");
  try {
    // await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (err) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
  revalidatePath("/admin/experiencies");
}