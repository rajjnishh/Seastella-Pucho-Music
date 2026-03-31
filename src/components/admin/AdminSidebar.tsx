import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Music, 
  Mic2, 
  Video, 
  Globe, 
  Settings, 
  BarChart3, 
  CreditCard,
  MessageSquare,
  Shield,
  ChevronRight,
  LogOut,
  Smartphone,
  Megaphone,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { puchoLogoBase64 as puchoLogo } from "@/assets/logo-base64";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, active, badge }) => (
  <Link
    to={href}
    className={cn(
      "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-primary text-white shadow-lg shadow-primary/20" 
        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={cn(active ? "text-white" : "group-hover:scale-110 transition-transform")} />
      <span className="font-medium">{label}</span>
    </div>
    {badge && (
      <span className={cn(
        "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
        active ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
      )}>
        {badge}
      </span>
    )}
    {active && <ChevronRight size={16} className="text-white/50" />}
  </Link>
);

export const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users", badge: "128" },
    { icon: Music, label: "Releases", href: "/admin/releases" },
    { icon: Mic2, label: "Artists", href: "/admin/artists" },
    { icon: Video, label: "Videos", href: "/admin/videos" },
    { icon: Globe, label: "Site Editor", href: "/admin/site" },
    { icon: Smartphone, label: "Platforms", href: "/admin/platforms" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Megaphone, label: "Announcements", href: "/admin/announcements" },
    { icon: FileText, label: "Legal", href: "/admin/legal" },
    { icon: CreditCard, label: "Finance", href: "/admin/finance" },
    { icon: MessageSquare, label: "Support", href: "/admin/support", badge: "4" },
  ];

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-card border-r border-border flex flex-col z-50">
      <div className="p-6 flex items-center gap-3 border-b border-border mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <img src={puchoLogo} alt="Logo" className="w-8 h-8 object-contain" />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-none">PUCHO <span className="text-primary">Admin</span></h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Management Suite</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-1 py-2">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 mb-2 mt-4">Main Menu</p>
        {menuItems.slice(0, 7).map((item) => (
          <SidebarItem 
            key={item.href} 
            icon={item.icon}
            label={item.label}
            href={item.href}
            badge={item.badge}
            active={currentPath === item.href || (item.href === "/admin" && currentPath === "/admin")} 
          />
        ))}

        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 mb-2 mt-6">Operations</p>
        {menuItems.slice(7).map((item) => (
          <SidebarItem 
            key={item.href} 
            icon={item.icon}
            label={item.label}
            href={item.href}
            badge={item.badge}
            active={currentPath === item.href} 
          />
        ))}
      </div>

      <div className="p-4 border-t border-border space-y-2">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};
