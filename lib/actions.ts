"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z
    .string({
      required_error: "El nombre es un campo obligatorio",
    })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  username: z
    .string({
      required_error: "El nombre de usuario es un campo obligatorio",
    })
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
  email: z
    .string({
      required_error: "El email es un campo obligatorio",
    })
    .email({ message: "El email es incorrecto" }),
  password: z
    .string({
      required_error: "La contraseña es un campo obligatorio",
    })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  confirmPassword: z
    .string({
      required_error: "La contraseña es un campo obligatorio",
    })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

const userCreate = UserSchema.omit({ id: true }).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  }
);

export type State = {
  errors: {
    password?: string[];
    email?: string[];
    name?: string[];
    username?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function createUser(
  prevState: State | undefined,
  formData: FormData
) {
  const validatedFields = userCreate.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.", //todo: cambia esto
    };
  }

  const { name, username, email, password } = validatedFields.data;
  revalidatePath("/admin/users");
}

export async function updateUser(
  id: number = -1,
  prevState: State | undefined,
  formData: FormData
) {
  const validatedFields = userCreate.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.", //todo: cambia esto
    };
  }

  const { name, username, email, password } = validatedFields.data;
  revalidatePath("/admin/users");
}

export async function deleteUser(id: number) {
  
 // throw new Error("Failed to Delete Invoice");
  try {
    // await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (err) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
  revalidatePath("/admin/users");
}
