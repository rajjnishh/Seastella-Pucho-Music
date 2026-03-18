import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "0₹",
    period: "one-time",
    popular: false,
    features: [
      "1 Artist Profile",
      "Unlimited Distribution",
      "150+ Digital Stores",
      "80% Royalties",
      "Monthly Sales Reports",
      "3-5 Days Release Time",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    price: "2,999₹",
    period: "one-time",
    popular: true,
    features: [
      "5 Artist Profiles",
      "Unlimited Distribution",
      "250+ Digital Stores",
      "100% Royalties",
      "YouTube Official Artist Channel",
      "Spotify Verified Artist Checkmark",
      "1 VEVO Channel",
      "Content ID Protection",
      "Monthly Sales Reports",
      "Spotify Playlist Pitching",
      "24-48 Hours Release Time",
      "Priority WhatsApp Support",
      "DMCA Support",
    ],
  },
  {
    name: "Enterprise",
    price: "9,999₹",
    period: "one-time",
    popular: false,
    features: [
      "Unlimited Artist Profiles",
      "Unlimited Distribution",
      "250+ Digital Stores",
      "100% Royalties",
      "Unlimited YouTube Official Artist Channel",
      "Spotify Verified Artist Checkmark",
      "Unlimited VEVO Channels",
      "Content ID Protection",
      "Monthly Sales Reports",
      "Spotify Playlist Pitching",
      "24-48 Hours Release Time",
      "Dedicated Manager Support",
      "1 Custom Label",
      "DMCA Support",
    ],
  },
];

const PricingSection = () => {
  return (
    <section className="section-padding" id="pricing">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground">
            Listing <span className="text-accent-highlight">Pricing</span> Plans
          </h2>
          <p className="body-text text-muted-foreground mt-3">We make best services for you</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.2, duration: 0.6 } }
              }}
              className={`card-surface p-8 relative flex flex-col h-full ${plan.popular ? "border-2 border-primary shadow-lg shadow-primary/10" : ""}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-2xl font-bold text-primary mt-2">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground ml-1">/{plan.period}</span>
              </p>

              <ul className="mt-6 space-y-3 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.name === "Enterprise" ? "/contact" : "/signup"} className="block mt-8">
                <Button variant={plan.popular ? "hero" : "heroOutline"} size="xl" className="w-full">
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
