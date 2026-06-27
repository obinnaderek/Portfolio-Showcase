import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useListProjects } from "@workspace/api-client-react";

export default function Projects() {
  const { data: projects, isLoading } = useListProjects();
  const [filter, setFilter] = useState<string | null>(null);

  const allTags = Array.from(new Set(projects?.flatMap((p) => p.tags) ?? []));
  const filtered = filter ? projects?.filter((p) => p.tags.includes(filter)) : projects;

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 section-glow-left pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">My Projects</h1>
          <p className="text-muted-foreground max-w-xl mb-10">
            Selected work — each one a story of a problem discovered, a bet placed, and an outcome measured.
          </p>
        </motion.div>

        {/* Filter tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setFilter(null)}
              data-testid="filter-all"
              className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
                !filter ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag === filter ? null : tag)}
                data-testid={`filter-${tag}`}
                className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
                  filter === tag ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border rounded p-6 animate-pulse">
                <div className="h-4 bg-secondary rounded w-1/3 mb-4" />
                <div className="h-6 bg-secondary rounded w-2/3 mb-3" />
                <div className="h-4 bg-secondary rounded w-full mb-2" />
                <div className="h-4 bg-secondary rounded w-4/5" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filtered && filtered.length === 0 && (
          <div className="border border-border rounded p-12 text-center">
            <p className="font-mono text-sm text-muted-foreground">No projects match this filter.</p>
          </div>
        )}

        {!isLoading && filtered && filtered.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <div
                    data-testid={`card-project-${project.id}`}
                    className="group border border-border rounded p-6 hover:border-primary/40 transition-all duration-200 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.featured && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-primary/20 text-primary rounded border border-primary/20">
                            Featured
                          </span>
                        )}
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-secondary text-muted-foreground rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                    </div>

                    {project.company && (
                      <p className="font-mono text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{project.company}</p>
                    )}
                    <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.summary}</p>

                    <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                      {project.role && (
                        <span className="text-xs text-muted-foreground font-mono">{project.role}</span>
                      )}
                      {project.duration && (
                        <span className="text-xs text-muted-foreground font-mono">{project.duration}</span>
                      )}
                    </div>

                    {project.outcome && (
                      <p className="mt-3 text-xs font-mono text-primary">{project.outcome}</p>
                    )}
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
