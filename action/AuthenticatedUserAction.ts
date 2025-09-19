"use server"
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { StorageDisk } from "@/lib/StorageDisk";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import path from "path";
import { z } from "zod";
import bcrypt from "bcryptjs"


const avatarSchema = z.instanceof(File)
  .refine(file => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "Tipe file tidak valid")
  .refine(file => file.size <= 2 * 1024 * 1024, "File terlalu besar (max 2MB)");

export const UpdateAvatar = async (formData: FormData) => {
  const avatarFile = formData.get("avatar") as File | null;
  if (!avatarFile) return { success: false, error: "Tidak ada file diunggah" };

  const parsed = avatarSchema.safeParse(avatarFile);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors.map(e => e.message).join(", ") };
  }

  const authUser = await auth();
  if (!authUser?.user?.email) throw new Error("Unauthorized");

  // Cek user lama
  const existingUser = await db.user.findUnique({
    where: { email: authUser.user.email },
    select: { avatar: true },
  });

  let fileName: string;
  try {
    ({ fileName } = await StorageDisk(avatarFile, "public/storage/avatar"));

    await db.user.update({
      where: { email: authUser.user.email },
      data: { avatar: `avatar/${fileName}` },
    });

    // Non-blocking delete file lama
    if (existingUser?.avatar) {
      const oldPath = path.join(process.cwd(), "public/storage/", existingUser.avatar);
      fs.unlink(oldPath).catch(err => console.warn("Failed to delete old avatar:", err));
    }

    // Revalidate halaman jika perlu
    revalidatePath("/dashboard/account-settings");

    return { success: true, avatar: `avatar/${fileName}` };
  } catch (err) {
    console.error("Failed to update avatar:", err);
    return { success: false, error: "Update avatar gagal" };
  }
};


const updateInfoSchema = z.object({
  full_name: z.string().min(2, "Nama terlalu pendek").max(100, "Nama terlalu panjang"),
  email: z.string().email("Email tidak valid"),
});

export async function UpdateProfile(formData: FormData) {
  const data = {
    full_name: formData.get("fullName") as string,
    email: formData.get("email") as string,
  };


  const parsed = updateInfoSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors.map(e => e.message).join(", ") };
  }

  const authUser = await auth();
  if (!authUser?.user?.email) throw new Error("Unauthorized: email not found");

  console.log(parsed.data);
  try {
    await db.user.update({
      where: { email: authUser.user.email },
      data: parsed.data, // nama & email sudah tervalidasi
    });
    return { success: true, ...parsed.data };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}


const updatePasswordSchema = z.object({
  current_password: z.string().min(6, "Password saat ini minimal 6 karakter"),
  password: z.string().min(6, "Password baru minimal 6 karakter"),
  password_confirmation: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine(data => data.password === data.password_confirmation, {
  message: "Password dan konfirmasi tidak cocok",
  path: ["password_confirmation"],
});

export const UpdatePasswordAction = async (formData: FormData) => {
  // Parse formData ke object
  const data = {
    current_password: formData.get("current_password") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
  };

  // Validasi pakai Zod
  const parsed = updatePasswordSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors.map(e => e.message).join(", ") };
  }

  // Ambil user yang sedang login
  const authUser = await auth();
  if (!authUser?.user?.email) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { email: authUser.user.email } });
  if (!user) return { success: false, error: "User tidak ditemukan" };
  if (!user.password) {
    return { success: false, error: "User belum memiliki password" };
  }
  if (!user.email) {
    return { success: false, error: "User belum memiliki email" };
  }

  // Cek password lama
  const match = await bcrypt.compare(parsed.data.current_password, user.password);
  if (!match) return { success: false, error: "Password saat ini salah" };

  // Hash password baru
  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

  // Update password di database
  await db.user.update({
    where: { email: user.email },
    data: { password: hashedPassword },
  });

  return { success: true };
};