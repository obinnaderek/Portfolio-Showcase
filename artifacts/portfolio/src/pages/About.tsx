import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Target, Layers, BarChart3, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const principles = [
  { icon: Target, title: "Infrastructure is product", desc: "Payment routing, uptime, and settlement aren't backend concerns — they're the product. Reliability is a feature." },
  { icon: BarChart3, title: "Data-informed, not data-blind", desc: "Success rates, failure patterns, channel health — I track what matters and let the data surface where to dig." },
  { icon: Layers, title: "Localisation is a strategy", desc: "Copying a product across markets doesn't work in Africa. Regulations, user habits, and partner ecosystems vary enormously." },
  { icon: Users, title: "Operators are users too", desc: "Merchants, agents, and partner banks are as much my users as end consumers. I design for the full ecosystem." },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">The PM behind the work</h1>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 mb-20">
          {/* Avatar placeholder */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="md:col-span-2">
            <div className="aspect-square rounded border border-border bg-secondary/40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                  <span className="font-mono text-2xl font-bold text-primary">OC</span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">Obinna Chukwuemeka</p>
                <p className="font-mono text-xs text-primary">Product Manager</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="md:col-span-3 space-y-5">
            <p className="text-foreground leading-relaxed">
              I'm a Product Manager with 5+ years of experience building and scaling payment infrastructure products across fintech and digital financial services in Africa. Based in Lagos, I've shipped products that process millions of transactions across Nigeria, Kenya, Tanzania, Ghana, and Uganda.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My work spans offline and online acquiring, payment routing, EFT processing, collections, cross-border payments, web3 onchain marketplaces, and merchant payment solutions. I've led everything from NIBSS platform migrations to mobile money rollouts with Airtel Money, M-Pesa, and Tigo Pesa.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Before moving into a pure PM role, I spent time in payment operations — maintaining 99.2% uptime across live POS and card payment channels. That experience gave me a ground-level understanding of where payment systems break and what reliability actually costs. It shapes every product decision I make today.
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline">
                  Let's work together <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Principles */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">How I Work</p>
          <h2 className="text-2xl font-bold text-foreground mb-8">Product principles</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded p-5 hover:border-primary/30 transition-colors"
              >
                <p.icon size={18} className="text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
