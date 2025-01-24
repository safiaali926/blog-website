import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { components } from "@/components/CustomComponent";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60; // seconds

// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const query = `*[_type=='post' && defined(slug.current)]{
    "slug":slug.current
  }`;
  const slugs = await client.fetch(query);
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }));
}

// Dynamic page for a specific blog post
export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = await  params;

  const query = `*[_type=='post' && slug.current=="${slug}"]{
    title, summary, image, content,
    author->{bio, image, name}
  }[0]`;

  const post = await client.fetch(query);

  if (!post) {
    return { notFound: true };
  }

  return (
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8 m-4">
      {/* Blog Title */}
      <h1 className="text-xl xs:text-3xl lg:text-4xl font-bold text-center text-dark dark:text-light">
        {post.title}
      </h1>

      {/* Featured Image */}
      {post.image && (
        <Image
          src={urlForImage(post.image)}
          width={500}
          height={500}
          alt="Featured Image"
          className="rounded"
        />
      )}

      {/* Main Body of Blog */}
      <section className="text-lg leading-normal text-dark/80 dark:text-light/80 justify-center w-full text-justify prose-h4:text-3xl prose-h4:font-bold prose-li:list-disc prose-li:list-inside prose-li:marker:text-accentDarkSecondary prose-strong:text-dark dark:prose-strong:text-white">
        {post.content ? (
          <PortableText value={post.content} components={components} />
        ) : (
          <p>No content available.</p>
        )}
      </section>

      {/* Blog Summary Section */}
      <section>
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-[#9c1313]">
          Summary
        </h2>
        <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
          {post.summary}
        </p>
      </section>

      {/* Author Section */}
      <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
        {post.author?.image && (
          <Image
            src={urlForImage(post.author.image)}
            width={200}
            height={200}
            alt="author"
            className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
          />
        )}
        <div className="flex flex-col gap-1">
          {post.author?.name && (
            <h3 className="text-xl font-bold text-dark dark:text-light">
              {post.author.name}
            </h3>
          )}
          {post.author?.bio && (
            <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
              {post.author.bio}
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
