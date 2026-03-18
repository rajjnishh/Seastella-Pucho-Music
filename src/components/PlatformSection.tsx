import { motion } from "framer-motion";

const platforms = [
  { name: "Spotify", logo: "https://cdn.simpleicons.org/spotify/1DB954" },
  { name: "Apple Music", logo: "https://cdn.simpleicons.org/applemusic/FA243C" },
  { name: "YouTube", logo: "https://cdn.simpleicons.org/youtube/FF0000" },
  { name: "Deezer", logo: "https://cdn.simpleicons.org/deezer/00C7F2" },
  { name: "Tidal", logo: "https://cdn.simpleicons.org/tidal/000000" },
  { name: "SoundCloud", logo: "https://cdn.simpleicons.org/soundcloud/FF3300" },
  { name: "Pandora", logo: "https://cdn.simpleicons.org/pandora/00A0EE" },
  { name: "iHeartRadio", logo: "https://cdn.simpleicons.org/iheartradio/C6002B" },
  { name: "Napster", logo: "https://cdn.simpleicons.org/napster/252525" },
  { name: "Shazam", logo: "https://cdn.simpleicons.org/shazam/0088FF" },
  { name: "Beatport", logo: "https://cdn.simpleicons.org/beatport/01FF95" },
  { name: "Audiomack", logo: "https://cdn.simpleicons.org/audiomack/FFA200" },
];

const PlatformSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-main bg-secondary/30 backdrop-blur-sm rounded-[32px] p-8 md:p-12 border border-primary/10 shadow-sm">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm font-medium uppercase tracking-widest mb-10"
        >
          Distribute to 250+ Platforms Worldwide
        </motion.p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-10 items-center justify-items-center">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", bounce: 0.2 }}
              whileHover={{ 
                scale: 1.15,
                filter: "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.2))",
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="w-full aspect-square flex items-center justify-center p-2 cursor-pointer relative group"
              title={p.name}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-300">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-full h-full object-contain pointer-events-none transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
