import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { 
  Loader2, 
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { useAdmin, Service, PricingPlan, BlogPost, SiteSettings, Stat, Platform, Announcement, Policy } from "@/lib/useAdmin";
import { useProfile } from "@/lib/useProfile";
import { useAuth } from "@/lib/useAuth";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { UserManagement } from "@/components/admin/UserManagement";
import { ContentManagement } from "@/components/admin/ContentManagement";
import { SiteEditor } from "@/components/admin/SiteEditor";
import { PlatformManagement } from "@/components/admin/PlatformManagement";
import { AnnouncementManagement } from "@/components/admin/AnnouncementManagement";
import { PolicyManagement } from "@/components/admin/PolicyManagement";

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { 
    users, 
    releases, 
    artists, 
    videos, 
    siteSettings,
    services,
    pricingPlans,
    platforms,
    announcements,
    policies,
    blogPosts,
    stats, 
    loading: adminLoading, 
    updateUserRole, 
    deleteUser,
    deleteRelease,
    deleteArtist,
    deleteVideo,
    updateReleaseStatus,
    updateArtistStatus,
    updateVideoStatus,
    updateSiteSettings,
    saveService,
    deleteService,
    savePricingPlan,
    deletePricingPlan,
    savePlatform,
    deletePlatform,
    saveAnnouncement,
    deleteAnnouncement,
    savePolicy,
    deletePolicy,
    saveStat,
    deleteStat,
    saveBlogPost,
    deleteBlogPost
  } = useAdmin();

  const [search, setSearch] = useState("");
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [isPlatformDialogOpen, setIsPlatformDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false);
  const [isStatDialogOpen, setIsStatDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: string, id: string} | null>(null);
  
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingPlan, setEditingPlan] = useState<Partial<PricingPlan> | null>(null);
  const [editingPlatform, setEditingPlatform] = useState<Partial<Platform> | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Partial<Announcement> | null>(null);
  const [editingPolicy, setEditingPolicy] = useState<Partial<Policy> | null>(null);
  const [editingStat, setEditingStat] = useState<Partial<Stat> | null>(null);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [editingSettings, setEditingSettings] = useState<SiteSettings | null>(null);

  if (profileLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading management suite...</p>
        </div>
      </div>
    );
  }

  const isSuperAdmin = user?.email === 'iamtheironman0505@gmail.com';

  if (profile?.role !== 'admin' && !isSuperAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-background p-4">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
          <AlertCircle size={40} />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
          <p className="text-muted-foreground max-w-md">
            You do not have administrative privileges to access this panel. Please contact the system administrator if you believe this is an error.
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard")} className="rounded-xl px-8">Return to Dashboard</Button>
      </div>
    );
  }

  const handleRoleChange = async (userId: string, currentRole: 'artist' | 'admin') => {
    const newRole = currentRole === 'admin' ? 'artist' : 'admin';
    try {
      await updateUserRole(userId, newRole);
      toast.success(`User role updated to ${newRole}`);
    } catch (err) {
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = (userId: string) => {
    setItemToDelete({ type: 'user', id: userId });
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleDeleteItem = (type: 'release' | 'artist' | 'video' | 'service' | 'plan' | 'stat' | 'blog' | 'platform' | 'announcement' | 'policy', id: string) => {
    setItemToDelete({ type, id });
    setIsConfirmDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;
    try {
      if (type === 'release') await deleteRelease(id);
      if (type === 'artist') await deleteArtist(id);
      if (type === 'video') await deleteVideo(id);
      if (type === 'service') await deleteService(id);
      if (type === 'plan') await deletePricingPlan(id);
      if (type === 'platform') await deletePlatform(id);
      if (type === 'announcement') await deleteAnnouncement(id);
      if (type === 'policy') await deletePolicy(id);
      if (type === 'stat') await deleteStat(id);
      if (type === 'blog') await deleteBlogPost(id);
      if (type === 'user') await deleteUser(id);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted`);
    } catch (err) {
      toast.error(`Failed to delete ${type}`);
    } finally {
      setIsConfirmDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSaveSettings = async () => {
    if (!editingSettings) return;
    try {
      await updateSiteSettings(editingSettings);
      toast.success("Site settings updated");
      setIsSettingsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  const handleSaveService = async () => {
    if (!editingService) return;
    try {
      await saveService(editingService);
      toast.success("Service saved");
      setIsServiceDialogOpen(false);
      setEditingService(null);
    } catch (error) {
      toast.error("Failed to save service");
    }
  };

  const handleSavePlan = async () => {
    if (!editingPlan) return;
    try {
      // Trim features before saving
      const planToSave = {
        ...editingPlan,
        features: editingPlan.features?.map(f => f.trim()).filter(f => f !== "") || []
      };
      await savePricingPlan(planToSave);
      toast.success("Pricing plan saved");
      setIsPlanDialogOpen(false);
      setEditingPlan(null);
    } catch (error) {
      toast.error("Failed to save plan");
    }
  };

  const handleSavePlatform = async () => {
    if (!editingPlatform) return;
    try {
      await savePlatform(editingPlatform);
      toast.success("Platform saved");
      setIsPlatformDialogOpen(false);
      setEditingPlatform(null);
    } catch (error) {
      toast.error("Failed to save platform");
    }
  };

  const handleSaveAnnouncement = async () => {
    if (!editingAnnouncement) return;
    try {
      await saveAnnouncement(editingAnnouncement);
      toast.success("Announcement saved");
      setIsAnnouncementDialogOpen(false);
      setEditingAnnouncement(null);
    } catch (error) {
      toast.error("Failed to save announcement");
    }
  };

  const handleSavePolicy = async () => {
    if (!editingPolicy) return;
    try {
      await savePolicy(editingPolicy);
      toast.success("Policy saved");
      setIsPolicyDialogOpen(false);
      setEditingPolicy(null);
    } catch (error) {
      toast.error("Failed to save policy");
    }
  };

  const handleSaveStat = async () => {
    if (!editingStat) return;
    try {
      await saveStat(editingStat);
      toast.success("Stat saved");
      setIsStatDialogOpen(false);
      setEditingStat(null);
    } catch (error) {
      toast.error("Failed to save stat");
    }
  };

  const handleSaveBlog = async () => {
    if (!editingPost) return;
    try {
      await saveBlogPost(editingPost);
      toast.success("Blog post saved");
      setIsBlogDialogOpen(false);
      setEditingPost(null);
    } catch (error) {
      toast.error("Failed to save post");
    }
  };

  const handleStatusChange = async (type: 'release' | 'artist' | 'video', id: string, newStatus: string) => {
    try {
      if (type === 'release') await updateReleaseStatus(id, newStatus);
      if (type === 'artist') await updateArtistStatus(id, newStatus);
      if (type === 'video') await updateVideoStatus(id, newStatus);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} status updated`);
    } catch (err) {
      toast.error(`Failed to update ${type} status`);
    }
  };

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard stats={stats} />} />
        <Route path="users" element={
          <UserManagement 
            users={users} 
            search={search} 
            setSearch={setSearch} 
            handleRoleChange={handleRoleChange} 
            handleDeleteUser={handleDeleteUser} 
          />
        } />
        <Route path="releases" element={
          <ContentManagement 
            releases={releases} 
            artists={artists} 
            videos={videos} 
            search={search} 
            setSearch={setSearch} 
            handleDeleteItem={handleDeleteItem} 
            handleStatusChange={handleStatusChange} 
          />
        } />
        <Route path="artists" element={
          <ContentManagement 
            releases={releases} 
            artists={artists} 
            videos={videos} 
            search={search} 
            setSearch={setSearch} 
            handleDeleteItem={handleDeleteItem} 
            handleStatusChange={handleStatusChange} 
          />
        } />
        <Route path="videos" element={
          <ContentManagement 
            releases={releases} 
            artists={artists} 
            videos={videos} 
            search={search} 
            setSearch={setSearch} 
            handleDeleteItem={handleDeleteItem} 
            handleStatusChange={handleStatusChange} 
          />
        } />
        <Route path="site" element={
          <SiteEditor 
            siteSettings={siteSettings} 
            services={services} 
            pricingPlans={pricingPlans} 
            stats={stats}
            blogPosts={blogPosts}
            setEditingSettings={setEditingSettings}
            setIsSettingsDialogOpen={setIsSettingsDialogOpen}
            setEditingService={setEditingService}
            setIsServiceDialogOpen={setIsServiceDialogOpen}
            setEditingPlan={setEditingPlan}
            setIsPlanDialogOpen={setIsPlanDialogOpen}
            setEditingStat={setEditingStat}
            setIsStatDialogOpen={setIsStatDialogOpen}
            setEditingPost={setEditingPost}
            setIsBlogDialogOpen={setIsBlogDialogOpen}
            handleDeleteItem={handleDeleteItem}
            profile={profile}
          />
        } />
        <Route path="platforms" element={
          <PlatformManagement 
            platforms={platforms}
            setEditingPlatform={setEditingPlatform}
            setIsPlatformDialogOpen={setIsPlatformDialogOpen}
            handleDeleteItem={handleDeleteItem}
          />
        } />
        <Route path="announcements" element={
          <AnnouncementManagement 
            announcements={announcements}
            setEditingAnnouncement={setEditingAnnouncement}
            setIsAnnouncementDialogOpen={setIsAnnouncementDialogOpen}
            handleDeleteItem={handleDeleteItem}
          />
        } />
        <Route path="legal" element={
          <PolicyManagement 
            policies={policies}
            setEditingPolicy={setEditingPolicy}
            setIsPolicyDialogOpen={setIsPolicyDialogOpen}
            handleDeleteItem={handleDeleteItem}
          />
        } />
        {/* Fallback to dashboard */}
        <Route path="*" element={<AdminDashboard stats={stats} />} />
      </Routes>

      {/* Dialogs */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Site Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
            <div className="space-y-2">
              <Label>Hero Title</Label>
              <Input className="rounded-xl" value={editingSettings?.heroTitle || ""} onChange={(e) => setEditingSettings(prev => prev ? {...prev, heroTitle: e.target.value} : null)} />
            </div>
            <div className="space-y-2">
              <Label>Hero Subtitle</Label>
              <Textarea className="rounded-xl min-h-[100px]" value={editingSettings?.heroSubtitle || ""} onChange={(e) => setEditingSettings(prev => prev ? {...prev, heroSubtitle: e.target.value} : null)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input className="rounded-xl" value={editingSettings?.contactEmail || ""} onChange={(e) => setEditingSettings(prev => prev ? {...prev, contactEmail: e.target.value} : null)} />
              </div>
              <div className="space-y-2">
                <Label>Contact Phone</Label>
                <Input className="rounded-xl" value={editingSettings?.contactPhone || ""} onChange={(e) => setEditingSettings(prev => prev ? {...prev, contactPhone: e.target.value} : null)} />
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-border/50">
              <h4 className="font-bold text-sm">Navbar Links</h4>
              {editingSettings?.navbarLinks?.map((link, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <Input 
                    placeholder="Label" 
                    className="rounded-xl" 
                    value={link.label} 
                    onChange={(e) => {
                      const newLinks = [...(editingSettings.navbarLinks || [])];
                      newLinks[i] = { ...newLinks[i], label: e.target.value };
                      setEditingSettings({ ...editingSettings, navbarLinks: newLinks });
                    }} 
                  />
                  <Input 
                    placeholder="Href" 
                    className="rounded-xl" 
                    value={link.href} 
                    onChange={(e) => {
                      const newLinks = [...(editingSettings.navbarLinks || [])];
                      newLinks[i] = { ...newLinks[i], href: e.target.value };
                      setEditingSettings({ ...editingSettings, navbarLinks: newLinks });
                    }} 
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <h4 className="font-bold text-sm">Footer Links</h4>
              {editingSettings?.footerLinks?.map((link, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <Input 
                    placeholder="Label" 
                    className="rounded-xl" 
                    value={link.label} 
                    onChange={(e) => {
                      const newLinks = [...(editingSettings.footerLinks || [])];
                      newLinks[i] = { ...newLinks[i], label: e.target.value };
                      setEditingSettings({ ...editingSettings, footerLinks: newLinks });
                    }} 
                  />
                  <Input 
                    placeholder="Href" 
                    className="rounded-xl" 
                    value={link.href} 
                    onChange={(e) => {
                      const newLinks = [...(editingSettings.footerLinks || [])];
                      newLinks[i] = { ...newLinks[i], href: e.target.value };
                      setEditingSettings({ ...editingSettings, footerLinks: newLinks });
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveSettings} className="rounded-xl">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingService?.id ? 'Edit Service' : 'Add Service'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input className="rounded-xl" value={editingService?.title || ""} onChange={(e) => setEditingService(prev => ({...prev, title: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea className="rounded-xl" value={editingService?.description || ""} onChange={(e) => setEditingService(prev => ({...prev, description: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Icon Name (Lucide)</Label>
              <Input className="rounded-xl" value={editingService?.icon || ""} onChange={(e) => setEditingService(prev => ({...prev, icon: e.target.value}))} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveService} className="rounded-xl">Save Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingPlan?.id ? 'Edit Plan' : 'Add Plan'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="space-y-2">
              <Label>Plan Name</Label>
              <Input className="rounded-xl" value={editingPlan?.name || ""} onChange={(e) => setEditingPlan(prev => ({...prev, name: e.target.value}))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="number" className="rounded-xl" value={editingPlan?.price || 0} onChange={(e) => setEditingPlan(prev => ({...prev, price: parseFloat(e.target.value)}))} />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Input className="rounded-xl" value={editingPlan?.currency || "INR"} onChange={(e) => setEditingPlan(prev => ({...prev, currency: e.target.value}))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Features (comma separated)</Label>
              <Input 
                className="rounded-xl" 
                placeholder="Feature 1, Feature 2, Feature 3"
                value={editingPlan?.features?.join(",") || ""} 
                onChange={(e) => setEditingPlan(prev => ({...prev, features: e.target.value.split(",")}))} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!editingPlan?.hasFreeTrial} 
                  onChange={(e) => setEditingPlan(prev => ({...prev, hasFreeTrial: e.target.checked}))} 
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label>Free Trial</Label>
              </div>
              {editingPlan?.hasFreeTrial && (
                <div className="space-y-2">
                  <Label>Trial Days</Label>
                  <Input type="number" className="rounded-xl" value={editingPlan?.trialDays || 0} onChange={(e) => setEditingPlan(prev => ({...prev, trialDays: parseInt(e.target.value)}))} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={!!editingPlan?.isPopular} 
                onChange={(e) => setEditingPlan(prev => ({...prev, isPopular: e.target.checked}))} 
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label>Mark as Popular</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSavePlan} className="rounded-xl">Save Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPlatformDialogOpen} onOpenChange={setIsPlatformDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingPlatform?.id ? 'Edit Platform' : 'Add Platform'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Platform Name</Label>
              <Input className="rounded-xl" value={editingPlatform?.name || ""} onChange={(e) => setEditingPlatform(prev => ({...prev, name: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input className="rounded-xl" value={editingPlatform?.logo || ""} onChange={(e) => setEditingPlatform(prev => ({...prev, logo: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input className="rounded-xl" value={editingPlatform?.link || ""} onChange={(e) => setEditingPlatform(prev => ({...prev, link: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input type="number" className="rounded-xl" value={editingPlatform?.order || 0} onChange={(e) => setEditingPlatform(prev => ({...prev, order: parseInt(e.target.value)}))} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSavePlatform} className="rounded-xl">Save Platform</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingAnnouncement?.id ? 'Edit Announcement' : 'Add Announcement'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input className="rounded-xl" value={editingAnnouncement?.title || ""} onChange={(e) => setEditingAnnouncement(prev => ({...prev, title: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea className="rounded-xl" value={editingAnnouncement?.content || ""} onChange={(e) => setEditingAnnouncement(prev => ({...prev, content: e.target.value}))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <select 
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={editingAnnouncement?.type || "banner"}
                  onChange={(e) => setEditingAnnouncement(prev => ({...prev, type: e.target.value as 'banner' | 'popup'}))}
                >
                  <option value="banner">Banner</option>
                  <option value="popup">Popup</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Link (Optional)</Label>
                <Input className="rounded-xl" value={editingAnnouncement?.link || ""} onChange={(e) => setEditingAnnouncement(prev => ({...prev, link: e.target.value}))} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={!!editingAnnouncement?.active} 
                onChange={(e) => setEditingAnnouncement(prev => ({...prev, active: e.target.checked}))} 
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveAnnouncement} className="rounded-xl">Save Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPolicyDialogOpen} onOpenChange={setIsPolicyDialogOpen}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingPolicy?.id ? 'Edit Policy' : 'Add Policy'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input className="rounded-xl" value={editingPolicy?.title || ""} onChange={(e) => setEditingPolicy(prev => ({...prev, title: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Content (Markdown supported)</Label>
              <Textarea className="min-h-[300px] rounded-xl" value={editingPolicy?.content || ""} onChange={(e) => setEditingPolicy(prev => ({...prev, content: e.target.value}))} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSavePolicy} className="rounded-xl">Save Policy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isStatDialogOpen} onOpenChange={setIsStatDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingStat?.id ? 'Edit Stat' : 'Add Stat'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input className="rounded-xl" value={editingStat?.label || ""} onChange={(e) => setEditingStat(prev => ({...prev, label: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input className="rounded-xl" value={editingStat?.value || ""} onChange={(e) => setEditingStat(prev => ({...prev, value: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Icon Name (Lucide)</Label>
              <Input className="rounded-xl" value={editingStat?.icon || ""} onChange={(e) => setEditingStat(prev => ({...prev, icon: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input type="number" className="rounded-xl" value={editingStat?.order || 0} onChange={(e) => setEditingStat(prev => ({...prev, order: parseInt(e.target.value)}))} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveStat} className="rounded-xl">Save Stat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingPost?.id ? 'Edit Blog Post' : 'New Blog Post'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input className="rounded-xl" value={editingPost?.title || ""} onChange={(e) => setEditingPost(prev => ({...prev, title: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input className="rounded-xl" value={editingPost?.category || ""} onChange={(e) => setEditingPost(prev => ({...prev, category: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea className="rounded-xl" value={editingPost?.excerpt || ""} onChange={(e) => setEditingPost(prev => ({...prev, excerpt: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input className="rounded-xl" value={editingPost?.image || ""} onChange={(e) => setEditingPost(prev => ({...prev, image: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Content (Markdown supported)</Label>
              <Textarea className="min-h-[200px] rounded-xl" value={editingPost?.content || ""} onChange={(e) => setEditingPost(prev => ({...prev, content: e.target.value}))} />
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="published"
                checked={!!editingPost?.published} 
                onChange={(e) => setEditingPost(prev => ({...prev, published: e.target.checked}))} 
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveBlog} className="rounded-xl">Save Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isConfirmDeleteDialogOpen} onOpenChange={setIsConfirmDeleteDialogOpen}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.</p>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsConfirmDeleteDialogOpen(false)} className="rounded-xl flex-1">Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} className="rounded-xl flex-1">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};
