import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdSlot } from "@/components/ui/ad-slot";
import Link from "next/link";
import { Clock } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, guides, and insights about gaming names, stylish text, and online identity.",
};

export default function BlogPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              GameGen <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips, guides, and insights about gaming names, stylish text, and building your online identity.
            </p>
          </div>

          <AdSlot position="top" className="mb-12 max-w-4xl mx-auto" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}/`}
                className="group glass rounded-2xl p-6 hover-lift"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-lg font-bold mb-3 group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
