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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(231,28,104,0.5)] border-4 border-foreground/20">
            <img src="/pucho-logo.png" alt="PUCHO Music Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const springTransition = { type: "spring" as const, duration: 0.5, bounce: 0.2 };

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1920"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-recording-studio-with-a-singer-and-a-microphone-4375-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="container-main grid lg:grid-cols-5 gap-12 items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
          className="lg:col-span-3 space-y-6"
        >
          <h1 className="heading-display text-white">
            Start Your Music Journey{" "}
            <span className="text-white">Globally</span> with <span className="whitespace-nowrap"><span className="text-primary">PUCHO</span> Music</span>
          </h1>
          <p className="body-text text-gray-200 max-w-xl">
            Join 50,000+ independent artists distributing to Spotify, Apple Music, and 250+ stores. You keep the rights. We handle the rest.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/signup">
              <Button variant="hero" size="xl">Get Started</Button>
            </Link>
            <Link to="/services">
              <Button variant="heroOutline" size="xl" className="border-white text-white hover:bg-white hover:text-black">Distribute Now</Button>
            </Link>
          </div>

          <div className="flex flex-col items-start w-full space-y-4 pt-4">
            <div className="flex items-center gap-6">
              <a href="https://facebook.com/PUCHOMusic" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/PUCHOMusic" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/PUCHOMusic" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-400 text-left">
              ✓ No hidden fees · ✓ 24-48hr release · ✓ Keep 100% rights
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="lg:col-span-2 flex flex-col items-center justify-center gap-8"
        >
          <VinylRecord />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
