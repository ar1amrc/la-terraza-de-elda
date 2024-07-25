"use server";
import fs from "fs";

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
  const images = formData.getAll("images");

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

  for (const formDataEntryValue of images) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const fil = formDataEntryValue as unknown as Blob;

      const buffer = Buffer.from(await fil.arrayBuffer());
      const folderName = `public/images/experience/${name}`;
      
      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        } else {
          fs.writeFileSync(
            `public/images/experiences/${name}/${formDataEntryValue.name}`,
            buffer
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  revalidatePath("/admin/experiences");
}

export async function updateExperience(
  id: number = -1,
  prevState: State | undefined,
  formData: FormData
) {

  const priceFD = formData.get("price")
    ? parseFloat(formData.get("price") as string)
    : undefined;

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
  revalidatePath("/admin/experiences");
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
  revalidatePath("/admin/experiences");
}
