import { DeletePostButton } from "@/components/PostForm";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import type { Post } from "@prisma/client";
import Image from "next/image";

export default async function Post() {
    const session = await auth()
    if (!session?.userId) {
        throw new Error("something went wrong")
    }
    let posts: Post[] = [];

    switch (session?.user?.role) {
        case 'admin':
            posts = await db.post.findMany({
                include: {
                    user: {
                        select: {
                            full_name: true,
                            email: true
                        }
                    }
                }
            })

            break;
        case 'user':
            posts = await db.post.findMany({
                where: {
                    userId: session?.userId
                },
                include: {
                    user: {
                        select: {
                            full_name: true,
                            email: true
                        }
                    }
                }
            });
            break
        default:
            break;
    }



    return (
        <div className="space-y-6 p-4">
            <h1 className="text-2xl font-bold">Posts Management</h1>
            <div className="grid gap-4">
                {posts.map(post => (
                    <div key={post.id} className="p-4 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{post.title}</h3>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.content}</p>

                                {post.image && (
                                    <div className="mt-3">
                                        <Image
                                            alt={post.title}
                                            width={200}
                                            height={200}
                                            src={`/storage/${post.image}`}
                                            className="rounded object-cover"
                                        />
                                    </div>
                                )}

                                <p className="text-xs text-gray-500 mt-2">
                                    By: {post.user?.full_name || post.user?.email}
                                </p>
                            </div>

                            {
                                session?.user.role !== "admin" ? null : <DeletePostButton id={post.id} />
                            }
                        </div>
                    </div>
                ))}

                {posts.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No posts yet</p>
                )}
            </div>
        </div>
    );
}