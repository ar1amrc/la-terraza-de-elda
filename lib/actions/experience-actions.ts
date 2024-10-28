"use server";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";
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
  const imagesNames = (images as File[]).map((image) => {
        
    return image.name
  } );

  const imagesVerified = imagesNames.some(image => image === 'undefined') ? [] : imagesNames

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

  const id = randomUUID();

  const { name, description } = validatedFields.data;

  try {
    await sql`
    INSERT INTO experiences (id, name, description, images)
        VALUES (${id}, ${name}, ${description}, ${imagesVerified})
  `;
  } catch (err) {
    return {
      message: "Database Error: Failed to Create Service.",
    };
  }

  for (const formDataEntryValue of images) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const fil = formDataEntryValue as unknown as Blob;

      const buffer = Buffer.from(await fil.arrayBuffer());
      const folderName = `public/images/experience/${id}`;

      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        }
        fs.writeFileSync(
          `public/images/experience/${id}/${formDataEntryValue.name}`,
          buffer
        );
      } catch (err) {
        console.error(err);
      }
    }
  }

  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function updateExperience(
  id: number = -1,
  prevState: State | undefined,
  formData: FormData
) {
  const images = formData.getAll("images");
  const imagesNames : string[]= (images as File[]).map((image) => image.name);
  const oldImages: string[] | undefined = formData.get('oldImages')?.toString().split(',');
 
  const imagesMerged = oldImages ? imagesNames.concat(oldImages) : (images ? imagesNames : [])

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

  try {
    await sql`
      UPDATE experiences 
      SET name = ${name}, description = ${description}, images = ${imagesMerged}
      WHERE id = ${id}
    `;
  } catch (err) {
    return {
      message: "Database Error: Failed to Create Service.",
    };
  }

  for (const formDataEntryValue of images) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const fil = formDataEntryValue as unknown as Blob;

      const buffer = Buffer.from(await fil.arrayBuffer());
      const folderName = `public/images/experience/${id}`;
      const filename = `/${formDataEntryValue.name}`

      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        }
        if (!fs.existsSync(folderName+filename)) {
          fs.writeFileSync(
            `public/images/experience/${id}/${formDataEntryValue.name}`,
            buffer
          );
        }
       
      } catch (err) {
        console.error(err);
      }
    }
  }

  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function deleteExperience(id: number) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await sql`DELETE FROM experiences WHERE id = ${id}`;
  } catch (err) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
  revalidatePath("/admin/experiences");
}
