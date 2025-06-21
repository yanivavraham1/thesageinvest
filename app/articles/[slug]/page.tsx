import { notFound } from "next/navigation";
import { cache } from "react";
import { getPostBySlug, prisma } from "@/lib/prisma";
import { Metadata } from "next";
//import { ReadingProgress } from "@/components/article/components/reading-progress";
import { ShareButtons } from "@/components/article/components/share-buttons";
import { MDXRemote } from "next-mdx-remote/rsc"; // Use RSC version
import { getPostMDX } from "@/lib/mdx-loader";
import { Heading } from "@/components/article/typography/heading";
import { SubHeading } from "@/components/article/typography/sub-heading";
import { Paragraph } from "@/components/article/typography/paragraph";
import { ExpandList } from "@/components/article/components/post-list-expand";
import { List } from "@/components/article/components/post-list";
import { PostImage } from "@/components/article/components/post-image";
import { FaqList } from "@/components/article/components/post-faq";
import { Disclaimer } from "@/components/article/components/disclaimer";
import { PostHeader } from "@/components/article/components/post-header";
import { Post } from "@/lib/types";
const getPost = cache(async (slug: string) => {
  return await getPostBySlug(slug);
});

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
    },
  });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: tParams;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);

  return {
    title: post?.title || "Post",
    description: post?.description || "A blog post",
    openGraph: {
      title: post?.title || "Post",
      description: post?.description || "A blog post",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${post?.slug}`,
      images: [
        {
          url: `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/api/og?title=${encodeURIComponent(post?.title || "Post")}`,
        },
      ],
    },
  };
}

const mdxComponents = {
  Heading,
  SubHeading,
  Paragraph,
  ExpandList,
  List,
  PostImage,
  FaqList,
};

function isValidPost(post: unknown): post is Post {
  return (
    typeof post === "object" &&
    post !== null &&
    "slug" in post &&
    typeof (post as { slug?: unknown }).slug === "string"
  );
}

type tParams = Promise<{ slug: string }>;
export default async function PostPage(props: { params: tParams }) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post || !post.slug) return notFound();
  const { mdxSource } = await getPostMDX(slug);
  if (!isValidPost(post)) return notFound();

  return (
    <>
      <article className="max-w-3xl mx-auto px-4 py-8">
        <PostHeader post={post!} />
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">{post.description}</p>{" "}
        <MDXRemote source={mdxSource} components={mdxComponents} />
        {/* load MDX here */}
        <Disclaimer />
        <ShareButtons title={slug} />
      </article>
    </>
  );
}
