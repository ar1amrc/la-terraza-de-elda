"use server";

import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";
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
  errors?: {
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
  prevState: State,
  formData: FormData
) {
  const date = JSON.parse(formData.get("date") as string);
  const id = randomUUID();

  console.log(formData);

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
    extraServices: (formData.get("extraServices") as string)
      ? (formData.get("extraServices") as string)?.split(",")
      : [],
    experiences: (formData.get("experiences") as string)
      ? (formData.get("experiences") as string)?.split(",")
      : [],
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

  try {
    await sql`
  INSERT INTO reservations ( id, guestsdata, email, startDate, endDate, room_id, status, guests, amount, additionalData, user_id)
      VALUES ( ${id}, ${guestsData}, ${email}, ${startDate}, ${endDate}, ${roomId}, ${status}, ${guests}, ${amount}, ${additionalData}, '997db02f-40c1-445b-830e-a1da560ad2a1' )
`;
    const es =
      extraServices?.map((service) => {
        return sql`INSERT INTO reservationextraservices (reservation_id, service_id) VALUES (${id}, ${service})`;
      }) ?? [];
    const exp =
      experiences?.map((experience) => {
        return sql`INSERT INTO reservationexperiences (reservation_id, experience_id) VALUES (${id}, ${experience})`;
      }) ?? [];

    await Promise.all([...es, ...exp]);
  } catch (err) {
    console.error(err);
    return {
      message: "Database Error: Failed to Create Service.",
    };
  }
  revalidatePath("/admin/reservations");
  redirect("admin/reservations");
}

export async function updateReservation(
  id: number = -1,
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
    extraServices: (formData.get("extraServices") as string)
      ? (formData.get("extraServices") as string)?.split(",")
      : [],
    experiences: (formData.get("experiences") as string)
      ? (formData.get("experiences") as string)?.split(",")
      : [],
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

  try {
    await sql`DELETE FROM reservationextraservices WHERE reservation_id = ${id}`;
    await sql`DELETE FROM reservationexperiences WHERE reservation_id = ${id}`;

    await sql`
      UPDATE reservations
      SET guestsdata = ${guestsData}, email = ${email}, startDate = ${startDate}, endDate = ${endDate}, room_id = ${roomId}, status = ${status}, guests = ${guests}, amount = ${amount}, additionalData = ${additionalData}
      WHERE id = ${id}
    `;

    const es =
      extraServices?.map((service) => {
        return sql`INSERT INTO reservationextraservices (reservation_id, service_id) VALUES (${id}, ${service})`;
      }) ?? [];
    const exp =
      experiences?.map((experience) => {
        return sql`INSERT INTO reservationexperiences (reservation_id, experience_id) VALUES (${id}, ${experience})`;
      }) ?? [];

    await Promise.all([...es, ...exp]);
  } catch (err) {
    console.error(err);
    return {
      message: "Database Error: Failed to Create Service.",
    };
  }

  revalidatePath("/admin/reservations");
  redirect("/admin/reservations");
}

export async function deleteReservation(id: number) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await sql`DELETE FROM reservationextraservices WHERE reservation_id = ${id}`;
    await sql`DELETE FROM reservationexperiences WHERE reservation_id = ${id}`;
    await sql`DELETE FROM reservations WHERE reservations.id = ${id}`;
  } catch (err) {
    console.error(err);
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
  revalidatePath("/admin/reservations");
}

export async function searchReservationsByRoom(id: number) {
  // throw new Error("Failed to Delete Invoice");
  try {
    // const reservations = await sql`SELECT * FROM reservations WHERE room_id = ${id}`;
    // return reservations;
  } catch (err) {
    return {
      message: "Database Error: Failed to Search Reservations.",
    };
  }
}
