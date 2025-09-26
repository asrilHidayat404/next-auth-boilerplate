import z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi")
});

export type SignInSchemaValues = z.infer<typeof signInSchema>;
