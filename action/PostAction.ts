"use server";

import { z } from "zod";
import db from "@/lib/db";
import { StorageDisk } from "@/lib/StorageDisk";
import { auth } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";


// Validasi post
const createPostSchema = z.object({
    title: z.string().min(3, "Title terlalu pendek"),
    content: z.string().min(10, "Content terlalu pendek"),
    image: z.instanceof(File).optional(),
});

export async function createPostAction(formData: FormData) {
    const title = formData.get("title");
    const content = formData.get("content");
    const imageFile = formData.get("image") as File | null;

    // Validasi input
    const parsed = createPostSchema.safeParse({ title, content, image: imageFile });
    if (!parsed.success) {
        return { success: false, error: parsed.error.errors.map(e => e.message).join(", ") };
    }

    // Auth
    const authUser = await auth();
    if (!authUser?.userId) throw new Error("Unauthorized");

    try {
        let imagePath = "";
        if (imageFile) {
            const { fileName } = await StorageDisk(imageFile, "public/storage/posts");
            if (!fileName) return { success: false, error: "Failed to upload image" };
            imagePath = "posts/" + fileName;
        }

        const post = await db.post.create({
            data: {
                title: parsed.data.title,
                content: parsed.data.content,
                image: imagePath,
                userId: authUser.userId,
            },
        });
        revalidatePath("dashboard/post")


        return { success: true, post };
    } catch (err) {
        console.error(err);
        return { success: false, error: "Gagal membuat post" };
    }
}

export async function deletePostAction(postId: string) {
    try {
        const post = await db.post.findUnique({ where: { id: postId } });
        if (!post) throw new Error("Post not found");

        if (post.image) {
            const filePath = path.join(process.cwd(), "public/storage", post.image);
            fs.unlink(filePath).catch(() => null);
        }

        await db.post.delete({ where: { id: postId } });
        revalidatePath("dashboard/post")

        return { success: true };
    } catch (err) {
        console.error(err);
        return { success: false, error: "Gagal menghapus post" };
    }
}
