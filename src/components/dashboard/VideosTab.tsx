import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical, Edit, Trash2, ExternalLink, Video, Eye, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const VideosTab = () => {
  const [search, setSearch] = useState("");
  
  const videos = [
    { id: "V101", title: "Midnight Echoes - Official Music Video", artist: "Midnight Echoes", views: 1250000, revenue: 1500.50, status: "monetized", uploadDate: "2026-02-10" },
    { id: "V102", title: "Neon Dreams - Lyric Video", artist: "Neon Dreams", views: 450000, revenue: 540.20, status: "monetized", uploadDate: "2026-02-16" },
    { id: "V103", title: "Urban Jungle - Live Session", artist: "Urban Jungle", views: 85000, revenue: 102.00, status: "pending", uploadDate: "2026-03-01" },
    { id: "V104", title: "Summer Vibes - Teaser", artist: "Summer Vibes", views: 12000, revenue: 0, status: "not_monetized", uploadDate: "2026-03-15" },
  ];

  const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(search.toLowerCase()) || v.artist.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Video Management</h2>
          <p className="text-muted-foreground">Upload, manage, and monetize your music videos.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus size={16} /> Upload Video
        </Button>
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
            <h3 className="text-3xl font-bold mt-1">4</h3>
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
            <h3 className="text-3xl font-bold mt-1">1.79M</h3>
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
            <h3 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">$2,142.70</h3>
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
                          <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500">
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
        </CardContent>
      </Card>
    </div>
  );
};
