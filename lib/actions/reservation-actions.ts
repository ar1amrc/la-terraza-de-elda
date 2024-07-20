"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ReservationSchema = z.object({
  id: z.number(),
  roomId: z.number(),
  userId: z.number().optional(),
  startDate: z.date(),
  endDate: z.date(),
  guests: z.number(),
  guestsData: z.string().min(5),
  amount: z.number(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
  experiences: z.array(z.number()).optional(),
  email: z.string().email().optional(),
});

const ReservationCreate = ReservationSchema.omit({ id: true });

export type State = {
  errors: {
    roomId?: string[];
    userId?: string[];
    startDate?: string[];
    endDate?: string[];
    guests?: string[];
    guestsData?: string[];
    amount?: string[];
    status?: string[];
    experiences?: string[];
    email?: string[];
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

  const { guests } = validatedFields.data;
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

  const {guests } = validatedFields.data;
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