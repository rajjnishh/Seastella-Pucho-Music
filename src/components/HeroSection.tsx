import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

const VinylRecord = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-72 h-72 sm:w-96 sm:h-96">
      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border-2 border-primary/30 animate-pulse-ring" />
        <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border-2 border-primary/20 animate-pulse-ring-delayed" />
        <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border-2 border-primary/10 animate-pulse-ring-delayed-2" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, perspective: 800 }}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="animate-spin-slow w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-foreground relative"
          style={{
            background: "radial-gradient(circle at center, hsl(var(--primary)) 8%, #1A1A1A 9%, #1A1A1A 12%, #333 13%, #1A1A1A 14%, #1A1A1A 20%, #2a2a2a 21%, #1A1A1A 22%, #1A1A1A 30%, #333 31%, #1A1A1A 32%, #1A1A1A 40%, #2a2a2a 41%, #1A1A1A 42%, #1A1A1A 55%, #2a2a2a 56%, #1A1A1A 57%, #1A1A1A 70%, #333 71%, #1A1A1A 72%, #1A1A1A 85%, #2a2a2a 86%, #1A1A1A 87%)",
            boxShadow: "0 0 60px rgba(231,28,104,0.3), inset 0 0 30px rgba(0,0,0,0.5)"
          }}
        >
          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(231,28,104,0.5)] border-4 border-foreground/20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-primary-foreground/30 flex items-center justify-center">
              <span className="text-primary-foreground font-black text-[10px] sm:text-[12px] tracking-[0.2em] uppercase">PUCHO</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const springTransition = { type: "spring" as const, duration: 0.5, bounce: 0.2 };

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container-main grid lg:grid-cols-5 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
          className="lg:col-span-3 space-y-6"
        >
          <h1 className="heading-display text-foreground">
            Start Your Music Journey{" "}
            <span className="text-accent-highlight">Globally</span> with <span className="text-primary">Pucho</span> Music
          </h1>
          <p className="body-text text-muted-foreground max-w-xl">
            Join 50,000+ independent artists distributing to Spotify, Apple Music, and 250+ stores. You keep the rights. We handle the rest.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/signup">
              <Button variant="hero" size="xl">Get Started</Button>
            </Link>
            <Link to="/services">
              <Button variant="heroOutline" size="xl">Distribute Now</Button>
            </Link>
          </div>
          <div className="flex items-center gap-6 pt-2">
            <a href="https://facebook.com/puchomusic" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com/puchomusic" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com/puchomusic" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube size={20} />
            </a>
          </div>
          <p className="text-sm text-muted-foreground pt-2">
            ✓ No hidden fees · ✓ 24-48hr release · ✓ Keep 100% rights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="lg:col-span-2 flex items-center justify-center"
        >
          <VinylRecord />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
