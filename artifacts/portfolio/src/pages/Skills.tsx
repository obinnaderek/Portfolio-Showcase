import { motion } from "framer-motion";
import { useListSkills } from "@workspace/api-client-react";

function SkillBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Proficiency: ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all ${
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
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Capabilities</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills</h1>
          <p className="text-muted-foreground mb-12">
            The toolkit I reach for across strategy, discovery, execution, and leadership.
          </p>
        </motion.div>

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border rounded p-6 animate-pulse">
                <div className="h-5 bg-secondary rounded w-1/3 mb-5" />
                <div className="space-y-4">
                  {[1, 2, 3].map((j) => <div key={j} className="h-4 bg-secondary rounded w-full" />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && skillGroups && skillGroups.length === 0 && (
          <div className="border border-border rounded p-16 text-center">
            <p className="font-mono text-sm text-muted-foreground">No skills listed yet.</p>
          </div>
        )}

        {!isLoading && skillGroups && skillGroups.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded p-6 hover:border-primary/20 transition-colors"
              >
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-5">{group.category}</p>
                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name} data-testid={`skill-${skill.name}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-foreground">{skill.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{skill.level}/5</span>
                      </div>
                      <SkillBar level={skill.level} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
