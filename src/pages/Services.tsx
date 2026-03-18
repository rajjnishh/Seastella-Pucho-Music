import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ServicesSection from "@/components/ServicesSection";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Services;
