import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useSiteContent } from "@/lib/useSiteContent";

const defaultPosts = [
  { id: "1", title: "How to Get Your Music on Spotify in 2025", category: "Distribution", excerpt: "A step-by-step guide to distributing your music to Spotify and getting verified as an artist." },
  { id: "2", title: "Understanding Music Royalties", category: "Monetization", excerpt: "Everything you need to know about how royalties work and how to maximize your earnings." },
  { id: "3", title: "VEVO Channel: Why Every Artist Needs One", category: "Video", excerpt: "Learn how a VEVO channel can boost your credibility and revenue as an independent artist." },
  { id: "4", title: "Content ID Protection Explained", category: "Copyright", excerpt: "How Content ID works across YouTube, Meta, and TikTok to protect your creative work." },
  { id: "5", title: "Building Your Brand as an Independent Artist", category: "Growth", excerpt: "Proven strategies to build a loyal fanbase and grow your music career independently." },
  { id: "6", title: "MCN Services: Maximizing YouTube Revenue", category: "MCN", excerpt: "How Multi-Channel Network services can help optimize your YouTube channel and earnings." },
];

const Blog = () => {
  const { posts: cmsPosts } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const displayPosts = useMemo(() => {
    return cmsPosts.length > 0 ? cmsPosts.filter(p => p.published) : defaultPosts;
  }, [cmsPosts]);

  const categories = useMemo(() => {
    const cats = new Set(displayPosts.map(p => p.category));
    return ["All", ...Array.from(cats)];
  }, [displayPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return displayPosts;
    return displayPosts.filter(p => p.category === selectedCategory);
  }, [selectedCategory, displayPosts]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="section-padding pt-40 pb-20 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-highlight/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container-main relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground leading-[1.1] tracking-tight">
              <span className="text-primary">PUCHO</span> Music <br />
              <span className="text-accent-highlight">Insights</span> & Blog
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-8 max-w-2xl leading-relaxed">
              Expert guides, industry news, and success strategies for the modern independent artist.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  selectedCategory === cat
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                    : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="group block bg-card border border-border/50 p-8 h-full rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                    
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                      {post.category}
                    </span>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                      Read Full Post
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Blog;
