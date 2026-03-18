import { motion } from "framer-motion";

const testimonials = [
  { name: "Aman Raj", role: "Independent Artist, NRI", text: "<span className=\"text-primary\">Pucho</span> Music transformed my career. I went from zero streams to charting in multiple countries within months." },
  { name: "Priya Sharma", role: "Singer-Songwriter, Rank #42", text: "The VEVO channel and Content ID protection gave me the credibility I needed as an independent artist." },
  { name: "Rohan Das", role: "Music Producer, NRI", text: "Best distribution platform I've used. The support team responds within hours, and royalties are always on time." },
  { name: "Meera Kapoor", role: "Label Owner, Rank #15", text: "Managing my entire label through <span className=\"text-primary\">Pucho</span> Music has been seamless. Unlimited artists, unlimited distribution." },
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

      <div className="flex gap-6 animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="card-surface p-6 w-80 shrink-0 ml-6 first:ml-0"
          >
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
            <div>
              <p className="font-bold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-primary">{t.role}</p>
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
