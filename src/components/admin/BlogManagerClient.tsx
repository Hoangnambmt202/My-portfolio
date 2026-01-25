// app/(admin)/blog/BlogManagerClient.tsx
"use client";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Category, Post } from "@/types/post";
import Link from "next/link";

export default function BlogManagerClient({ posts }: { posts: Post[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button>+ New Post</Button>
      </div>

      <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Tiêu đề</th>
            <th className="p-3">Danh mục</th>
            <th className="p-3">Ngày đăng</th>
            <th className="p-3">Lượt xem</th>
            <th className="p-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: Post) => (
            <tr key={post._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{post.title}</td>

              <td className="p-3">
                {post.category?.map((c: Category) => c.title).join(", ") || "-"}
              </td>

              <td className="p-3">{formatDate(post.publishedAt)}</td>
              <td className="p-3">{post?.views ?? 0}</td>

              <td className="p-3 flex gap-2">
                <Link
                  href={`https://codertodata.sanity.studio/structure/post;${post._id}`}
                  target="_blank"
                  className="hover:text-gray-300 cursor-pointer py-2 px-4 rounded-md bg-blue-500 text-white"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
