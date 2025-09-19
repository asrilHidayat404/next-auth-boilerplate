"use server"
import { schema } from "@/lib/schema";
import { executeAction } from "@/lib/executeAction";
import bcrypt from "bcryptjs";
import path from "path";
import { promises as fs } from "fs";
import db from "./db";
import { signUpSchema } from "./SignUpSchema";


const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const fullName = formData.get("fullName");
      const email = formData.get("email");
      const password = formData.get("password");
      const passwordConfirmation = formData.get("passwordConfirmation");


      const validatedData = signUpSchema.safeParse({ fullName, email, password, passwordConfirmation });
      if (!validatedData.success) {
        console.log(validatedData);
        
        // Lempar error agar frontend bisa tangkap pesan asli
        throw new Error(validatedData.error.errors.map(e => e.message).join(", "));
      }
      const user = await db.user.create({
        data: {
          full_name: validatedData.data.fullName,
          email: validatedData.data.email.toLocaleLowerCase(),
          password: await bcrypt.hash(validatedData.data.password, 10),
          role: "user",
          avatar: 'avatar/defaultAvatar.png'
        },
      });
      const avatarPath = await copyDefaultAvatar("public/storage/avatar", user.id.toString());

       // update user dengan avatar
      await db.user.update({
        where: { id: user.id },
        data: { avatar: avatarPath },
      });
    },

    successMessage: "Signed up successfully",
  });
};




export async function copyDefaultAvatar(targetDir: string, userId: string) {
  const defaultPath = path.join(process.cwd(), "public/default/defaultAvatar.png"); // sumber
  const targetPath = path.join(process.cwd(), targetDir, `${userId}.png`);   // tujuan

  // pastikan folder ada
  await fs.mkdir(path.dirname(targetPath), { recursive: true });

  try {
  await fs.copyFile(defaultPath, targetPath);
} catch (err) {
  console.error("Gagal copy avatar default:", err);
   throw new Error("Gagal membuat avatar default");
}

  // return path yang bisa dipakai di frontend
  return "avatar/" + `${userId}.png`;
}

export { signUp };