import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Plus, MoreVertical, Edit, Trash2, ExternalLink, Loader2 } from "lucide-react";
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
import { useArtists, Artist } from "@/lib/useArtists";
import { toast } from "sonner";

export const ArtistsTab = () => {
  const [search, setSearch] = useState("");
  const { artists, loading, addArtist, deleteArtist } = useArtists();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newArtist, setNewArtist] = useState({
    name: "",
    email: "",
    spotifyId: "",
    appleId: "",
    tracks: 0,
    status: "active" as Artist['status']
  });

  const handleAddArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addArtist(newArtist);
      toast.success("Artist added successfully");
      setIsAddOpen(false);
      setNewArtist({
        name: "",
        email: "",
        spotifyId: "",
        appleId: "",
        tracks: 0,
        status: "active"
      });
    } catch (err) {
      toast.error("Failed to add artist");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const [artistToDelete, setArtistToDelete] = useState<string | null>(null);

  const handleDeleteArtist = async () => {
    if (!artistToDelete) return;
    try {
      await deleteArtist(artistToDelete);
      toast.success("Artist removed");
      setIsDeleting(false);
      setArtistToDelete(null);
    } catch (err) {
      toast.error("Failed to remove artist");
    }
  };

  const confirmDelete = (id: string) => {
    setArtistToDelete(id);
    setIsDeleting(true);
  };

  const filteredArtists = artists.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Artist & Label Management</h2>
          <p className="text-muted-foreground">Manage your roster, profiles, and DSP IDs.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus size={16} /> Add Artist
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddArtist}>
              <DialogHeader>
                <DialogTitle>Add New Artist</DialogTitle>
                <DialogDescription>
                  Enter the details for the new artist in your roster.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input 
                    id="name" 
                    className="col-span-3" 
                    required 
                    value={newArtist.name}
                    onChange={(e) => setNewArtist({...newArtist, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    className="col-span-3" 
                    required 
                    value={newArtist.email}
                    onChange={(e) => setNewArtist({...newArtist, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="spotify" className="text-right">Spotify ID</Label>
                  <Input 
                    id="spotify" 
                    className="col-span-3" 
                    placeholder="Optional"
                    value={newArtist.spotifyId}
                    onChange={(e) => setNewArtist({...newArtist, spotifyId: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="apple" className="text-right">Apple ID</Label>
                  <Input 
                    id="apple" 
                    className="col-span-3" 
                    placeholder="Optional"
                    value={newArtist.appleId}
                    onChange={(e) => setNewArtist({...newArtist, appleId: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Artist
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>Your Roster</CardTitle>
            <CardDescription>View and manage all artists under your label</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search artists..."
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
          ) : filteredArtists.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
              <div className="space-y-2">
                <p className="text-lg font-medium">No artists found</p>
                <p className="text-muted-foreground">Start by adding your first artist to the roster.</p>
              </div>
              <Button onClick={() => setIsAddOpen(true)} variant="outline">
                Add Artist
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Artist Name</th>
                    <th className="px-4 py-3">Contact Email</th>
                    <th className="px-4 py-3">Tracks</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">DSP Links</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArtists.map((artist) => (
                    <tr key={artist.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 font-medium flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                          {artist.name.charAt(0)}
                        </div>
                        {artist.name}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{artist.email}</td>
                      <td className="px-4 py-4">{artist.tracks}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          artist.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {artist.status.charAt(0).toUpperCase() + artist.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {artist.spotifyId && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10" title="Spotify">
                              <ExternalLink size={14} />
                            </Button>
                          )}
                          {artist.appleId && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10" title="Apple Music">
                              <ExternalLink size={14} />
                            </Button>
                          )}
                          {!artist.spotifyId && !artist.appleId && (
                            <span className="text-xs text-muted-foreground italic">No links</span>
                          )}
                        </div>
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
                              <Edit className="mr-2 h-4 w-4" /> Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer text-rose-500 focus:text-rose-500"
                              onClick={() => confirmDelete(artist.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Remove Artist
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
              This action cannot be undone. This will permanently remove the artist from your roster.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteArtist}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
