import { motion } from "framer-motion";

const testimonials = [
  { 
    name: "Aman Raj", 
    role: "Independent Artist", 
    text: "PUCHO Music transformed my career. I went from zero streams to charting in multiple countries within months. Their distribution speed is unmatched." 
  },
  { 
    name: "Rohan Das", 
    role: "Music Producer", 
    text: "The best distribution platform I've used. The support team responds within hours, and royalties are always transparent and on time. Highly recommended for serious artists." 
  },
  { 
    name: "Meera Kapoor", 
    role: "Label Owner", 
    text: "Managing my entire label through PUCHO Music has been seamless. The dashboard is intuitive, and having unlimited distribution for all my artists is a game-changer." 
  },
  { 
    name: "Vikram Singh", 
    role: "Singer-Songwriter", 
    text: "I love how easy it is to get my music on Spotify and Apple Music. PUCHO Music handles everything, allowing me to focus entirely on my creativity." 
  },
  { 
    name: "Ananya Sharma", 
    role: "Folk Artist", 
    text: "Finally a platform that understands the needs of independent artists in India. The localized support and easy payout options are exactly what I needed." 
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-card overflow-hidden">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="heading-section text-foreground">
            What Artists <span className="text-accent-highlight">Say</span>
          </h2>
        </motion.div>
      </div>

      <div className="flex gap-6 animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="card-surface p-6 w-80 shrink-0 ml-6 first:ml-0 flex flex-col justify-between"
          >
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
              "{t.text.replace(/PUCHO Music/g, 'PUCHO Music')}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-primary">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
