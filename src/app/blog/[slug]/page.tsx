import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { components } from "@/components/CustomComponent";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

// Revalidate interval
export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: { slug: string }; // Explicitly declare params structure here
}) {
  const { slug } = params;

  const query = `*[_type=='post' && slug.current=="${slug}"]{
    title, summary, image, content,
    author->{bio, image, name}
  }[0]`;

  const post = await client.fetch(query);

  if (!post) {
    notFound(); // Return 404 if post is not found
  }

  return (
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8 m-4">
      <h1 className="text-xl xs:text-3xl lg:text-4xl font-bold text-center text-dark dark:text-light">
        {post.title}
      </h1>

      {post.image && (
        <Image
          src={urlForImage(post.image)}
          width={500}
          height={500}
          alt="Featured Image"
          className="rounded"
        />
      )}

      <section className="text-lg leading-normal text-dark/80 dark:text-light/80 justify-center w-full text-justify">
        {post.content ? (
          <PortableText value={post.content} components={components} />
        ) : (
          <p>No content available.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-[#9c1313]">
          Summary
        </h2>
        <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
          {post.summary}
        </p>
      </section>

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
