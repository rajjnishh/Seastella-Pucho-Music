import Navbar from "@/components/Navbar";
import FloatingButtons from "@/components/FloatingButtons";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";
import React, { useState } from "react";
import { Chrome } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to login with Google");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Please enter your email address");
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent! Check your inbox.");
      setIsResettingPassword(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-surface p-8 sm:p-10 w-full max-w-md"
        >
          {isResettingPassword ? (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-1">Reset Password</h1>
              <p className="text-sm text-muted-foreground mb-6">Enter your email to receive a password reset link.</p>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <Input 
                    type="email"
                    placeholder="Email address" 
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="bg-secondary border-none" 
                  />
                </div>
                <Button variant="hero" size="xl" type="submit" className="w-full" disabled={resetLoading}>
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground mt-6 text-center">
                Remember your password?{" "}
                <button onClick={() => setIsResettingPassword(false)} className="text-primary font-medium hover:underline">
                  Log In
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-primary/20">
              <img 
                src="/logo.png" 
                alt="Pucho Music Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome Back</h1>
              <p className="text-sm text-muted-foreground mb-6">Log in to your <span className="text-primary">Pucho</span> Music account</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input placeholder="Email" {...register("email")} className="bg-secondary border-none" />
                  {errors.email && <p className="text-xs text-primary mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Input type="password" placeholder="Password" {...register("password")} className="bg-secondary border-none" />
                  {errors.password && <p className="text-xs text-primary mt-1">{errors.password.message}</p>}
                  <div className="flex justify-end mt-1">
                    <button 
                      type="button" 
                      onClick={() => setIsResettingPassword(true)}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <Button variant="hero" size="xl" type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="xl" 
                className="w-full gap-2 border-primary/20 hover:bg-primary/5"
                onClick={handleGoogleLogin}
              >
                <Chrome size={18} /> Google
              </Button>

              <p className="text-sm text-muted-foreground mt-6 text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
      <FloatingButtons />
    </div>
  );
};

export default Login;
