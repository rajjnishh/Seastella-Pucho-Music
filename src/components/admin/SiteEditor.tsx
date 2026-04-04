import React from "react";
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit2, 
  Layout, 
  Package, 
  FileText,
  BarChart3,
  Music,
  Tv,
  Shield,
  Star,
  Users,
  Award,
  Globe,
  Zap,
  Pencil,
  MessageSquare,
  Link as LinkIcon,
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Service, PricingPlan, BlogPost, SiteSettings, Stat } from "@/lib/useAdmin";

const iconMap: Record<string, any> = {
  Music, Tv, Shield, Star, Users, Award, Globe, Zap
};

interface SiteEditorProps {
  siteSettings: SiteSettings | null;
  services: Service[];
  pricingPlans: PricingPlan[];
  stats: Stat[];
  blogPosts: BlogPost[];
  setEditingSettings: (settings: SiteSettings) => void;
  setIsSettingsDialogOpen: (open: boolean) => void;
  setEditingService: (service: Partial<Service>) => void;
  setIsServiceDialogOpen: (open: boolean) => void;
  setEditingPlan: (plan: Partial<PricingPlan>) => void;
  setIsPlanDialogOpen: (open: boolean) => void;
  setEditingStat: (stat: Partial<Stat>) => void;
  setIsStatDialogOpen: (open: boolean) => void;
  setEditingPost: (post: Partial<BlogPost>) => void;
  setIsBlogDialogOpen: (open: boolean) => void;
  handleDeleteItem: (type: 'release' | 'artist' | 'video' | 'service' | 'plan' | 'stat' | 'blog', id: string) => void;
  profile: any;
}

