"use server";

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
  extraServices: z.string().array().optional(),
});

const RoomCreate = RoomSchema.omit({ id: true });

export type State = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
    capacity?: string[];
    primaryServices?: string[];
    extraServices?: string[];
  };
  message?: string | null;
};

export async function createRoom(
  prevState: State | undefined,
  formData: FormData
) {
  const images = formData.getAll("images");

  const validatedFields = RoomCreate.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    capacity: parseInt(formData.get("capacity") as string),
    primaryServices: formData.get("primaryServices")
      ? (formData.get("primaryServices") as string)?.split(",")
      : [],
    extraServices: (formData.get("extraServices") as string)?.split(","),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltantes. Error al crear Servicio",
    };
  }

  const { name, description, price } = validatedFields.data;

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
            `public/images/experiencies/${name}/${formDataEntryValue.name}`,
            buffer
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  revalidatePath("/admin/rooms");
}

export async function updateRoom(
  id: number = -1,
  prevState: State | undefined,
  formData: FormData
) {
  console.log(formData);

  const priceFD = formData.get("price")
    ? parseFloat(formData.get("price") as string)
    : undefined;

  const validatedFields = RoomCreate.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: priceFD,
    icon: formData.get("icon"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltantes. Error al crear Servicio",
    };
  }

  const { name, description, price } = validatedFields.data;
  revalidatePath("/admin/rooms");
  //  redirect("/admin/Rooms");
}

export async function deleteRoom(id: number) {
  // throw new Error("Failed to Delete Invoice");
  try {
    // await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (err) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
  revalidatePath("/admin/rooms");
}

export async function changeThumbnail(id: number | string, image?: string) {
  console.log(image);
  revalidatePath("/admin/rooms");

}
