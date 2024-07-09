"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const ServiceSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  price: z.number().min(0, { message: "El precio no puede ser negativo" }),
  icon: z.string().optional(),
  // categoryId: z.number().min(1, { message: "Debe seleccionar una categoría" }),
  // isActive: z.boolean(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
  // Add any other required fields here
});

const ServiceCreate = ServiceSchema.omit({ id: true });

export type State = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
  };
  message?: string | null;
};

export async function createService(
  prevState: State | undefined,
  formData: FormData
) {

  const validatedFields = ServiceCreate.safeParse({
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

  const { name, description, price } = validatedFields.data;
  revalidatePath("/admin/users");
}
