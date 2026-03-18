import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-md py-0"
          : "bg-transparent border-b border-transparent py-2"
      )}
    >
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground"><span className="text-primary">Pucho</span> Music</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-secondary/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-primary/20 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                location.pathname === link.href
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/30"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="hero" size="default">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden shadow-lg"
          >
            <div className="container-main py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-foreground font-medium transition-colors",
                    location.pathname === link.href ? "bg-secondary" : "hover:bg-secondary/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border mt-2">
                <Link to="/login" className="w-full">
                  <Button variant="heroOutline" className="w-full">Log In</Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button variant="hero" className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
