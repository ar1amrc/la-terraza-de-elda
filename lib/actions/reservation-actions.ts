"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ReservationSchema = z.object({
  id: z.number(),
  guestsData: z.string().min(5, "Este campo debe tener al menos 5 caracteres"),
  email: z
    .string()
    .email({
      message: "El email es incorrecto",
    })
    .optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  roomId: z.number({
    required_error: "Debe seleccionar una habitación",
    message: "Debe seleccionar una habitación correcta",
  }),
  status: z.enum(["pending", "confirmed", "cancelled"], {
    invalid_type_error: "Debe seleccionar un valor correcto",
    message: "Debe seleccionar un valor correcto",
    required_error: "Debe seleccionar un status",
  }),
  guests: z.number().min(1, "El valor debe ser mayor a 1"),
  amount: z.number().min(1, "El valor debe ser mayor a 1"),
  additionalData: z.string().optional(),
  extraServices: z
    .string({
      invalid_type_error: "Debe poner un servicio válido",
    })
    .array()
    .optional(),
  experiences: z
    .string({
      invalid_type_error: "Debe poner una experiencia válida",
    })
    .array()
    .optional(),
  userId: z.number().optional(),
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
    extraServices?: string[];
    additionalData?: string[];
  };
  message?: string | null;
};

export async function createReservation(
  prevState: State | undefined,
  formData: FormData
) {
  const date = JSON.parse(formData.get("date") as string);

  const validatedFields = ReservationCreate.safeParse({
    guestsData: formData.get("guestsData"),
    email: formData.get("email") != "" ? formData.get("email") : undefined,
    startDate: date.from ?? new Date(date.from),
    endDate: date.to ?? new Date(),
    roomId: parseInt(formData.get("room") as string),
    status: formData.get("status"),
    guests: parseInt(formData.get("guests") as string),
    amount: parseInt(formData.get("amount") as string),
    additionalData: formData.get("additionalData"),
    extraServices: (formData.get("extraServices") as string)?.split(","),
    experiences: (formData.get("experiences") as string)?.split(","),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltantes. Error al crear Servicio",
    };
  }

  const {
    guestsData,
    email,
    startDate,
    endDate,
    roomId,
    status,
    guests,
    amount,
    additionalData,
    extraServices,
    experiences,
  } = validatedFields.data;
  revalidatePath("/admin/reservations");
}

export async function updateReservation(
  id: number = -1,
  prevState: State | undefined,
  formData: FormData
) {

  const priceFD = formData.get("price")
    ? parseFloat(formData.get("price") as string)
    : undefined;

  const validatedFields = ReservationCreate.safeParse({
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

  const { guests } = validatedFields.data;
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
