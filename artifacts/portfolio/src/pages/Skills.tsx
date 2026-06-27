import { motion } from "framer-motion";
import { useListSkills } from "@workspace/api-client-react";
import {
  Target,
  Cpu,
  CreditCard,
  ShieldCheck,
  Rocket,
  BarChart2,
  Users,
  Wrench,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } }),
};

const competencies = [
  {
    label: "Product Strategy",
    evidence: "Led payment infrastructure strategy for regulatory compliance and market expansion across multiple African markets.",
  },
  {
    label: "Technical PM",
    evidence: "Managed integrations with payment processors, banks, mobile money providers, and third-party APIs.",
  },
  {
    label: "Payments Expertise",
    evidence: "Delivered POS acquiring, online acquiring, tokenization, BNPL, mobile money, and international card acceptance products.",
  },
  {
    label: "Product Delivery",
    evidence: "Led end-to-end delivery from discovery and requirements through testing, launch, and post-launch optimization.",
  },
  {
    label: "Leadership",
    evidence: "Coordinated engineering, compliance, operations, commercial teams, and external partners across multiple countries.",
  },
  {
    label: "Data & Optimization",
    evidence: "Improved transaction success rates, optimized routing strategies, and monitored operational KPIs.",
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  "Product Strategy & Vision": Target,
  "Technical Product Management": Cpu,
  "Payments & Fintech Domain": CreditCard,
  "Regulatory & Compliance": ShieldCheck,
  "Product Execution & Delivery": Rocket,
  "Data & Analytics": BarChart2,
  "Leadership & Stakeholder Management": Users,
  "Tools & Platforms": Wrench,
};

function SkillBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Proficiency: ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-all ${
            i <= level ? "bg-primary" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const { data: skillGroups, isLoading } = useListSkills();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Capabilities</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills</h1>
          <p className="text-muted-foreground max-w-2xl">
            Built across five years of shipping payment products in fintech. Strategy, technical depth, domain expertise, and the operational experience to know where products break in the real world.
          </p>
        </motion.div>

        {/* Competency Summary */}
        <motion.div
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-16 border border-border rounded-lg overflow-hidden"
        >
          <div className="border-b border-border px-6 py-4">
            <p className="font-mono text-xs text-primary tracking-widest uppercase">Core Competencies</p>
          </div>
          <div className="divide-y divide-border">
            {competencies.map((c) => (
              <div key={c.label} className="grid md:grid-cols-5 px-6 py-4 gap-4 hover:bg-secondary/20 transition-colors">
                <div className="md:col-span-1">
                  <span className="font-semibold text-sm text-foreground">{c.label}</span>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skill Category Label */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <p className="font-mono text-xs text-primary tracking-widest uppercase">Full Skill Breakdown</p>
        </motion.div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-border rounded-lg p-6 animate-pulse">
                <div className="h-5 bg-secondary rounded w-1/2 mb-5" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((j) => <div key={j} className="h-4 bg-secondary rounded w-full" />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills grid */}
        {!isLoading && skillGroups && skillGroups.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, i) => {
              const Icon = categoryIcons[group.category] ?? Target;
              return (
                <motion.div
                  key={group.category}
                  custom={i + 3}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="border border-border rounded-lg p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <p className="font-mono text-xs text-primary tracking-widest uppercase leading-tight">{group.category}</p>
                  </div>
                  <div className="space-y-3">
                    {group.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-foreground">{skill.name}</span>
                          <span className="font-mono text-[10px] text-muted-foreground ml-2 flex-shrink-0">{skill.level}/5</span>
                        </div>
                        <SkillBar level={skill.level} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
