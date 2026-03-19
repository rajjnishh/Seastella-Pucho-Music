import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Audio",
    highlight: "Distribution",
    description: "<span className=\"text-primary\">Pucho</span> Music offers comprehensive audio distribution, including Content ID protection, fast delivery to major streaming stores, and detailed monthly revenue reports. We ensure your music reaches audiences swiftly while providing insights into your earnings.",
    image: "https://picsum.photos/seed/music-dist/800/600",
    reversed: false,
  },
  {
    number: "02",
    title: "VEVO Video",
    highlight: "Distribution",
    description: "Our Vevo video distribution service spans over 12 platforms, providing high revenue potential, enhanced visibility, and diverse monetization opportunities. Leverage our expertise to amplify your video content and increase your audience engagement.",
    image: "https://picsum.photos/seed/video-dist/800/600",
    reversed: true,
  },
  {
    number: "03",
    title: "MCN & CMS",
    highlight: "Services",
    description: "We provide a full range of MCN/CMS services across various categories, including entertainment, education, and lifestyle. Our solutions include visual Content ID protection, safeguarding your YouTube channel, and optimizing your revenue through premium AdSense strategies.",
    image: "https://picsum.photos/seed/mcn-cms/800/600",
    reversed: false,
  },
  {
    number: "04",
    title: "Copyright",
    highlight: "Management",
    description: "Protecting your creative work is our priority. <span className=\"text-primary\">Pucho</span> Music ensures comprehensive copyright management, helping you safeguard your intellectual property and providing peace of mind as you share your music with the world.",
    image: "https://picsum.photos/seed/copyright/800/600",
    reversed: true,
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-card" id="services">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="heading-section text-foreground">
            <span className="text-primary">Pucho</span> Music <span className="text-accent-highlight">Services</span>
          </h2>
          <p className="body-text text-muted-foreground mt-3">Reliable process for achieving distinctiveness.</p>
        </motion.div>

        <div className="space-y-24 lg:space-y-32">
          {services.map((service) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
              className={`flex flex-col ${service.reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-center`}
            >
              {/* Image Side */}
              <div className="flex-1 w-full">
                <div className="rounded-3xl overflow-hidden bg-background shadow-lg aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={`${service.title} ${service.highlight}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Text Side */}
              <div className="flex-1 space-y-5">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {service.title}
                  <br />
                  <span className="text-accent-highlight">{service.highlight}</span>
                </h3>
                <p 
                  className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
