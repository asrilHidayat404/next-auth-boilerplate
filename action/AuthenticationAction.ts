"use server"
import bcrypt from "bcryptjs";
import path from "path";
import { promises as fs } from "fs";
import { signUpSchema } from "@/schemas/SignUpSchema";
import db from "@/lib/db";


const signUp = async (formData: FormData) => {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("passwordConfirmation");


    const validatedData = signUpSchema.safeParse({ fullName, email, password, passwordConfirmation });
      // 🚨 HAPUS return error dari sini
  // karena client sudah handle dengan react-hook-form
    if (!validatedData.success) {
        // Lempar error agar frontend bisa tangkap pesan asli
        throw new Error(validatedData.error.errors.map(e => e.message).join(", "));
    }
    try {
        const user = await db.$transaction(async (tx) => {
            const createdUser = await tx.user.create({
                data: {
                    full_name: validatedData.data.fullName,
                    email: validatedData.data.email.toLowerCase(),
                    password: await bcrypt.hash(validatedData.data.password, 10),
                    role_id: 2,
                    avatar: 'avatar/defaultAvatar.png',
                },
            });

            // copy avatar
            const avatarPath = await copyDefaultAvatar("public/storage/avatar", createdUser.id.toString());

            // update path avatar
            const updatedUser = await tx.user.update({
                where: { id: createdUser.id },
                data: { avatar: avatarPath },
            });

            return updatedUser;
        });
        return { success: true, user };
    } catch (error) {
        return { success: false, error: "Gagal membuat post" };
    }
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