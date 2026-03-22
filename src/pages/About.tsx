import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="section-padding pt-32">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="heading-display text-foreground">
              Why <span className="text-accent-highlight"><span className="text-primary">PUCHO</span> Music?</span>
            </h1>
            <p className="body-text text-muted-foreground mt-6">
              <span className="text-primary">PUCHO</span> Music stands out as a premier choice for artists and labels seeking robust music distribution services. Our commitment to empowering creators and maximizing their reach in the global market makes us an ideal partner for your musical journey.
            </p>
            <p className="body-text text-muted-foreground mt-4">
              We believe every artist deserves access to the global stage. With distribution to 250+ platforms across 200+ countries, we handle the technical complexity so you can focus on creating. You keep 100% of your rights — always.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { title: "Artist-First", desc: "Every decision we make puts the artist's interests first." },
              { title: "Global Reach", desc: "250+ platforms, 200+ countries, unlimited potential." },
              { title: "Transparent", desc: "No hidden fees. Monthly royalties. Clear reporting." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="card-surface p-8"
              >
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default About;
