import { motion } from "framer-motion";
import { Upload, Globe, DollarSign } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload", description: "Upload your music with metadata and artwork in minutes." },
  { icon: Globe, title: "Distribution", description: "We distribute to 250+ platforms across 200+ countries." },
  { icon: DollarSign, title: "Monetization", description: "Earn royalties, track revenue, and grow your audience." },
];

const ProcessSection = () => {
  return (
    <section className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground">
            How It <span className="text-accent-highlight">Works</span>
          </h2>
          <p className="body-text text-muted-foreground mt-3">Three simple steps to go global.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", bounce: 0.2 }}
              className="card-surface p-8 text-center relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-primary/30" />
              )}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary mb-2 block">Step {i + 1}</span>
              <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
