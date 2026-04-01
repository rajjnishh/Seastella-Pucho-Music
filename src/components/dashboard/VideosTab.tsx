import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical, Edit, Trash2, ExternalLink, Video, Eye, DollarSign, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useVideos, Video as VideoType } from "@/lib/useVideos";
import { toast } from "sonner";

export const VideosTab = () => {
  const [search, setSearch] = useState("");
  const { videos, loading, addVideo, deleteVideo } = useVideos();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newVideo, setNewVideo] = useState({
    title: "",
    artist: "",
    views: 0,
    revenue: 0,
    status: "pending" as VideoType['status'],
    uploadDate: new Date().toISOString().split('T')[0]
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addVideo(newVideo, selectedFile || undefined);
      toast.success("Video uploaded successfully");
      setIsUploadOpen(false);
      setNewVideo({
        title: "",
        artist: "",
        views: 0,
        revenue: 0,
        status: "pending",
        uploadDate: new Date().toISOString().split('T')[0]
      });
      setSelectedFile(null);
    } catch (err) {
      toast.error("Failed to upload video");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

  const handleDeleteVideo = async () => {
    if (!videoToDelete) return;
    try {
      await deleteVideo(videoToDelete);
      toast.success("Video deleted");
      setIsDeleting(false);
      setVideoToDelete(null);
    } catch (err) {
      toast.error("Failed to delete video");
    }
  };

  const confirmDelete = (id: string) => {
    setVideoToDelete(id);
    setIsDeleting(true);
  };

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(search.toLowerCase()) || 
    v.artist.toLowerCase().includes(search.toLowerCase())
  );

  const totalViews = videos.reduce((acc, v) => acc + v.views, 0);
  const totalRevenue = videos.reduce((acc, v) => acc + v.revenue, 0);

  const formatViews = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Video Management</h2>
          <p className="text-muted-foreground">Upload, manage, and monetize your music videos.</p>
        </div>
        
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus size={16} /> Upload Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleUploadVideo}>
              <DialogHeader>
                <DialogTitle>Upload New Video</DialogTitle>
                <DialogDescription>
                  Enter the details for your new music video.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input 
                    id="title" 
                    className="col-span-3" 
                    required 
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="artist" className="text-right">Artist</Label>
                  <Input 
                    id="artist" 
                    className="col-span-3" 
                    required 
                    value={newVideo.artist}
                    onChange={(e) => setNewVideo({...newVideo, artist: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    className="col-span-3" 
                    required 
                    value={newVideo.uploadDate}
                    onChange={(e) => setNewVideo({...newVideo, uploadDate: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">File</Label>
                  <Input 
                    id="file" 
                    type="file" 
                    className="col-span-3" 
                    accept="video/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Upload Video
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Video size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Total Videos</p>
            <h3 className="text-3xl font-bold mt-1">{videos.length}</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Eye size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Total Views</p>
            <h3 className="text-3xl font-bold mt-1">{formatViews(totalViews)}</h3>
          </CardContent>
        </Card>

        <Card className="bg-emerald-500/10 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                <DollarSign size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Video Revenue</p>
            <h3 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">
              ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>Video Catalog</CardTitle>
            <CardDescription>Track performance and revenue per video</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="pl-8 bg-secondary/50 border-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Video className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
              <div className="space-y-2">
                <p className="text-lg font-medium">No videos found</p>
                <p className="text-muted-foreground">Start by uploading your first music video.</p>
              </div>
              <Button onClick={() => setIsUploadOpen(true)} variant="outline">
                Upload Video
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Video Title</th>
                    <th className="px-4 py-3">Artist</th>
                    <th className="px-4 py-3">Upload Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Views</th>
                    <th className="px-4 py-3 text-right">Revenue</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVideos.map((video) => (
                    <tr key={video.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 font-medium flex items-center gap-3">
                        <div className="w-16 h-10 rounded bg-muted flex items-center justify-center text-muted-foreground overflow-hidden relative group cursor-pointer">
                          <Video size={18} className="absolute z-10 opacity-50 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        </div>
                        <div className="max-w-[200px] truncate" title={video.title}>{video.title}</div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{video.artist}</td>
                      <td className="px-4 py-4">{video.uploadDate}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          video.status === 'monetized' ? 'bg-emerald-500/10 text-emerald-500' : 
                          video.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                          'bg-muted text-muted-foreground'
                        }`}>
                          {video.status.replace('_', ' ').charAt(0).toUpperCase() + video.status.replace('_', ' ').slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-medium">{video.views.toLocaleString()}</td>
                      <td className="px-4 py-4 text-right font-medium text-emerald-500">
                        ${video.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <ExternalLink className="mr-2 h-4 w-4" /> View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer text-rose-500 focus:text-rose-500"
                              onClick={() => confirmDelete(video.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Video
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the video.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteVideo}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
