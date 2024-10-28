"use server";

import { sql } from "@vercel/postgres";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const RoomSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  price: z
    .number({
      required_error: "Precio es requerido",
      invalid_type_error: "Debe poner un precio válido",
    })
    .min(0, { message: "El precio no puede ser negativo" }),
  capacity: z
    .number({
      required_error: "Capacidad es requerida",
      invalid_type_error: "Debe poner una capacidad válida",
    })
    .min(0, { message: "La capacidad no puede ser negativo" }),
  primaryServices: z
    .string({
      required_error: "Servicios es requerido",
      invalid_type_error: "Debe poner un servicio válido",
    })
    .array()
    .min(1, { message: "Debe seleccionar al menos un servicio" }),
  // extraServices: z.string().array().optional(),
});

const RoomCreate = RoomSchema.omit({ id: true });

export type State = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
    capacity?: string[];
    primaryServices?: string[];
    // extraServices?: string[];
  };
  message?: string | null;
};

export async function createRoom(
  prevState: State | undefined,
  formData: FormData
) {
  const images = formData.getAll("images");
  const imagesNames = (images as File[]).map((image) => image.name);
  const imagesVerified = imagesNames.some((image) => image === "undefined")
    ? []
    : imagesNames;

  const validatedFields = RoomCreate.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    capacity: parseInt(formData.get("capacity") as string),
    primaryServices: formData.get("primaryServices")
      ? (formData.get("primaryServices") as string)?.split(",")
      : [],
    // extraServices: (formData.get("extraServices") as string)?.split(","),
  });
  const idSQL = await sql`SELECT MAX("id") FROM rooms;`;
  const id = idSQL.rows[0].max + 1;

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltantes. Error al crear Servicio",
    };
  }

  const { name, description, price, capacity, primaryServices } =
    validatedFields.data;

  try {
    const ps = primaryServices.map((service) => {
      return sql`INSERT INTO roomservice (room_id, service_id) VALUES (${id}, ${service})`;
    });

    await sql`
  INSERT INTO rooms ( id, name, description, price, capacity, images)
      VALUES ( ${id}, ${name}, ${description}, ${price}, ${capacity}, ${imagesVerified})
`;
    await Promise.all(ps);
  } catch (err) {
    console.error(err);
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
      const folderName = `public/images/room/${id}`;

      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        } else {
          fs.writeFileSync(
            `public/images/room/${id}/${formDataEntryValue.name}`,
            buffer
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  revalidatePath("/admin/rooms");
  redirect("/admin/rooms");
}

export async function updateRoom(
  id: number = -1,
  prevState: State | undefined,
  formData: FormData
) {
  const images = formData.getAll("images");
  const imagesNames: string[] = (images as File[]).map((image) => image.name);
  const oldImages: string[] | undefined = formData
    .get("oldImages")
    ?.toString()
    .split(",");

  const imagesMerged = oldImages
    ? imagesNames.concat(oldImages)
    : images
    ? imagesNames
    : [];

  const validatedFields = RoomCreate.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    capacity: parseInt(formData.get("capacity") as string),
    primaryServices: formData.get("primaryServices")
      ? (formData.get("primaryServices") as string)?.split(",")
      : [],
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltantes. Error al crear Servicio",
    };
  }

  const { name, description, price, capacity, primaryServices } = validatedFields.data;

  try {
    await sql`DELETE FROM roomservice WHERE room_id = ${id}`

    const update = sql`
      UPDATE rooms 
      SET name = ${name}, description = ${description}, price = ${price}, capacity = ${capacity}, images = ${imagesMerged}
      WHERE id = ${id}
    `;

    const ps = primaryServices.map((service) => {
      return sql`INSERT INTO roomservice (room_id, service_id) VALUES (${id}, ${service})`;
    });
    
    const data = await Promise.all([ update, ...ps])
  } catch (err) {
    console.error(err);
    return {
      message: "Database Error: Failed to Create Service.",
    };
  }

  revalidatePath("/admin/rooms");
  redirect("/admin/rooms");
}

export async function deleteRoom(id: number) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await sql`DELETE FROM roomservice WHERE room_id = ${id}`;
    await sql`DELETE FROM rooms WHERE id = ${id}`;
  } catch (err) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
  revalidatePath("/admin/rooms");
}

export async function changeThumbnail(id: number | string, image?: string) {
  try {   
    await sql`
      UPDATE rooms 
      SET thumbnail = ${image}
      WHERE id = ${id}
    `;
  } catch (err) {
    return {
      message: "Database Error: Failed to Create Service.",
    };
  }
  revalidatePath("/admin/rooms");
}
