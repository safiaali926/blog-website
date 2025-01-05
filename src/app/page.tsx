import BlogCard from "@/components/blogcard";
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // seconds

interface Post {
  title: string;
  summary: string;
  image: any; // Replace with proper type if you have one
  slug: string;
}

export default async function Home() {
  const query = `*[_type=='post'] | order(_createdAt asc){
    summary, title, image,
    "slug": slug.current
  }`;

  let posts: Post[] = [];
  try {
    posts = await client.fetch(query);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <main className="flex min-h-screen flex-col px-4">
      {/* Page Header */}
      <h1 className="text-2xl font-bold uppercase my-12 text-center text-[#535353] dark:text-light sm:text-3xl lg:text-5xl">
        Most Recent <span className="text-[#9c1313]">blogs</span>
      </h1>

      {/* Blog Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.length === 0 ? (
          <p className="text-center text-lg">No blogs available at the moment.</p>
        ) : (
          posts.map((post: Post) => <BlogCard post={post} key={post.slug} />)
        )}
      </section>
    </main>
  );
}
