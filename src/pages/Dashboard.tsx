import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDays, format, differenceInDays } from "date-fns";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Music, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  Share2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  FileSpreadsheet,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/useAuth";
import { useDashboardData } from "@/lib/useDashboardData";
import { useProfile } from "@/lib/useProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceTab } from "@/components/dashboard/FinanceTab";
import { ArtistsTab } from "@/components/dashboard/ArtistsTab";
import { ReleasesTab } from "@/components/dashboard/ReleasesTab";
import { VideosTab } from "@/components/dashboard/VideosTab";
import { ChannelsTab } from "@/components/dashboard/ChannelsTab";
import { PromotionTab } from "@/components/dashboard/PromotionTab";
import { AnalyticsTab } from "@/components/dashboard/AnalyticsTab";
import { ServicesTab } from "@/components/dashboard/ServicesTab";
import Navbar from "@/components/Navbar";

type DateRange = {
  from?: Date;
  to?: Date;
};

const Dashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { analytics, royalties, loading } = useDashboardData();
  const navigate = useNavigate();
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Generate mock data based on dateRange
  const generateChartData = (range: DateRange | undefined) => {
    const data = [];
    if (!range?.from || !range?.to) return data;
    
    const days = differenceInDays(range.to, range.from) + 1;
    const maxDays = Math.min(days, 90); // Limit to 90 days for display
    
    for (let i = maxDays - 1; i >= 0; i--) {
      const currentDate = addDays(range.to, -i);
      data.push({
        name: format(currentDate, 'MMM d'),
        streams: Math.floor(Math.random() * 5000) + 3000,
        listeners: Math.floor(Math.random() * 1000) + 800,
      });
    }
    return data;
  };

  const chartData = generateChartData(date);

  const handleExport = (formatType: 'csv' | 'sheets') => {
    const headers = ["Date", "Streams", "Listeners"];
    const csvContent = [
      headers.join(","),
      ...chartData.map(row => `${row.name},${row.streams},${row.listeners}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `analytics_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const royaltyData = royalties?.history?.length > 0 ? royalties.history.map((r: any) => ({
    period: r.date,
    amount: r.amount
  })) : [];

  const totalStreams = analytics?.totalStreams || 0;
  const monthlyListeners = analytics?.monthlyListeners || 0;
  const totalRoyalties = royalties?.balance || 0;
  const topTracks = analytics?.topTracks || [];

  const distributionStatus = analytics?.distributionStatus || [];

  const platformDistribution = analytics?.platformDistribution || [
    { name: "Spotify", percentage: 0, color: "bg-emerald-500" },
    { name: "Apple Music", percentage: 0, color: "bg-rose-500" },
    { name: "YouTube Music", percentage: 0, color: "bg-red-600" },
    { name: "Others", percentage: 0, color: "bg-blue-500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[400px] lg:col-span-2 rounded-xl" />
          <Skeleton className="h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.div 
        className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      {/* Header */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {profile?.displayName || user?.displayName || "Artist"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your music today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-1.5 shadow-sm">
            <Calendar size={16} className="text-muted-foreground" />
            <input
              type="date"
              className="bg-transparent border-none outline-none text-sm w-[115px] text-pink-500 font-medium"
              value={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                const newDate = e.target.value ? new Date(e.target.value) : undefined;
                setDate({ ...date, from: newDate });
              }}
            />
            <span className="text-pink-500/70 text-sm">-</span>
            <input
              type="date"
              className="bg-transparent border-none outline-none text-sm w-[115px] text-pink-500 font-medium"
              value={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                const newDate = e.target.value ? new Date(e.target.value) : undefined;
                setDate({ ...date, from: date?.from, to: newDate });
              }}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="hero" size="sm" className="gap-2">
                <Download size={16} /> Export Data
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')} className="cursor-pointer">
                Download as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('sheets')} className="cursor-pointer">
                <FileSpreadsheet size={14} className="mr-2" />
                Download for Google Sheets
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-card/50 backdrop-blur-sm border border-primary/10 p-1 h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Analytics</TabsTrigger>
          <TabsTrigger value="finance" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Finance</TabsTrigger>
          {(profile?.role === 'label' || profile?.role === 'admin') && (
            <TabsTrigger value="artists" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Artists & Labels</TabsTrigger>
          )}
          <TabsTrigger value="releases" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Releases</TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Videos</TabsTrigger>
          <TabsTrigger value="channels" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Channels</TabsTrigger>
          <TabsTrigger value="promotion" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Promotion</TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Music size={20} />
                </div>
                <div className="flex items-center text-emerald-500 text-xs font-medium">
                  <ArrowUpRight size={14} className="mr-1" />
                  +12.5%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Total Streams</p>
                <h3 className="text-2xl font-bold">{totalStreams.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                  <Users size={20} />
                </div>
                <div className="flex items-center text-emerald-500 text-xs font-medium">
                  <ArrowUpRight size={14} className="mr-1" />
                  +8.2%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Monthly Listeners</p>
                <h3 className="text-2xl font-bold">{monthlyListeners.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <DollarSign size={20} />
                </div>
                <div className="flex items-center text-emerald-500 text-xs font-medium">
                  <ArrowUpRight size={14} className="mr-1" />
                  +15.3%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Total Royalties</p>
                <h3 className="text-2xl font-bold">${totalRoyalties.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <TrendingUp size={20} />
                </div>
                <div className="flex items-center text-rose-500 text-xs font-medium">
                  <ArrowDownRight size={14} className="mr-1" />
                  -2.1%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <h3 className="text-2xl font-bold">4.8%</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 h-full">
            <CardHeader>
              <CardTitle>Streaming Analytics</CardTitle>
              <CardDescription>Daily streams and listener growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.1} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--primary) / 0.2)',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="streams" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorStreams)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 h-full">
            <CardHeader>
              <CardTitle>Royalty Payments</CardTitle>
              <CardDescription>Monthly payout history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={royaltyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.1} />
                    <XAxis 
                      dataKey="period" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--primary) / 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity / Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Tracks</CardTitle>
                <CardDescription>Performance of your most popular music</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTracks.map((track: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center text-primary">
                        <Music size={18} />
                      </div>
                      <div>
                        <p className="font-medium">{track.name}</p>
                        <p className="text-xs text-muted-foreground">{track.date || "Recent"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{track.streams.toLocaleString()}</p>
                      {track.trend && (
                        <p className={cn("text-xs font-medium", track.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>
                          {track.trend}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Distribution Status</CardTitle>
                <CardDescription>Status of your recent releases</CardDescription>
              </div>
              <Button variant="ghost" size="sm">Releases</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {distributionStatus.map((release, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded bg-card flex items-center justify-center border", release.color.replace('text-', 'border-').replace('500', '200'))}>
                        <release.icon size={18} className={release.color} />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors flex items-center gap-1">
                          {release.title}
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </p>
                        <p className="text-xs text-muted-foreground">{release.platforms}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-xs font-medium", release.color)}>{release.status}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{release.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Where your fans are listening</CardDescription>
              </div>
              <Share2 size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {platformDistribution.map((platform: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{platform.name}</span>
                      <span className="text-muted-foreground">{platform.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        className={cn("h-full rounded-full", platform.color)}
                        initial={{ width: 0 }}
                        animate={{ width: `${platform.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </TabsContent>

      <TabsContent value="analytics">
        <AnalyticsTab />
      </TabsContent>

      <TabsContent value="finance">
        <FinanceTab />
      </TabsContent>

      {(profile?.role === 'label' || profile?.role === 'admin') && (
        <TabsContent value="artists">
          <ArtistsTab />
        </TabsContent>
      )}

      <TabsContent value="releases">
        <ReleasesTab />
      </TabsContent>

      <TabsContent value="videos">
        <VideosTab />
      </TabsContent>

      <TabsContent value="channels">
        <ChannelsTab />
      </TabsContent>

      <TabsContent value="promotion">
        <PromotionTab />
      </TabsContent>

      <TabsContent value="services">
        <ServicesTab />
      </TabsContent>

      </Tabs>
    </motion.div>
  </div>
);
};

export default Dashboard;
