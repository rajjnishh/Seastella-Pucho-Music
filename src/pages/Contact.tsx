import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (_data: FormData) => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="section-padding pt-32">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="heading-display text-foreground">
                Let's <span className="text-accent-highlight">Talk!</span>
              </h1>
              <div className="mt-10 space-y-4">
                <div className="card-surface p-4 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">contact@puchomusic.com</span>
                </div>
                <div className="card-surface p-4 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">+91 9128830590</span>
                </div>
                <div className="card-surface p-4 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">India Office: Siliguri, Darjeeling, West Bengal - 734014</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {submitted ? (
                <div className="card-surface p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" as const, bounce: 0.5 }}
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground mt-2 text-sm">We'll get back to you within 1-2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="card-surface p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input placeholder="Name" {...register("name")} className="bg-secondary border-none" />
                      {errors.name && <p className="text-xs text-primary mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Input placeholder="Email" {...register("email")} className="bg-secondary border-none" />
                      {errors.email && <p className="text-xs text-primary mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <Textarea placeholder="Message" rows={5} {...register("message")} className="bg-secondary border-none" />
                    {errors.message && <p className="text-xs text-primary mt-1">{errors.message.message}</p>}
                  </div>
                  <Button variant="hero" size="xl" type="submit" className="w-full">Send</Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Contact;
