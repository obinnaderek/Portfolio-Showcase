import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Mail, Linkedin, Github } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const mutation = useSubmitContact();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ data }, {
      onSuccess: () => setSuccess(true),
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Whether it's a product role, a collaboration, or just a good conversation about building things — I'm open to it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            {success ? (
              <div className="border border-primary/30 rounded p-10 flex flex-col items-center text-center bg-primary/5">
                <CheckCircle size={36} className="text-primary mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Message sent</h2>
                <p className="text-sm text-muted-foreground">Obinna will get back to you shortly.</p>
                <button
                  onClick={() => { setSuccess(false); form.reset(); }}
                  className="mt-6 font-mono text-xs text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              data-testid="input-name"
                              placeholder="Your name"
                              className="bg-secondary/40 border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              data-testid="input-email"
                              placeholder="you@example.com"
                              className="bg-secondary/40 border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Subject (optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            data-testid="input-subject"
                            placeholder="What's this about?"
                            className="bg-secondary/40 border-border focus:border-primary"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            data-testid="input-message"
                            placeholder="Tell me what's on your mind..."
                            rows={6}
                            className="bg-secondary/40 border-border focus:border-primary resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    data-testid="button-submit"
                    disabled={mutation.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                  {mutation.isError && (
                    <p className="text-xs text-destructive font-mono text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              </Form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="border border-border rounded p-5">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Connect</p>
              <div className="space-y-3">
                <a href="mailto:obinna@example.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={14} className="text-primary" />
                  obinna@example.com
                </a>
                <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin size={14} className="text-primary" />
                  LinkedIn
                </a>
                <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={14} className="text-primary" />
                  GitHub
                </a>
              </div>
            </div>

            <div className="border border-border rounded p-5">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Response time</p>
              <p className="text-sm text-muted-foreground">Usually within 24-48 hours on business days.</p>
            </div>

            <div className="border border-border rounded p-5">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Open to</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-primary">›</span> Full-time PM roles</li>
                <li className="flex items-center gap-2"><span className="text-primary">›</span> Product advisory</li>
                <li className="flex items-center gap-2"><span className="text-primary">›</span> Speaking & panels</li>
                <li className="flex items-center gap-2"><span className="text-primary">›</span> Interesting conversations</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
