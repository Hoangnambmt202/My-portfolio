import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/types/post";

export default async function BlogManager() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY, params: {} });

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
            <th className="p-3">category</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: Post) => (
            <tr key={post._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{post.title}</td>
              <td className="p-3">{post.category}</td>
              <td className="p-3">{post.publishedAt}</td>
              <td className="p-3">{post.views}</td>
              <td className="p-3">
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
