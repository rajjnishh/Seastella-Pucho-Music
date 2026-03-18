import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { motion, useScroll, useSpring } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Twitter, Linkedin, Share2, CheckCircle2, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const posts = [
  { id: "1", title: "How to Get Your Music on Spotify in 2025", category: "Distribution", excerpt: "A step-by-step guide to distributing your music to Spotify and getting verified as an artist.", content: "This is the full content for the Spotify distribution guide. In 2025, getting your music on Spotify is easier than ever with Pucho Music. First, ensure your audio files are high quality. Next, prepare your artwork according to Spotify's guidelines. Finally, use the Pucho Music dashboard to submit your release. We handle the rest, ensuring your music is live within 24-48 hours." },
  { id: "2", title: "Understanding Music Royalties", category: "Monetization", excerpt: "Everything you need to know about how royalties work and how to maximize your earnings.", content: "Music royalties can be complex, but they are essential for every artist to understand. There are mechanical royalties, performance royalties, and synchronization royalties. Pucho Music helps you collect these by distributing to all major platforms and providing detailed monthly reports. Maximize your earnings by ensuring all your metadata is correct and your music is registered properly." },
  { id: "3", title: "VEVO Channel: Why Every Artist Needs One", category: "Video", excerpt: "Learn how a VEVO channel can boost your credibility and revenue as an independent artist.", content: "A VEVO channel is a mark of professional quality for any music artist. It provides higher ad rates and better visibility on YouTube. Pucho Music can help you set up your VEVO channel and distribute your music videos to over 12 platforms. This not only boosts your credibility but also opens up new monetization opportunities." },
  { id: "4", title: "Content ID Protection Explained", category: "Copyright", excerpt: "How Content ID works across YouTube, Meta, and TikTok to protect your creative work.", content: "Content ID is a powerful tool that helps you protect your music from unauthorized use. When someone uses your music in their video, Content ID identifies it and allows you to either block the video or monetize it. Pucho Music provides comprehensive Content ID protection across YouTube, Meta, and TikTok, ensuring you get paid for every use of your sound." },
  { id: "5", title: "Building Your Brand as an Independent Artist", category: "Growth", excerpt: "Proven strategies to build a loyal fanbase and grow your music career independently.", content: "Building a brand is about more than just the music; it's about your story and how you connect with your audience. Use social media to engage with fans, create consistent visual content, and be authentic. Pucho Music supports your growth by providing the tools you need to distribute your music globally while you focus on building your community." },
  { id: "6", title: "MCN Services: Maximizing YouTube Revenue", category: "MCN", excerpt: "How Multi-Channel Network services can help optimize your YouTube channel and earnings.", content: "Multi-Channel Networks (MCNs) offer specialized services to help YouTube creators grow and monetize their channels. Pucho Music's MCN services include visual Content ID protection, channel optimization, and access to premium AdSense strategies. This helps you safeguard your channel and maximize your revenue potential." },
];

const BlogPost = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const shareUrl = window.location.href;
  const shareTitle = post?.title || "Check out this post from Pucho Music";

  const handleShare = (platform: 'twitter' | 'linkedin' | 'generic') => {
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'generic') {
      if (navigator.share) {
        navigator.share({
          title: shareTitle,
          url: shareUrl,
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="section-padding pt-32">
          <div className="container-main text-center">
            <h1 className="heading-display text-foreground">Post Not Found</h1>
            <Link to="/blog" className="mt-8 inline-block">
              <Button variant="heroOutline">Back to Blog</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <section className="section-padding pt-32 pb-20">
        <div className="container-main max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Navigation & Category */}
            <div className="flex flex-col gap-6 mb-12">
              <Link to="/blog" className="group inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
                  {post.category}
                </span>
                <span className="text-muted-foreground text-sm">5 min read</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.2] tracking-tight mb-8">
                {post.title}
              </h1>
              
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-10">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rajnish" 
                    alt="Rajnish" 
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">R</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-bold text-foreground">Rajnish</p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Music Industry Expert • Pucho Music</p>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium border-l-4 border-primary/30 pl-6 py-2">
                {post.excerpt}
              </p>
            </header>

            {/* Share Button */}
            <div className="flex items-center gap-4 mb-12 py-6 border-y border-border/50">
              <span className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">Share:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <Share2 size={16} />
                    Share Post
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem onClick={() => handleShare('twitter')} className="gap-2 cursor-pointer">
                    <Twitter size={16} className="text-[#1DA1F2]" />
                    Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('linkedin')} className="gap-2 cursor-pointer">
                    <Linkedin size={16} className="text-[#0A66C2]" />
                    LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('generic')} className="gap-2 cursor-pointer">
                    <Share2 size={16} />
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Main Content */}
            <article className="body-text text-foreground/90 space-y-8 leading-[1.8]">
              <p className="text-lg">
                {post.content}
              </p>

              {/* Highlight Box */}
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                viewport={{ once: true }}
                className="bg-card border border-primary/20 p-8 rounded-2xl shadow-sm my-10"
              >
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" />
                  Key Takeaway
                </h3>
                <p className="text-muted-foreground italic">
                  Success in the music industry today requires a combination of great art and smart distribution. Pucho Music bridges that gap for independent creators.
                </p>
              </motion.div>

              <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">Why it matters for you</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              {/* Bullet Points Section */}
              <div className="grid gap-4 my-10">
                {[
                  "Global reach to 250+ digital stores",
                  "Keep 100% of your rights and royalties",
                  "Fast 24-48 hour release times",
                  "Dedicated support for independent artists"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Music className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </article>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-10 rounded-[40px] bg-foreground text-background text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32" />
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to take your music global?</h2>
              <p className="text-background/70 mb-10 max-w-lg mx-auto relative z-10">
                Join 50,000+ artists who trust Pucho Music for their distribution and growth.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="bg-primary hover:bg-primary/90">
                    Start Distributing Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="heroOutline" size="xl" className="border-background text-background hover:bg-background hover:text-foreground">
                    Talk to an Expert
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default BlogPost;
