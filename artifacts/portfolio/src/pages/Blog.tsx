import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useListPosts } from "@workspace/api-client-react";

export default function Blog() {
  const { data: posts, isLoading } = useListPosts();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Writing</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Thinking in Public</h1>
          <p className="text-muted-foreground max-w-xl mb-12">
            Essays on product strategy, decision-making, and building teams that ship.
          </p>
        </motion.div>

        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded p-6 animate-pulse">
                <div className="h-4 bg-secondary rounded w-1/4 mb-3" />
                <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                <div className="h-4 bg-secondary rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && posts && posts.length === 0 && (
          <div className="border border-border rounded p-16 text-center">
            <p className="font-mono text-sm text-muted-foreground">No posts yet. Check back soon.</p>
          </div>
        )}

        {!isLoading && posts && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div
                    data-testid={`card-post-${post.id}`}
                    className="group border border-border rounded p-6 hover:border-primary/40 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <p className="font-mono text-[10px] text-muted-foreground">{post.publishedAt}</p>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock size={10} />
                            <span className="font-mono text-[10px]">{post.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-secondary text-muted-foreground rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1 ml-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
