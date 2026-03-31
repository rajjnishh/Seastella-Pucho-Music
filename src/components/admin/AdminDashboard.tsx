import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Music, Video, Mic2, TrendingUp, DollarSign, PlayCircle, UserPlus, Shield, Percent, UserMinus } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", users: 400, revenue: 2400 },
  { name: "Feb", users: 300, revenue: 1398 },
  { name: "Mar", users: 200, revenue: 9800 },
  { name: "Apr", users: 278, revenue: 3908 },
  { name: "May", users: 189, revenue: 4800 },
  { name: "Jun", users: 239, revenue: 3800 },
  { name: "Jul", users: 349, revenue: 4300 },
];

const pieData = [
  { name: "Pop", value: 400 },
  { name: "Hip Hop", value: 300 },
  { name: "Rock", value: 300 },
  { name: "Jazz", value: 200 },
];

const COLORS = ["#FF2D6F", "#0088FE", "#00C49F", "#FFBB28"];

export const AdminDashboard = ({ stats }: { stats: any }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with PUCHO Music today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              <p className="text-xs text-emerald-500 font-medium flex items-center gap-1 mt-1">
                <TrendingUp size={12} /> +12% this month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-blue-500/10 to-transparent">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/20">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold">₹{stats.totalRevenue?.toLocaleString() || 0}</h3>
              <p className="text-xs text-emerald-500 font-medium flex items-center gap-1 mt-1">
                <TrendingUp size={12} /> +15% this month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-500/10 to-transparent">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
              <Percent size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <h3 className="text-2xl font-bold">{stats.conversionRate || 0}%</h3>
              <p className="text-xs text-emerald-500 font-medium flex items-center gap-1 mt-1">
                <TrendingUp size={12} /> +2% this month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-amber-500/10 to-transparent">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-500/20">
              <UserMinus size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Churn Rate</p>
              <h3 className="text-2xl font-bold">{stats.churnRate || 0}%</h3>
              <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                <TrendingUp size={12} className="rotate-180" /> -1% this month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>User Growth & Revenue</CardTitle>
            <CardDescription>Monthly statistics for new users and platform revenue.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF2D6F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF2D6F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="users" stroke="#FF2D6F" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Genre Distribution</CardTitle>
            <CardDescription>Popularity of music genres across all releases.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions performed on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { icon: UserPlus, color: "bg-blue-500", title: "New Artist Registered", time: "2 minutes ago", desc: "John Doe joined the platform." },
                { icon: PlayCircle, color: "bg-emerald-500", title: "New Release Published", time: "1 hour ago", desc: "Summer Vibes EP is now live." },
                { icon: DollarSign, color: "bg-amber-500", title: "Subscription Renewed", time: "3 hours ago", desc: "Pro Plan renewed for Jane Smith." },
                { icon: Music, color: "bg-primary", title: "Content Updated", time: "5 hours ago", desc: "Site settings were modified by Admin." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={cn("p-2 rounded-xl text-white", item.color)}>
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm">{item.title}</p>
                      <span className="text-[10px] text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left flex items-center justify-between group">
              <span className="font-medium text-sm">Add New Artist</span>
              <UserPlus size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <button className="w-full p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left flex items-center justify-between group">
              <span className="font-medium text-sm">Upload Release</span>
              <Music size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            <button className="w-full p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left flex items-center justify-between group">
              <span className="font-medium text-sm">System Backup</span>
              <Shield size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
