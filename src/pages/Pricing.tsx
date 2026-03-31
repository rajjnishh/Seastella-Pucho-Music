import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";

const defaultPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "one-time",
    description: "Perfect for new artists starting their journey.",
    features: [
      "1 Artist Profile",
      "Unlimited Distribution",
      "150+ Digital Stores",
      "80% Royalties",
      "Monthly Sales Reports",
      "3-5 Days Release Time",
      "Email Support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹2,999",
    period: "one-time",
    description: "The complete toolkit for growing artists.",
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
    buttonText: "Go Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹9,999",
    period: "one-time",
    description: "For labels and high-volume creators.",
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
    buttonText: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  const { plans: cmsPlans, loading } = useSiteContent();

  const displayPlans = cmsPlans.length > 0
    ? cmsPlans.map(p => ({
        name: p.name,
        price: p.price,
        period: "one-time",
        description: p.description,
        features: p.features,
        buttonText: p.buttonText,
        popular: p.isPopular
      }))
    : defaultPlans;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="section-padding pt-32">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="heading-display text-foreground">
              Transparent <span className="text-accent-highlight">Pricing</span>
            </h1>
            <p className="body-text text-muted-foreground mt-4 max-w-2xl mx-auto">
              Choose the plan that fits your musical journey. No hidden fees, no recurring annual charges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {displayPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card-surface p-8 flex flex-col h-full relative ${plan.popular ? "border-2 border-primary shadow-lg shadow-primary/10" : "border border-border/50"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={plan.name === "Enterprise" ? "/contact" : "/signup"} className="w-full">
                  <Button variant={plan.popular ? "hero" : "heroOutline"} className="w-full" size="lg">
                    {plan.buttonText || (plan.name === "Enterprise" ? "Contact Sales" : "Get Started")}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Ready to start your journey?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button variant="hero" size="xl">Get Started Free</Button>
              </Link>
              <Link to="/contact">
                <Button variant="heroOutline" size="xl">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Pricing;
