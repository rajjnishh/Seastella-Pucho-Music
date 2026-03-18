import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-surface p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-[32px]" />
          <div className="relative z-10">
            <h2 className="heading-display text-foreground max-w-2xl mx-auto">
              Ready to Go <span className="text-accent-highlight">Global?</span>
            </h2>
            <p className="body-text text-muted-foreground mt-4 max-w-lg mx-auto">
              Join thousands of independent artists who trust <span className="text-primary">Pucho</span> Music to distribute their sound worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/signup">
                <Button variant="hero" size="xl">Get Started Free</Button>
              </Link>
              <Link to="/contact">
                <Button variant="heroOutline" size="xl">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
