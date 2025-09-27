import { DeletePostButton } from "@/components/PostForm";
import SearchForm from "@/components/User/SearchUserForm";
import { buildSearchWhere } from "@/helpers/buildSearchWhere";
import { parseSearchParams } from "@/helpers/parseSearchParams";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { paginate } from "@/lib/paginate";
import { Pagination } from "@/lib/Pagination";
import type { Post, User } from "@prisma/client";
import Image from "next/image";

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function Post({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.userId) {
    throw new Error("something went wrong");
  }

  const { currentPage, searchQuery } = parseSearchParams(searchParams);

  // filter query
  let baseWhere = {};

  if (session?.user.role !== "admin") {
    baseWhere = { userId: session.userId };
  }
  const whereClause = buildSearchWhere(baseWhere, searchQuery, [
    "title",
    "content",
  ]);

  // ambil data dengan paginate
  const { data, pagination } = await paginate({
    model: db.post,
    args: {
      where: whereClause,
      include: { user: true },
    },
    page: currentPage,
    perPage: 10,
  });

  const posts = data as (Post & { user: User })[];
  

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Posts Management</h1>
      <SearchForm initialSearch={searchQuery} />

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {post.content}
                </p>

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

              {session?.user.role === "admin" && (
                <DeletePostButton id={post.id} />
              )}
            </div>
          </div>
        ))}
        <Pagination
          modelName="Post"
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          totalModels={pagination.total}
        />

        {posts.length === 0 && (
          <p className="text-center text-gray-500 py-8">No posts yet</p>
        )}
      </div>
    </div>
  );
}
