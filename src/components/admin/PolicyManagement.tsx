import React from "react";
import { Plus, Trash2, Edit2, FileText, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Policy } from "@/lib/useAdmin";

interface PolicyManagementProps {
  policies: Policy[];
  setEditingPolicy: (policy: Partial<Policy> | null) => void;
  setIsPolicyDialogOpen: (open: boolean) => void;
  handleDeleteItem: (type: 'policy', id: string) => void;
}

export const PolicyManagement = ({ 
  policies, 
  setEditingPolicy, 
  setIsPolicyDialogOpen, 
  handleDeleteItem 
}: PolicyManagementProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Legal & Policies</h2>
          <p className="text-muted-foreground">Manage Terms of Service, Privacy Policy, and Copyright guidelines.</p>
        </div>
        <Button onClick={() => {
          setEditingPolicy({ title: "", content: "" });
          setIsPolicyDialogOpen(true);
        }} className="rounded-xl gap-2">
          <Plus size={18} />
          Add Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <Card key={policy.id} className="rounded-2xl overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => {
                    setEditingPolicy(policy);
                    setIsPolicyDialogOpen(true);
                  }}>
                    <Edit2 size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteItem('policy', policy.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <CardTitle className="mt-4 text-lg">{policy.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <ShieldCheck size={12} className="text-green-500" />
                Official Policy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
                {policy.content}
              </p>
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                <Clock size={10} />
                <span>Last Updated: {new Date(policy.updatedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {policies.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-2xl">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No policies found</h3>
            <p className="text-muted-foreground">Add your first legal document to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
