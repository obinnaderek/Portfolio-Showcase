import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { useListExperience } from "@workspace/api-client-react";

const education = [
  { degree: "Masters in Information Management (in view)", school: "Ahmadu Bello University, Zaria", period: "Mar 2026 – Present" },
  { degree: "Bachelor of Science, Computer Science", school: "Ahmadu Bello University, Zaria", period: "Feb 2022 – Aug 2025" },
  { degree: "National Diploma, Marine Engineering", school: "Maritime Academy of Nigeria, Oron", period: "Oct 2014 – Oct 2018" },
];

const certifications = [
  { name: "Product Analytics Certification", issuer: "Pendo.io", date: "Feb 2026" },
  { name: "Enhancing Financial Inclusion With A Risk-Based Approach", issuer: "ACAMS", date: "Sep 2025" },
  { name: "Product Strategy Certification", issuer: "Product School", date: "Feb 2025" },
  { name: "Product Discovery Micro-Certification", issuer: "Product School", date: "Nov 2024" },
  { name: "API Product Manager Certification", issuer: "API Academy", date: "Jul 2024" },
  { name: "Agile Explorer Certification", issuer: "IBM", date: "Jun 2024" },
];

export default function Experience() {
  const { data: experience, isLoading } = useListExperience();

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 section-glow-right pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Career</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Experience</h1>
          <p className="text-muted-foreground mb-14">A timeline of the roles that shaped how I think about product.</p>
        </motion.div>

        {isLoading && (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded p-6 animate-pulse">
                <div className="h-5 bg-secondary rounded w-1/3 mb-3" />
                <div className="h-4 bg-secondary rounded w-1/4 mb-4" />
                <div className="h-4 bg-secondary rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && experience && experience.length === 0 && (
          <div className="border border-border rounded p-16 text-center">
            <p className="font-mono text-sm text-muted-foreground">No experience entries yet.</p>
          </div>
        )}

        {!isLoading && experience && experience.length > 0 && (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-3 hidden md:block" />

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="md:pl-12 relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 w-6 h-6 rounded-full border border-primary bg-background flex items-center justify-center hidden md:flex">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <div
                    data-testid={`card-experience-${exp.id}`}
                    className="border border-border rounded p-6 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{exp.role}</h3>
                        <p className="text-primary font-mono text-sm">{exp.company}</p>
                      </div>
                      <p className="font-mono text-xs text-muted-foreground flex-shrink-0 ml-4">
                        {exp.startDate} to {exp.endDate ?? "Present"}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1.5">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">›</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Academic Background</p>
          <h2 className="text-2xl font-bold text-foreground mb-8">Education</h2>
          <div className="space-y-4">
            {education.map((ed, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-border rounded p-5 flex items-start gap-4 hover:border-primary/30 transition-colors"
              >
                <GraduationCap size={18} className="text-primary mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{ed.degree}</p>
                  <p className="text-primary font-mono text-xs mt-0.5">{ed.school}</p>
                </div>
                <p className="font-mono text-xs text-muted-foreground shrink-0">{ed.period}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Credentials</p>
          <h2 className="text-2xl font-bold text-foreground mb-8">Certifications</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-border rounded p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Award size={16} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm leading-snug">{cert.name}</p>
                    <p className="font-mono text-xs text-primary mt-1">{cert.issuer}</p>
                    <p className="font-mono text-xs text-muted-foreground mt-0.5">{cert.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
