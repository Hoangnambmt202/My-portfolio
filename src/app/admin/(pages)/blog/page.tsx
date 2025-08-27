"use client";
import { Button } from "@/components/ui/button";

export default function BlogManager() {
  const posts = [
    { id: 1, title: "Hello Blog", views: 123, date: "2025-08-10" },
    { id: 2, title: "Next.js Admin Guide", views: 89, date: "2025-08-15" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button>+ New Post</Button>
      </div>

      <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Views</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{p.title}</td>
              <td className="p-3">{p.views}</td>
              <td className="p-3">{p.date}</td>
              <td className="p-3">
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
