import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useListTestimonials } from "@workspace/api-client-react";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useListTestimonials();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Social Proof</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What People Say</h1>
          <p className="text-muted-foreground mb-12">
            Perspectives from colleagues, stakeholders, and collaborators.
          </p>
        </motion.div>

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border rounded p-6 animate-pulse">
                <div className="h-4 bg-secondary rounded w-full mb-2" />
                <div className="h-4 bg-secondary rounded w-3/4 mb-6" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary" />
                  <div>
                    <div className="h-3 bg-secondary rounded w-24 mb-1" />
                    <div className="h-3 bg-secondary rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && testimonials && testimonials.length === 0 && (
          <div className="border border-border rounded p-16 text-center">
            <p className="font-mono text-sm text-muted-foreground">No testimonials yet.</p>
          </div>
        )}

        {!isLoading && testimonials && testimonials.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                data-testid={`card-testimonial-${t.id}`}
                className="border border-border rounded p-6 hover:border-primary/20 transition-colors flex flex-col"
              >
                <Quote size={18} className="text-primary/40 mb-4" />
                <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1 italic mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-xs font-bold text-primary">
                      {t.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.author}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
