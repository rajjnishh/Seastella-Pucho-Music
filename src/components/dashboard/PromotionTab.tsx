import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Link as LinkIcon, Share2, Music, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const PromotionTab = () => {
  const [smartlink, setSmartlink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerateSmartlink = () => {
    setSmartlink("https://PUCHO.link/midnight-echoes");
    toast.success("Smartlink generated successfully!");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(smartlink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitPitch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Playlist pitch submitted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Promotion Tools</h2>
          <p className="text-muted-foreground">Pitch your music, generate smartlinks, and tell your story.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="text-primary" size={20} /> Playlist Pitching
            </CardTitle>
            <CardDescription>Submit your upcoming release for editorial playlist consideration.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPitch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="release">Select Release</Label>
                <Select>
                  <SelectTrigger id="release">
                    <SelectValue placeholder="Select an upcoming release" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="r104">Summer Vibes (Single)</SelectItem>
                    <SelectItem value="r105">Autumn Leaves (EP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genre">Primary Genre</Label>
                <Select>
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="hiphop">Hip Hop / Rap</SelectItem>
                    <SelectItem value="electronic">Electronic / Dance</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="rnb">R&B / Soul</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="story">Story Behind the Song</Label>
                <Textarea 
                  id="story" 
                  placeholder="Tell editors what inspired this track, the creative process, and why it stands out..." 
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-muted-foreground">This helps curators understand the context of your music.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketing">Marketing Plan</Label>
                <Textarea 
                  id="marketing" 
                  placeholder="Briefly describe your marketing strategy (social media, ads, PR, etc.)..." 
                  className="min-h-[80px] resize-none"
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send size={16} /> Submit Pitch
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="text-primary" size={20} /> Smartlink Generator
              </CardTitle>
              <CardDescription>Create a single landing page for all your DSP links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smartlink-release">Select Release</Label>
                <Select>
                  <SelectTrigger id="smartlink-release">
                    <SelectValue placeholder="Select a live release" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="r101">Midnight Echoes</SelectItem>
                    <SelectItem value="r102">Neon Dreams EP</SelectItem>
                    <SelectItem value="r103">Urban Jungle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleGenerateSmartlink} variant="secondary" className="w-full gap-2">
                <Share2 size={16} /> Generate Link
              </Button>

              {smartlink && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <Label className="text-xs text-muted-foreground mb-2 block">Your Smartlink</Label>
                  <div className="flex items-center gap-2">
                    <Input value={smartlink} readOnly className="bg-background" />
                    <Button variant="outline" size="icon" onClick={handleCopyLink} className="shrink-0">
                      {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Promotion Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p>Pitch your release at least <strong>14 days</strong> before the release date.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p>Keep your "Story Behind the Song" concise but engaging. Focus on emotion and unique elements.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p>Use your Smartlink in all your social media bios to route fans to their preferred platform.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
