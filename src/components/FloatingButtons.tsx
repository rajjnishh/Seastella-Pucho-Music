import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      <motion.a
        href="https://wa.me/9128830590"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.1 }}
        className="fab-button"
        style={{ backgroundColor: "#25D366" }}
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </motion.a>
      <motion.a
        href="tel:9128830590"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.1 }}
        className="fab-button bg-foreground"
        title="Call Us"
      >
        <Phone className="w-6 h-6 text-card" />
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
