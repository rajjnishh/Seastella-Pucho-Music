import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Camera, Save, Shield, Bell } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { useProfile } from "@/lib/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db, storage } from "@/lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile as updateAuthProfile } from "firebase/auth";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

const Profile = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("artist");
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize display name from profile
  useEffect(() => {
    if (profile?.displayName) setDisplayName(profile.displayName);
    if (profile?.role) setRole(profile.role);
  }, [profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      let newPhotoURL = profile?.photoURL || user.photoURL;

      if (photoFile) {
        const fileRef = ref(storage, `profiles/${user.uid}/${photoFile.name}`);
        await uploadBytes(fileRef, photoFile);
        newPhotoURL = await getDownloadURL(fileRef);
        
        // Update auth profile as well
        await updateAuthProfile(user, { photoURL: newPhotoURL });
      }

      await updateDoc(doc(db, "users", user.uid), {
        displayName,
        role,
        ...(newPhotoURL && { photoURL: newPhotoURL }),
        updatedAt: serverTimestamp(),
      });
      
      toast.success("Profile updated successfully!");
      setPhotoFile(null); // Reset file after successful upload
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <motion.div 
        className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account information and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <Button variant="hero" className="w-full justify-start gap-2">
              <User size={18} /> Personal Info
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Shield size={18} /> Security
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Bell size={18} /> Notifications
            </Button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your public profile details.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <Avatar className="h-20 w-20 border-2 border-primary/20">
                        <AvatarImage src={photoPreview || profile?.photoURL || user?.photoURL || ""} />
                        <AvatarFallback className="text-xl bg-primary/10 text-primary">
                          {(profile?.displayName || user?.displayName || "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Camera className="text-white" size={20} />
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Profile Picture</h3>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input 
                        id="name" 
                        value={displayName || profile?.displayName || ""} 
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your artist name"
                        className="bg-secondary/50 border-primary/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          value={user?.email || ""} 
                          disabled 
                          className="pl-10 bg-secondary/30 border-primary/5 text-muted-foreground"
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">Email cannot be changed directly. Contact support for assistance.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Account Role</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger id="role" className="bg-secondary/50 border-primary/10">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="artist">Artist</SelectItem>
                          <SelectItem value="label">Label</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-[10px] text-muted-foreground">Change your role to test different dashboard views.</p>
                    </div>
                  </div>

                  <Button type="submit" className="gap-2" variant="hero" disabled={loading}>
                    <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Profile;
