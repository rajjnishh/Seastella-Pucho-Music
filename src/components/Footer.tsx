import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import puchoLogo from "@/assets/pucho-logo-new.png";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/PUCHOMusicBhojpuri", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/PUCHO_music_bhojpuri/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@PUCHOmusicbhojpuri", label: "YouTube" },
  ];

  return (
    <footer className="bg-card text-foreground border-t border-border py-12 md:py-16">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-secondary/50 rounded-2xl p-4 flex items-center gap-3 border border-border/50">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">puchomusic44@gmail.com</span>
            </div>
            <div className="bg-secondary/50 rounded-2xl p-4 flex items-start gap-3 border border-border/50">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Address - 1903, Hanuman Mandir road, Kokan Nagar, Bhandup, west, Mumbai, India</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-primary mb-4">Services</h4>
            <ul className="space-y-2">
              {["Audio Distribution", "Video Distribution", "MCN/CMS", "Super Support"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold text-primary mb-4">Useful Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Client Sign-up", href: "/signup" },
                { label: "Client Login", href: "/login" },
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "Distribution Agreement", href: null },
              ].map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <Link to={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground transition-colors cursor-default">
                      {l.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-border pt-4 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shadow-md border border-border/50">
              <img src={puchoLogo} alt="PUCHO Music Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-primary text-sm font-medium mb-2">Follow us:</p>
          <div className="flex justify-center gap-4 mb-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">© 2025 <span className="text-primary">PUCHO</span> Music. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
