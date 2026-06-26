import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Error 404</p>
        <h1 className="text-6xl font-bold text-foreground mb-4 font-mono">
          <span className="text-primary">404</span>
        </h1>
        <p className="text-muted-foreground mb-2">This page doesn't exist.</p>
        <p className="text-sm text-muted-foreground mb-10 max-w-xs mx-auto">
          Even the best PMs ship the occasional wrong path. Let's get you back on track.
        </p>
        <Link href="/">
          <span className="inline-flex items-center gap-2 font-mono text-sm text-primary border border-primary/30 px-4 py-2 rounded hover:bg-primary/10 transition-colors">
            <ArrowLeft size={14} /> Go home
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
