import React from "react";
import { Search, Bell, User, Settings, Shield, LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/useAuth";
import { useProfile } from "@/lib/useProfile";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const AdminNavbar = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="h-20 border-b border-border bg-card/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for users, releases, or artists..." 
            className="pl-10 bg-secondary/30 border-none h-11 rounded-xl focus-visible:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>

        <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-secondary/50">
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card"></span>
        </Button>

        <div className="h-8 w-px bg-border mx-2"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-11 w-11 rounded-xl p-0 hover:bg-secondary/50">
              <Avatar className="h-9 w-9 border border-primary/20">
                <AvatarImage src={profile?.photoURL || user?.photoURL || ""} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {(profile?.displayName || user?.displayName || "A").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mt-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-primary/20">
                  <AvatarImage src={profile?.photoURL || user?.photoURL || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {(profile?.displayName || user?.displayName || "A").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none">{profile?.displayName || user?.displayName || "Admin"}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")} className="p-3 cursor-pointer">
              <User className="mr-3 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/admin/settings")} className="p-3 cursor-pointer">
              <Settings className="mr-3 h-4 w-4" />
              <span>System Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/")} className="p-3 cursor-pointer">
              <Shield className="mr-3 h-4 w-4" />
              <span>View Site</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="p-3 cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-3 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
