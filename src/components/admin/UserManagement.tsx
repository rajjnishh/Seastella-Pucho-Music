import React from "react";
import { 
  Users, 
  Shield, 
  Trash2, 
  MoreVertical, 
  Search, 
  UserPlus,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserManagementProps {
  users: any[];
  search: string;
  setSearch: (s: string) => void;
  handleRoleChange: (id: string, role: any) => void;
  handleDeleteUser: (id: string) => void;
}

export const UserManagement = ({ 
  users, 
  search, 
  setSearch, 
  handleRoleChange, 
  handleDeleteUser 
}: UserManagementProps) => {
  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(search.toLowerCase()) || 
    u.displayName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts, roles, and administrative access.</p>
        </div>
        <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
          <UserPlus size={18} /> Add New User
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-10 bg-secondary/30 border-none h-11 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg">Filter</Button>
              <Button variant="outline" size="sm" className="rounded-lg">Export CSV</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-y border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold">User Profile</th>
                  <th className="px-6 py-4 font-bold">Role</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Joined Date</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-primary/10">
                          <AvatarImage src={user.photoURL} />
                          <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                            {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">{user.displayName || "Anonymous User"}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail size={10} /> {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        user.role === 'admin' 
                          ? "bg-primary/10 text-primary" 
                          : "bg-blue-500/10 text-blue-500"
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-emerald-500 font-medium">
                        <CheckCircle2 size={14} />
                        <span className="text-xs">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar size={14} />
                        <span className="text-xs">
                          {user.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-9 w-9 p-0 rounded-xl hover:bg-secondary">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl mt-1">
                          <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 py-2">Management</DropdownMenuLabel>
                          <DropdownMenuItem 
                            className="cursor-pointer p-3 rounded-lg mx-1"
                            onClick={() => handleRoleChange(user.id, user.role)}
                          >
                            <Shield className="mr-3 h-4 w-4 text-primary" /> 
                            <span className="text-sm font-medium">Make {user.role === 'admin' ? 'Artist' : 'Admin'}</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1" />
                          <DropdownMenuItem 
                            className="cursor-pointer p-3 rounded-lg mx-1 text-destructive focus:text-destructive focus:bg-destructive/10"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="mr-3 h-4 w-4" /> 
                            <span className="text-sm font-medium">Delete Account</span>
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
