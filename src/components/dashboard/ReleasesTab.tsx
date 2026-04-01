import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical, Edit, Trash2, ExternalLink, Music, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReleases, Release } from "@/lib/useReleases";
import { toast } from "sonner";

export const ReleasesTab = () => {
  const [search, setSearch] = useState("");
  const { releases, loading, addRelease, deleteRelease } = useReleases();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newRelease, setNewRelease] = useState({
    title: "",
    artist: "",
    type: "Single" as Release['type'],
    releaseDate: new Date().toISOString().split('T')[0],
    upc: "",
    platforms: "All Platforms",
    status: "pending" as Release['status']
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleCreateRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addRelease(newRelease, selectedFile || undefined);
      toast.success("Release created successfully");
      setIsCreateOpen(false);
      setNewRelease({
        title: "",
        artist: "",
        type: "Single",
        releaseDate: new Date().toISOString().split('T')[0],
        upc: "",
        platforms: "All Platforms",
        status: "pending"
      });
      setSelectedFile(null);
    } catch (err) {
      toast.error("Failed to create release");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const [releaseToDelete, setReleaseToDelete] = useState<string | null>(null);

  const handleDeleteRelease = async () => {
    if (!releaseToDelete) return;
    try {
      await deleteRelease(releaseToDelete);
      toast.success("Release deleted");
      setIsDeleting(false);
      setReleaseToDelete(null);
    } catch (err) {
      toast.error("Failed to delete release");
    }
  };

  const confirmDelete = (id: string) => {
    setReleaseToDelete(id);
    setIsDeleting(true);
  };

  const filteredReleases = releases.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.artist.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <CheckCircle2 size={14} className="text-emerald-500" />;
      case 'pending': return <Clock size={14} className="text-amber-500" />;
      case 'processing': return <Clock size={14} className="text-blue-500" />;
      case 'action_needed': return <AlertCircle size={14} className="text-rose-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-emerald-500/10 text-emerald-500';
      case 'pending': return 'bg-amber-500/10 text-amber-500';
      case 'processing': return 'bg-blue-500/10 text-blue-500';
      case 'action_needed': return 'bg-rose-500/10 text-rose-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'Live';
      case 'pending': return 'In Review';
      case 'processing': return 'Processing';
      case 'action_needed': return 'Action Needed';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Release Management</h2>
          <p className="text-muted-foreground">Upload, edit, and track your music releases.</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus size={16} /> Create Release
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateRelease}>
              <DialogHeader>
                <DialogTitle>Create New Release</DialogTitle>
                <DialogDescription>
                  Enter the details for your new music release.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input 
                    id="title" 
                    className="col-span-3" 
                    required 
                    value={newRelease.title}
                    onChange={(e) => setNewRelease({...newRelease, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="artist" className="text-right">Artist</Label>
                  <Input 
                    id="artist" 
                    className="col-span-3" 
                    required 
                    value={newRelease.artist}
                    onChange={(e) => setNewRelease({...newRelease, artist: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Select 
                    value={newRelease.type} 
                    onValueChange={(v: any) => setNewRelease({...newRelease, type: v})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="EP">EP</SelectItem>
                      <SelectItem value="Album">Album</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    className="col-span-3" 
                    required 
                    value={newRelease.releaseDate}
                    onChange={(e) => setNewRelease({...newRelease, releaseDate: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="upc" className="text-right">UPC</Label>
                  <Input 
                    id="upc" 
                    placeholder="Optional" 
                    className="col-span-3" 
                    value={newRelease.upc}
                    onChange={(e) => setNewRelease({...newRelease, upc: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">File</Label>
                  <Input 
                    id="file" 
                    type="file" 
                    className="col-span-3" 
                    accept="audio/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Release
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>All Releases</CardTitle>
            <CardDescription>View and manage all your catalog</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search releases..."
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
          ) : filteredReleases.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Music className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
              <div className="space-y-2">
                <p className="text-lg font-medium">No releases found</p>
                <p className="text-muted-foreground">Start by creating your first music release.</p>
              </div>
              <Button onClick={() => setIsCreateOpen(true)} variant="outline">
                Create Release
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Release Title</th>
                    <th className="px-4 py-3">Artist</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Release Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">UPC</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReleases.map((release) => (
                    <tr key={release.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 font-medium flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center text-primary">
                          <Music size={18} />
                        </div>
                        {release.title}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{release.artist}</td>
                      <td className="px-4 py-4">{release.type}</td>
                      <td className="px-4 py-4">{release.releaseDate}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(release.status)}`}>
                          {getStatusIcon(release.status)}
                          {getStatusText(release.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{release.upc || "—"}</td>
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
                              <Edit className="mr-2 h-4 w-4" /> Edit Release
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <ExternalLink className="mr-2 h-4 w-4" /> View Smartlink
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer text-rose-500 focus:text-rose-500"
                              onClick={() => confirmDelete(release.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
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
              This action cannot be undone. This will permanently delete the release from your catalog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteRelease}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
