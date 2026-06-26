import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Briefcase, Building2, TrendingUp } from "lucide-react";
import { useGetProject, getGetProjectQueryKey } from "@workspace/api-client-react";

export default function ProjectDetail({ id }: { id: number }) {
  const { data: project, isLoading } = useGetProject(id, {
    query: { enabled: !!id, queryKey: getGetProjectQueryKey(id) },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 animate-pulse">
          <div className="h-4 bg-secondary rounded w-24 mb-8" />
          <div className="h-10 bg-secondary rounded w-2/3 mb-4" />
          <div className="h-4 bg-secondary rounded w-full mb-2" />
          <div className="h-4 bg-secondary rounded w-4/5" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-xs text-primary mb-4">404</p>
          <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
          <Link href="/projects">
            <span className="font-mono text-xs text-muted-foreground hover:text-primary flex items-center gap-1 justify-center">
              <ArrowLeft size={12} /> Back to projects
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/projects">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={12} /> Back to projects
            </span>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-primary/10 text-primary rounded">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{project.summary}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 border border-border rounded bg-secondary/20">
            {project.company && (
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Building2 size={12} className="text-primary" />
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Company</p>
                </div>
                <p className="text-sm text-foreground font-medium">{project.company}</p>
              </div>
            )}
            {project.role && (
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Briefcase size={12} className="text-primary" />
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Role</p>
                </div>
                <p className="text-sm text-foreground font-medium">{project.role}</p>
              </div>
            )}
            {project.duration && (
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar size={12} className="text-primary" />
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Duration</p>
                </div>
                <p className="text-sm text-foreground font-medium">{project.duration}</p>
              </div>
            )}
            {project.outcome && (
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp size={12} className="text-primary" />
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Outcome</p>
                </div>
                <p className="text-sm text-primary font-medium">{project.outcome}</p>
              </div>
            )}
          </div>

          {/* Impact metrics */}
          {project.impact && project.impact.length > 0 && (
            <div className="mb-12">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Impact</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {project.impact.map((item, i) => (
                  <div key={i} className="border border-primary/20 rounded p-4 bg-primary/5">
                    <p className="text-sm text-foreground font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {project.description && (
            <div className="border-t border-border pt-10">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-6">Deep Dive</p>
              <div className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.description}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
