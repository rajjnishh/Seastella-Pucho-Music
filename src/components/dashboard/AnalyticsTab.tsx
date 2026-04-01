import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Globe, Music, DollarSign, Smartphone } from "lucide-react";
import { useDashboardData } from "@/lib/useDashboardData";

export const AnalyticsTab = () => {
  const { analytics, loading } = useDashboardData();

  if (loading) return <div>Loading...</div>;
  if (!analytics) return <div>No analytics data available.</div>;

  const geoData = analytics.geoData || [];
  const platformData = analytics.platformDistribution || [];
  const trackRevenueData = analytics.trackRevenueData || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
          <p className="text-muted-foreground">Deep dive into your audience, platforms, and track performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="text-primary" size={20} /> Geographic Distribution
            </CardTitle>
            <CardDescription>Top countries by streams</CardDescription>
          </CardHeader>
          <CardContent>
            {geoData.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No geographic data available yet.</div>
            ) : (
              <div className="space-y-4">
                {geoData.map((data: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{data.country}</span>
                      <span className="text-muted-foreground">{data.streams.toLocaleString()} ({data.percentage}%)</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${data.percentage}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="text-primary" size={20} /> Platform Breakdown
            </CardTitle>
            <CardDescription>Streams by DSP</CardDescription>
          </CardHeader>
          <CardContent>
            {platformData.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No platform data available yet.</div>
            ) : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="text-primary" size={20} /> Revenue per Track
            </CardTitle>
            <CardDescription>Earnings breakdown by individual release</CardDescription>
          </CardHeader>
          <CardContent>
            {trackRevenueData.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No revenue data available yet.</div>
            ) : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trackRevenueData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.1} />
                    <XAxis type="number" tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} />
                    <Tooltip 
                      formatter={(value: any) => [`$${value}`, 'Revenue']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
