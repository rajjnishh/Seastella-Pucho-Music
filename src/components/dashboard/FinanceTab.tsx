import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, Clock, CheckCircle2, XCircle, Download } from "lucide-react";
import { useDashboardData } from "@/lib/useDashboardData";

export const FinanceTab = () => {
  const { royalties, loading } = useDashboardData();

  if (loading) return <div>Loading...</div>;

  const transactions = royalties?.history || [];
  const balance = royalties?.balance || 0;
  const pending = royalties?.pending || 0;
  const totalEarnings = royalties?.totalEarnings || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payments & Finance</h2>
          <p className="text-muted-foreground">Manage your wallet, royalties, and payouts.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
          <Wallet size={16} /> Request Payout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-emerald-500/10 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                <Wallet size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Available Balance</p>
            <h3 className="text-4xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <ArrowUpRight size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Total Earnings (YTD)</p>
            <h3 className="text-3xl font-bold mt-1">${totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                <Clock size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Pending Payouts</p>
            <h3 className="text-3xl font-bold mt-1">${pending.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent credits and debits to your account</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={14} /> Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No transactions found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Date</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right rounded-tr-lg">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx: any, i: number) => (
                    <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4">{tx.date}</td>
                      <td className="px-4 py-4 font-medium">{tx.description}</td>
                      <td className="px-4 py-4 text-muted-foreground">{tx.id}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                          tx.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                          'bg-rose-500/10 text-rose-500'
                        }`}>
                          {tx.status === 'completed' && <CheckCircle2 size={12} />}
                          {tx.status === 'pending' && <Clock size={12} />}
                          {tx.status === 'rejected' && <XCircle size={12} />}
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </td>
                      <td className={`px-4 py-4 text-right font-bold ${tx.type === 'credit' ? 'text-emerald-500' : ''}`}>
                        {tx.type === 'credit' ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
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
