"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ReservationSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  price: z.optional(z.number().min(0, { message: "El precio no puede ser negativo" })),
  icon: z.string().optional(),
  // categoryId: z.number().min(1, { message: "Debe seleccionar una categoría" }),
  // isActive: z.boolean(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
  // Add any other required fields here
});

const ReservationCreate = ReservationSchema.omit({ id: true });

export type State = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
  };
  message?: string | null;
};

export async function createReservation(
  prevState: State | undefined,
  formData: FormData
) {

  const validatedFields = ReservationCreate.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    icon: formData.get("icon")
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltantes. Error al crear Servicio",
    };
  }

  const { name, description, price, icon } = validatedFields.data;
  revalidatePath("/admin/reservations");
}


export async function updateReservation(
  id: number = -1,
  prevState: State | undefined,
  formData: FormData
) {

console.log(formData);


  const priceFD = formData.get("price") ? parseFloat(formData.get("price") as string) : undefined ;

  const validatedFields = ReservationCreate.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: priceFD,
    icon: formData.get("icon")
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltantes. Error al crear Servicio",
    };
  }

  const { name, description, price, icon } = validatedFields.data;
  revalidatePath("/admin/reservations");
//  redirect("/admin/reservations");
}

export async function deleteReservation(id: number) {
  
 // throw new Error("Failed to Delete Invoice");
  try {
    // await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (err) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
  revalidatePath("/admin/reservations");
}