import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Clock } from "lucide-react";
import { useGetBlogPost, getGetBlogPostQueryKey } from "@workspace/api-client-react";

export default function BlogPost({ id }: { id: number }) {
  const { data: post, isLoading } = useGetBlogPost(id, {
    query: { enabled: !!id, queryKey: getGetBlogPostQueryKey(id) },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6 animate-pulse">
          <div className="h-4 bg-secondary rounded w-24 mb-8" />
          <div className="h-10 bg-secondary rounded w-3/4 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-4 bg-secondary rounded w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-xs text-primary mb-4">404</p>
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <Link href="/blog">
            <span className="font-mono text-xs text-muted-foreground hover:text-primary flex items-center gap-1 justify-center">
              <ArrowLeft size={12} /> Back to writing
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/blog">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={12} /> Back to writing
            </span>
          </Link>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-primary/10 text-primary rounded">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-border">
            <p className="font-mono text-xs text-muted-foreground">{post.publishedAt}</p>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock size={11} />
              <span className="font-mono text-xs">{post.readTime}</span>
            </div>
          </div>

          {post.content ? (
            <div className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed italic">{post.excerpt}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
