import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, Tv, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const stats = [
  { icon: Music, value: "250+", label: "Platforms" },
  { icon: Tv, value: "VEVO", label: "Support" },
  { icon: Shield, value: "MCN", label: "Monetization" },
];

const StatsSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-highlight/5 rounded-full blur-3xl -z-10" />

      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card-surface p-8 flex items-center gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                  <Skeleton className="w-16 h-16 rounded-2xl shrink-0 bg-muted/50" />
                  <div className="space-y-3 flex-1 relative">
                    <Skeleton className="h-8 w-24 bg-muted/50" />
                    <Skeleton className="h-4 w-32 bg-muted/50" />
                  </div>
                </div>
              ))
            : stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, type: "spring", bounce: 0.2 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="card-surface p-8 flex items-center gap-6 group relative overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300 relative">
                    <stat.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="relative">
                    <p className="text-4xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
