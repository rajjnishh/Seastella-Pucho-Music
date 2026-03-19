import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Plus, MoreVertical, Edit, Trash2, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ArtistsTab = () => {
  const [search, setSearch] = useState("");
  
  const artists = [
    { id: 1, name: "Midnight Echoes", email: "contact@midnightechoes.com", spotifyId: "1Xyo4u8uXC1ZmMzpAWaqQC", appleId: "1440932345", tracks: 12, status: "active" },
    { id: 2, name: "Neon Dreams", email: "mgmt@neondreams.io", spotifyId: "2Xyo4u8uXC1ZmMzpAWaqQC", appleId: "1440932346", tracks: 5, status: "active" },
    { id: 3, name: "Urban Jungle", email: "urbanjungle@gmail.com", spotifyId: "3Xyo4u8uXC1ZmMzpAWaqQC", appleId: "1440932347", tracks: 24, status: "active" },
    { id: 4, name: "Summer Vibes", email: "hello@summervibes.net", spotifyId: "4Xyo4u8uXC1ZmMzpAWaqQC", appleId: "1440932348", tracks: 1, status: "pending" },
  ];

  const filteredArtists = artists.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Artist & Label Management</h2>
          <p className="text-muted-foreground">Manage your roster, profiles, and DSP IDs.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus size={16} /> Add Artist
        </Button>
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
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10" title="Spotify">
                          <ExternalLink size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10" title="Apple Music">
                          <ExternalLink size={14} />
                        </Button>
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
                          <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500">
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
        </CardContent>
      </Card>
    </div>
  );
};
