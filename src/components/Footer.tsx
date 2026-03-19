import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Music } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/PuchoMusicBhojpuri", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/pucho_music_bhojpuri/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@puchomusicbhojpuri", label: "YouTube" },
  ];

  return (
    <footer className="bg-card text-foreground border-t border-border section-padding">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-secondary/50 rounded-2xl p-4 flex items-center gap-3 border border-border/50">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">contact@puchomusic.com</span>
            </div>
            <div className="bg-secondary/50 rounded-2xl p-4 flex items-center gap-3 border border-border/50">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">+91 9128830590</span>
            </div>
            <div className="bg-secondary/50 rounded-2xl p-4 flex items-start gap-3 border border-border/50">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div className="text-sm text-muted-foreground space-y-1">
                <p>India Office: Kanti factory road, Mahatma Gandhi Nagar, Patna, Patna, India, Bihar</p>
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
        <div className="border-t border-border pt-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-md border border-border/50">
              <Music className="w-8 h-8 text-primary" />
            </div>
          </div>
          <p className="text-primary text-sm font-medium mb-4">Follow us:</p>
          <div className="flex justify-center gap-4 mb-6">
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
          <p className="text-muted-foreground text-sm">© 2025 <span className="text-primary">Pucho</span> Music. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
