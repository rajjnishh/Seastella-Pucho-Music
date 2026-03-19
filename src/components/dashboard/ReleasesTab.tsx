import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical, Edit, Trash2, ExternalLink, Music, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ReleasesTab = () => {
  const [search, setSearch] = useState("");
  
  const releases = [
    { id: "R101", title: "Midnight Echoes", artist: "Midnight Echoes", type: "Single", releaseDate: "2026-03-10", status: "live", upc: "192837465012", platforms: "All Platforms" },
    { id: "R102", title: "Neon Dreams EP", artist: "Neon Dreams", type: "EP", releaseDate: "2026-03-16", status: "pending", upc: "192837465013", platforms: "Spotify, Apple Music" },
    { id: "R103", title: "Urban Jungle", artist: "Urban Jungle", type: "Album", releaseDate: "2026-03-20", status: "processing", upc: "192837465014", platforms: "All Platforms" },
    { id: "R104", title: "Summer Vibes", artist: "Summer Vibes", type: "Single", releaseDate: "2026-03-25", status: "action_needed", upc: "192837465015", platforms: "None" },
  ];

  const filteredReleases = releases.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.artist.toLowerCase().includes(search.toLowerCase()));

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
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus size={16} /> Create Release
        </Button>
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
                    <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{release.upc}</td>
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
                          <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500">
                            <Trash2 className="mr-2 h-4 w-4" /> Takedown
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
