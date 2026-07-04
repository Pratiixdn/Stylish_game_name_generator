import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, Tag as TagIcon } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdSlot } from "@/components/ui/ad-slot";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import { renderBlogContent } from "@/lib/blog-renderer";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          <div className="prose-content">{renderBlogContent(post.content)}</div>

          <AdSlot position="article" className="my-10" />

          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-8 pt-8 border-t">
              <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}/`}
                    className="glass rounded-xl p-4 hover-lift"
                  >
                    <p className="text-sm font-medium leading-snug">{r.title}</p>
                    <p className="text-xs text-muted-foreground mt-2">{r.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
