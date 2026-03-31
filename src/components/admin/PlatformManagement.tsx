import React from "react";
import { Plus, Trash2, Edit2, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Platform } from "@/lib/useAdmin";

interface PlatformManagementProps {
  platforms: Platform[];
  setEditingPlatform: (platform: Partial<Platform> | null) => void;
  setIsPlatformDialogOpen: (open: boolean) => void;
  handleDeleteItem: (type: 'platform', id: string) => void;
}

export const PlatformManagement = ({ 
  platforms, 
  setEditingPlatform, 
  setIsPlatformDialogOpen, 
  handleDeleteItem 
}: PlatformManagementProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Streaming Platforms</h2>
          <p className="text-muted-foreground">Manage the platforms where music is distributed.</p>
        </div>
        <Button onClick={() => {
          setEditingPlatform({ name: "", logo: "", link: "", order: platforms.length });
          setIsPlatformDialogOpen(true);
        }} className="rounded-xl gap-2">
          <Plus size={18} />
          Add Platform
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <Card key={platform.id} className="rounded-2xl overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden border border-border">
                  {platform.logo ? (
                    <img src={platform.logo} alt={platform.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <Globe className="text-muted-foreground" size={24} />
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => {
                    setEditingPlatform(platform);
                    setIsPlatformDialogOpen(true);
                  }}>
                    <Edit2 size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteItem('platform', platform.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <CardTitle className="mt-4">{platform.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 truncate">
                {platform.link ? (
                  <a href={platform.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                    {platform.link} <ExternalLink size={10} />
                  </a>
                ) : "No link provided"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Order: {platform.order}
              </div>
            </CardContent>
          </Card>
        ))}
        {platforms.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-2xl">
            <Globe className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No platforms added</h3>
            <p className="text-muted-foreground">Add your first streaming platform to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
