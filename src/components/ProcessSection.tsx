import { motion } from "framer-motion";
import { Upload, Globe, DollarSign, CheckCircle, Megaphone } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload", description: "Upload your music with metadata and artwork in minutes." },
  { icon: CheckCircle, title: "Verification", description: "We review and prepare your content to ensure it meets platform standards." },
  { icon: Globe, title: "Distribution", description: "Distribute your music to 250+ platforms across 200+ countries." },
  { icon: Megaphone, title: "Promotion", description: "Boost visibility through marketing tools and audience engagement." },
  { icon: DollarSign, title: "Monetization", description: <>Earn royalties, track revenue,<br />and grow your audience with<br />complete transparency.</> },
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
          <p className="body-text text-muted-foreground mt-3">Simple steps to go global.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", bounce: 0.2 }}
              className="card-surface p-6 text-center relative flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-[10px] font-bold text-primary mb-2 block uppercase tracking-wider">Step {i + 1}</span>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
