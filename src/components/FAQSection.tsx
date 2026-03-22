import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to release my music?",
    answer: "Typically, your music will be live on major platforms like Spotify and Apple Music within 24 to 48 hours after submission, provided there are no issues with your metadata or artwork.",
  },
  {
    question: "Do I keep 100% of my rights?",
    answer: "Yes, absolutely. You retain 100% ownership of your music and copyrights. <span className=\"text-primary\">PUCHO</span> Music is strictly a distribution partner helping you reach global audiences.",
  },
  {
    question: "Which platforms do you distribute to?",
    answer: "We distribute to over 250+ digital stores and streaming platforms worldwide, including Spotify, Apple Music, YouTube Music, Amazon Music, JioSaavn, Gaana, and many more.",
  },
  {
    question: "How and when do I get paid?",
    answer: "Earnings are updated monthly in your dashboard. You can withdraw your royalties once you reach the minimum threshold through various payment methods including Bank Transfer and UPI.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No. We believe in transparency. There are no hidden setup fees or recurring annual charges for your releases. You keep the majority of your royalties as per your chosen plan.",
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer dedicated 'Super Support' via email and WhatsApp to help you with any distribution, copyright, or technical issues you might encounter.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-main max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-display text-foreground mb-4">
            Frequently Asked <span className="text-accent-highlight">Questions</span>
          </h2>
          <p className="body-text text-muted-foreground">
            Everything you need to know about distributing your music with <span className="text-primary">PUCHO</span> Music.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-card/10">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground body-text pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