export const SiteEditor = ({
  siteSettings,
  services,
  pricingPlans,
  stats,
  blogPosts,
  setEditingSettings,
  setIsSettingsDialogOpen,
  setEditingService,
  setIsServiceDialogOpen,
  setEditingPlan,
  setIsPlanDialogOpen,
  setEditingStat,
  setIsStatDialogOpen,
  setEditingPost,
  setIsBlogDialogOpen,
  handleDeleteItem,
  profile
}: SiteEditorProps) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Site Editor</h2>
          <p className="text-muted-foreground">Manage your website content and appearance.</p>
        </div>
        <Button 
          onClick={() => {
            setEditingSettings(siteSettings || { 
              heroTitle: "", 
              heroSubtitle: "", 
              contactEmail: "", 
              contactPhone: "", 
              address: "", 
              navbarLinks: [], 
              footerLinks: [],
              primaryColor: "#000000",
              secondaryColor: "#000000"
            });
            setIsSettingsDialogOpen(true);
          }}
          className="rounded-xl flex items-center gap-2"
        >
          <Settings size={18} />
          Global Settings
        </Button>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl w-full md:w-auto overflow-x-auto flex-nowrap justify-start">
          <TabsTrigger value="services" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2">
            <Layout size={16} /> Services
          </TabsTrigger>
          <TabsTrigger value="plans" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2">
            <Package size={16} /> Pricing Plans
          </TabsTrigger>
          <TabsTrigger value="stats" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2">
            <BarChart3 size={16} /> Stats
          </TabsTrigger>
          <TabsTrigger value="blog" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2">
            <FileText size={16} /> Blog Posts
          </TabsTrigger>
          <TabsTrigger value="navigation" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2">
            <Navigation size={16} /> Navigation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Services</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setEditingService({ title: "", description: "", icon: "Music", order: services.length });
                setIsServiceDialogOpen(true);
              }}
              className="rounded-xl flex items-center gap-2"
            >
              <Plus size={16} /> Add Service
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="rounded-2xl border-muted/50 overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {React.createElement(iconMap[service.icon] || Music, { size: 20 })}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => {
                        setEditingService(service);
                        setIsServiceDialogOpen(true);
                      }}>
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive" onClick={() => handleDeleteItem('service', service.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Pricing Plans</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setEditingPlan({ 
                  name: "", 
                  price: 0, 
                  description: "", 
                  features: [], 
                  isPopular: false, 
                  buttonText: "Get Started",
                  currency: "₹",
                  hasFreeTrial: false,
                  trialDays: 0
                });
                setIsPlanDialogOpen(true);
              }}
              className="rounded-xl flex items-center gap-2"
            >
              <Plus size={16} /> Add Plan
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`rounded-2xl border-muted/50 overflow-hidden relative ${plan.isPopular ? 'ring-2 ring-primary' : ''}`}>
                {plan.isPopular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-xl">Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-foreground">
                    {plan.currency} {plan.price}
                  </CardDescription>
                  {plan.hasFreeTrial && (
                    <Badge variant="outline" className="w-fit mt-1 text-[10px]">
                      {plan.trialDays} Days Free Trial
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 pt-4">
                    <Button variant="outline" className="flex-1 rounded-xl" onClick={() => {
                      setEditingPlan(plan);
                      setIsPlanDialogOpen(true);
                    }}>Edit</Button>
                    <Button variant="ghost" size="icon" className="rounded-xl text-destructive" onClick={() => handleDeleteItem('plan', plan.id)}>
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Stats</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setEditingStat({ label: "", value: "", icon: "Music", order: stats.length });
                setIsStatDialogOpen(true);
              }}
              className="rounded-xl flex items-center gap-2"
            >
              <Plus size={16} /> Add Stat
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <Card key={stat.id} className="rounded-2xl border-muted/50 overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {React.createElement(iconMap[stat.icon] || Music, { size: 20 })}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => {
                        setEditingStat(stat);
                        setIsStatDialogOpen(true);
                      }}>
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive" onClick={() => handleDeleteItem('stat', stat.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-black mt-2">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Blog Posts</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setEditingPost({ title: "", excerpt: "", content: "", author: profile?.displayName || "", category: "News", date: new Date().toISOString().split('T')[0], published: true });
                setIsBlogDialogOpen(true);
              }}
              className="rounded-xl flex items-center gap-2"
            >
              <Plus size={16} /> New Post
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {blogPosts.map((post) => (
              <Card key={post.id} className="rounded-2xl border-muted/50 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {post.image && (
                    <div className="w-full md:w-48 h-32 md:h-auto shrink-0 bg-muted">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={post.published ? "default" : "secondary"}>{post.published ? "Published" : "Draft"}</Badge>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h4 className="text-lg font-bold">{post.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl" onClick={() => {
                          setEditingPost(post);
                          setIsBlogDialogOpen(true);
                        }}>Edit</Button>
                        <Button variant="ghost" size="icon" className="rounded-xl text-destructive" onClick={() => handleDeleteItem('blog', post.id)}>
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="navigation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-2xl border-muted/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Navbar Links</CardTitle>
                  <CardDescription>Links shown in the top navigation bar.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => {
                  if (siteSettings) {
                    const newLinks = [...(siteSettings.navbarLinks || []), { label: "New Link", href: "#" }];
                    setEditingSettings({ ...siteSettings, navbarLinks: newLinks });
                    setIsSettingsDialogOpen(true);
                  }
                }}>
                  <Plus size={16} className="mr-2" /> Add Link
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {siteSettings?.navbarLinks?.map((link, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50 group">
                      <Navigation size={16} className="text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{link.label}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{link.href}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {
                        if (siteSettings) {
                          const newLinks = siteSettings.navbarLinks.filter((_, index) => index !== i);
                          setEditingSettings({ ...siteSettings, navbarLinks: newLinks });
                          setIsSettingsDialogOpen(true);
                        }
                      }}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                  {(!siteSettings?.navbarLinks || siteSettings.navbarLinks.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-4">No navbar links defined.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-muted/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Footer Links</CardTitle>
                  <CardDescription>Links shown in the website footer.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => {
                  if (siteSettings) {
                    const newLinks = [...(siteSettings.footerLinks || []), { label: "New Link", href: "#" }];
                    setEditingSettings({ ...siteSettings, footerLinks: newLinks });
                    setIsSettingsDialogOpen(true);
                  }
                }}>
                  <Plus size={16} className="mr-2" /> Add Link
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {siteSettings?.footerLinks?.map((link, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50 group">
                      <LinkIcon size={16} className="text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{link.label}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{link.href}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {
                        if (siteSettings) {
                          const newLinks = siteSettings.footerLinks.filter((_, index) => index !== i);
                          setEditingSettings({ ...siteSettings, footerLinks: newLinks });
                          setIsSettingsDialogOpen(true);
                        }
                      }}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                  {(!siteSettings?.footerLinks || siteSettings.footerLinks.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-4">No footer links defined.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
