import React from "react";
import { 
  Music, 
  Mic2, 
  Video, 
  Trash2, 
  MoreVertical, 
  Search, 
  Plus,
  ExternalLink,
  PlayCircle,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ContentManagementProps {
  releases: any[];
  artists: any[];
  videos: any[];
  search: string;
  setSearch: (s: string) => void;
  handleDeleteItem: (type: any, id: string) => void;
  handleStatusChange: (type: any, id: string, status: string) => void;
}

export const ContentManagement = ({ 
  releases, 
  artists, 
  videos, 
  search, 
  setSearch, 
  handleDeleteItem, 
  handleStatusChange 
}: ContentManagementProps) => {
  const filteredReleases = releases.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.artist.toLowerCase().includes(search.toLowerCase())
  );

  const filteredArtists = artists.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.genre.toLowerCase().includes(search.toLowerCase())
  );

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(search.toLowerCase()) || 
    v.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage all music releases, artist profiles, and video content.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5">
            Bulk Actions
          </Button>
          <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
            <Plus size={18} /> New Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="releases" className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <TabsList className="bg-secondary/50 p-1 rounded-xl border border-border/50">
            <TabsTrigger value="releases" className="gap-2 rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Music size={16} /> Releases
            </TabsTrigger>
            <TabsTrigger value="artists" className="gap-2 rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Mic2 size={16} /> Artists
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2 rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Video size={16} /> Videos
            </TabsTrigger>
          </TabsList>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Filter content..." 
              className="pl-10 bg-secondary/30 border-none h-11 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="releases">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 font-bold">Release Title</th>
                    <th className="px-6 py-4 font-bold">Artist</th>
                    <th className="px-6 py-4 font-bold">Type</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredReleases.map((release) => (
                    <tr key={release.id} className="hover:bg-secondary/20 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Music size={20} />
                          </div>
                          <span className="font-bold text-foreground">{release.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">{release.artist}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-secondary rounded-full">
                          {release.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className={cn(
                              "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider gap-1.5",
                              release.status === 'live' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                            )}>
                              {release.status === 'live' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                              {release.status.replace('_', ' ')}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="rounded-xl shadow-xl mt-1">
                            {['live', 'pending', 'processing', 'action_needed'].map((status) => (
                              <DropdownMenuItem 
                                key={status}
                                className="p-3 cursor-pointer rounded-lg mx-1"
                                onClick={() => handleStatusChange('release', release.id, status)}
                              >
                                <span className="text-xs font-medium uppercase tracking-wider">{status.replace('_', ' ')}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-secondary">
                            <ExternalLink size={16} className="text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteItem('release', release.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="artists">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 font-bold">Artist Name</th>
                    <th className="px-6 py-4 font-bold">Genre</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredArtists.map((artist) => (
                    <tr key={artist.id} className="hover:bg-secondary/20 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Mic2 size={20} />
                          </div>
                          <span className="font-bold text-foreground">{artist.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">{artist.genre}</td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className={cn(
                              "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider gap-1.5",
                              artist.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-secondary text-muted-foreground"
                            )}>
                              {artist.status === 'active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                              {artist.status.replace('_', ' ')}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="rounded-xl shadow-xl mt-1">
                            {['active', 'on_tour', 'inactive'].map((status) => (
                              <DropdownMenuItem 
                                key={status}
                                className="p-3 cursor-pointer rounded-lg mx-1"
                                onClick={() => handleStatusChange('artist', artist.id, status)}
                              >
                                <span className="text-xs font-medium uppercase tracking-wider">{status.replace('_', ' ')}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-secondary">
                            <MoreVertical size={16} className="text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteItem('artist', artist.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 font-bold">Video Title</th>
                    <th className="px-6 py-4 font-bold">Artist</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Views</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredVideos.map((video) => (
                    <tr key={video.id} className="hover:bg-secondary/20 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <PlayCircle size={20} />
                          </div>
                          <span className="font-bold text-foreground">{video.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">{video.artist}</td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className={cn(
                              "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider gap-1.5",
                              video.status === 'monetized' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                            )}>
                              {video.status === 'monetized' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                              {video.status.replace('_', ' ')}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="rounded-xl shadow-xl mt-1">
                            {['monetized', 'pending', 'not_monetized'].map((status) => (
                              <DropdownMenuItem 
                                key={status}
                                className="p-3 cursor-pointer rounded-lg mx-1"
                                onClick={() => handleStatusChange('video', video.id, status)}
                              >
                                <span className="text-xs font-medium uppercase tracking-wider">{status.replace('_', ' ')}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 text-muted-foreground">
                          <Eye size={14} />
                          <span className="font-bold text-foreground">{video.views.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-secondary">
                            <MoreVertical size={16} className="text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteItem('video', video.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
