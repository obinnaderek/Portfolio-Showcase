import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useListProjects } from "@workspace/api-client-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } }),
};

export default function Home() {
  const { data: projects } = useListProjects();
  const featured = projects?.filter((p) => p.featured).slice(0, 3) ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p custom={0} variants={fadeUp} className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
              Product Manager
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              Obinna<br />
              <span className="text-primary">Chukwuemeka</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              I build products that ship on time, scale under pressure, and actually solve the problems users have — not the ones they describe.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/projects">
                <span
                  data-testid="link-view-work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-mono font-medium rounded hover:bg-primary/90 transition-colors"
                >
                  View Work <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/contact">
                <span
                  data-testid="link-get-in-touch"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-mono text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded transition-colors"
                >
                  Get in Touch
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg"
          >
            {[
              { value: "7+", label: "Years in Product" },
              { value: "12+", label: "Products Shipped" },
              { value: "3", label: "Sectors Covered" },
            ].map((stat) => (
              <div key={stat.label} className="border-l border-border pl-4">
                <p className="text-2xl font-bold text-primary font-mono">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      {featured.length > 0 && (
        <section className="py-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Selected Work</p>
                <h2 className="text-3xl font-bold text-foreground">Case Studies</h2>
              </div>
              <Link href="/projects">
                <span className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  All Projects <ArrowRight size={12} />
                </span>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/projects/${project.id}`}>
                    <div
                      data-testid={`card-project-${project.id}`}
                      className="group border border-border rounded p-6 hover:border-primary/40 transition-all duration-200 cursor-pointer h-full flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-primary/10 text-primary rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.summary}</p>
                      {project.outcome && (
                        <p className="mt-4 text-xs font-mono text-primary border-t border-border pt-3">{project.outcome}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
