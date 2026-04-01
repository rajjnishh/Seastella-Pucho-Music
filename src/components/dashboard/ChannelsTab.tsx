import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Edit, Trash2, ExternalLink, Youtube, Link as LinkIcon, CheckCircle2, Clock, AlertCircle, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChannels } from "@/lib/useChannels";

export const ChannelsTab = () => {
  const [search, setSearch] = useState("");
  const { channels, loading } = useChannels();
  
  if (loading) return <div>Loading...</div>;

  const filteredChannels = channels.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.url.toLowerCase().includes(search.toLowerCase()));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 size={14} className="text-emerald-500" />;
      case 'pending': return <Clock size={14} className="text-amber-500" />;
      case 'rejected': return <AlertCircle size={14} className="text-rose-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-500/10 text-emerald-500';
      case 'pending': return 'bg-amber-500/10 text-amber-500';
      case 'rejected': return 'bg-rose-500/10 text-rose-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalSubscribers = channels.reduce((acc, c) => acc + c.subscribers, 0);
  const pendingApprovals = channels.filter(c => c.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">MCN & Channel Linking</h2>
          <p className="text-muted-foreground">Connect and manage your YouTube channels for Content ID and monetization.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
          <LinkIcon size={16} /> Connect Channel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-600/10 rounded-lg text-red-600">
                <Youtube size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Connected Channels</p>
            <h3 className="text-3xl font-bold mt-1">{channels.length}</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Users size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Total Subscribers</p>
            <h3 className="text-3xl font-bold mt-1">{totalSubscribers.toLocaleString()}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                <Clock size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
            <h3 className="text-3xl font-bold mt-1">{pendingApprovals}</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>Linked Channels</CardTitle>
            <CardDescription>Manage your connected YouTube channels</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search channels..."
              className="pl-8 bg-secondary/50 border-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {channels.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No channels connected yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Channel Name</th>
                    <th className="px-4 py-3">URL</th>
                    <th className="px-4 py-3">Subscribers</th>
                    <th className="px-4 py-3">Linked Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChannels.map((channel) => (
                    <tr key={channel.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 font-medium flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-red-600">
                          <Youtube size={16} />
                        </div>
                        {channel.name}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        <a href={`https://${channel.url}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline flex items-center gap-1">
                          {channel.url} <ExternalLink size={12} />
                        </a>
                      </td>
                      <td className="px-4 py-4 font-medium">{channel.subscribers.toLocaleString()}</td>
                      <td className="px-4 py-4 text-muted-foreground">{channel.linkedDate}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}>
                          {getStatusIcon(channel.status)}
                          {channel.status.charAt(0).toUpperCase() + channel.status.slice(1)}
                        </span>
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
                              <ExternalLink className="mr-2 h-4 w-4" /> View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500">
                              <Trash2 className="mr-2 h-4 w-4" /> Unlink Channel
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
    </div>
  );
};
