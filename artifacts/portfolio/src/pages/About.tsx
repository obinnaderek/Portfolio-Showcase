import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Target, Layers, BarChart3, Users, BookOpen, Compass } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const principles = [
  { icon: Target, title: "Diligence and prioritisation", desc: "I do the work properly or not at all. Every initiative I own gets structured thinking, clear requirements, and follow-through — because half-built things cost more than unstarted ones." },
  { icon: BarChart3, title: "Data is not optional", desc: "I don't make decisions on gut feeling. Success rates, failure patterns, user behaviour, transaction flows — data is how I know what is actually happening versus what I think is happening. Without it, I'm guessing." },
  { icon: Users, title: "Users are the final authority", desc: "You can pass every internal review and still be wrong. The only meaningful validation is users engaging with what you built, in the real world, under real conditions. I build toward that test, not away from it." },
  { icon: BookOpen, title: "Constant learning is not a cliché", desc: "The payments industry, the regulatory landscape, and the technology underneath all of it are moving fast. A PM who stopped learning six months ago is already behind. I treat learning as part of the job, not a bonus activity." },
  { icon: Layers, title: "Breadth makes you a better specialist", desc: "My work spans payments, Web3, lending, insurance, and savings products. That breadth is not a distraction — it gives me pattern recognition that a narrow specialist doesn't have, and it makes me harder to fool by complexity." },
  { icon: Compass, title: "Understand before you build", desc: "Some of the most valuable work I have done has been deeply understanding a system before touching it. The instinct to build fast is real, but building on a misunderstood foundation is expensive. Discovery is not a delay." },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 section-glow-left pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative">
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
                <p className="font-mono text-xs text-muted-foreground">Obinna Derek Chukwuemeka</p>
                <p className="font-mono text-xs text-primary">Product Manager</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="md:col-span-3 space-y-5">
            <p className="text-foreground leading-relaxed">
              I'm a Product Manager with 5+ years of experience building and scaling payment infrastructure products across fintech and digital financial services in Africa. Based in Lagos, I've shipped products that serve millions of users across Nigeria, Kenya, Tanzania, Ghana, and Uganda — spanning offline and online acquiring, payment routing, EFT processing, collections, cross-border payments, and merchant solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My path into product management started in operations. At UBA PLC, I was a second-level technical support specialist at the head office, responsible for POS and offline payment operations across 19 countries. I resolved merchant issues from across the continent daily — authorization failures, settlement discrepancies, terminal connectivity problems, card scheme escalations. That experience taught me exactly where payment systems break and why. But more than that, it taught me something more useful: that I didn't want to just resolve the problems. I wanted to understand them deeply enough to not build them in the first place.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That is what moved me into product management. And it is the lens I bring to every product decision — the operational reality of what happens when things go wrong in production, with real merchants, real transactions, and real money on the line.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond payments, I have worked on Web3 projects spanning DeFi, on-chain gaming marketplaces, and real-world asset tokenisation services. My product experience also extends across online acquiring, payment gateways, mobile wallets, electronic fund transfers, lending, insurance, digital savings products, and customer-facing financial services. The common thread is building financial infrastructure that works reliably for the people who depend on it.
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
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
