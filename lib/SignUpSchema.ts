import z from "zod";

const signUpSchema = z.object({
  fullName: z.string().min(6, "Username minimal 6 karakter"),
  email: z.string().email(),
  password: z.string().min(6, "Password minimal 6 karakter"),
  passwordConfirmation: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine(data => data.password === data.passwordConfirmation, {
  message: "Password dan konfirmasi tidak cocok",
  path: ["passwordConfirmation"],
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export {signUpSchema, type SignUpSchema}