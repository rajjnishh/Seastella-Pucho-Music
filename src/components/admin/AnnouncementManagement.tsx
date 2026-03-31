import React from "react";
import { Plus, Trash2, Edit2, Megaphone, Bell, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Announcement } from "@/lib/useAdmin";

interface AnnouncementManagementProps {
  announcements: Announcement[];
  setEditingAnnouncement: (announcement: Partial<Announcement> | null) => void;
  setIsAnnouncementDialogOpen: (open: boolean) => void;
  handleDeleteItem: (type: 'announcement', id: string) => void;
}

export const AnnouncementManagement = ({ 
  announcements, 
  setEditingAnnouncement, 
  setIsAnnouncementDialogOpen, 
  handleDeleteItem 
}: AnnouncementManagementProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
          <p className="text-muted-foreground">Manage global banners, popups, and user notifications.</p>
        </div>
        <Button onClick={() => {
          setEditingAnnouncement({ title: "", content: "", type: "banner", active: true });
          setIsAnnouncementDialogOpen(true);
        }} className="rounded-xl gap-2">
          <Plus size={18} />
          Add Announcement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="rounded-2xl overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${announcement.type === 'banner' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                    {announcement.type === 'banner' ? <Megaphone size={20} /> : <Bell size={20} />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant={announcement.active ? "default" : "secondary"} className="rounded-md text-[10px] h-5">
                        {announcement.active ? (
                          <span className="flex items-center gap-1"><CheckCircle2 size={10} /> Active</span>
                        ) : (
                          <span className="flex items-center gap-1"><XCircle size={10} /> Inactive</span>
                        )}
                      </Badge>
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-70">{announcement.type}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => {
                    setEditingAnnouncement(announcement);
                    setIsAnnouncementDialogOpen(true);
                  }}>
                    <Edit2 size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteItem('announcement', announcement.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {announcement.content}
              </p>
              {announcement.link && (
                <div className="text-xs font-medium text-primary hover:underline cursor-pointer truncate">
                  Link: {announcement.link}
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                <span>Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {announcements.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-2xl">
            <Megaphone className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No announcements found</h3>
            <p className="text-muted-foreground">Create a banner or popup to communicate with your users.</p>
          </div>
        )}
      </div>
    </div>
  );
};
