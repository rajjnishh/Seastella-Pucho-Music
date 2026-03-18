import Navbar from "@/components/Navbar";
import FloatingButtons from "@/components/FloatingButtons";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (_data: FormData) => {
    // placeholder
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
          <h1 className="text-2xl font-bold text-foreground mb-1">Create Account</h1>
          <p className="text-sm text-muted-foreground mb-6">Start your music journey with <span className="text-primary">Pucho</span> Music</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input placeholder="Full Name" {...register("name")} className="bg-secondary border-none" />
              {errors.name && <p className="text-xs text-primary mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Input placeholder="Email" {...register("email")} className="bg-secondary border-none" />
              {errors.email && <p className="text-xs text-primary mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Input type="password" placeholder="Password" {...register("password")} className="bg-secondary border-none" />
              {errors.password && <p className="text-xs text-primary mt-1">{errors.password.message}</p>}
            </div>
            <Button variant="hero" size="xl" type="submit" className="w-full">Sign Up</Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Log In</Link>
          </p>
        </motion.div>
      </div>
      <FloatingButtons />
    </div>
  );
};

export default Signup;
