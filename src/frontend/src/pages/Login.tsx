import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, Shield, User, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface LoginProps {
  onLogin: (role: "admin" | "user") => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userError, setUserError] = useState("");

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "admin123") {
      onLogin("admin");
    } else {
      setAdminError("Invalid username or password.");
    }
  }

  function handleUserLogin(e: React.FormEvent) {
    e.preventDefault();
    if (userEmail.trim() && userPass.trim()) {
      onLogin("user");
    } else {
      setUserError("Please enter your email and password.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(ellipse 120% 100% at 50% 0%, oklch(0.15 0.012 200), oklch(0.1 0.005 240) 60%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 600px at 50% 20%, oklch(0.75 0.12 185 / 0.07), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-dim border border-teal/30 mb-4 shadow-glow">
            <Zap className="w-7 h-7 text-teal" />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-teal">Exhibi</span>
            <span className="text-foreground">Track</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Exhibition Management System
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-card p-8">
          <Tabs defaultValue="admin">
            <TabsList className="w-full mb-6 bg-secondary">
              <TabsTrigger
                value="admin"
                className="flex-1 gap-2 data-[state=active]:bg-teal-dim data-[state=active]:text-teal"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Login
              </TabsTrigger>
              <TabsTrigger
                value="user"
                className="flex-1 gap-2 data-[state=active]:bg-teal-dim data-[state=active]:text-teal"
              >
                <User className="w-3.5 h-3.5" />
                User Login
              </TabsTrigger>
            </TabsList>

            {/* Admin login */}
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="admin-username">Username</Label>
                  <Input
                    id="admin-username"
                    placeholder="Enter username"
                    value={adminUser}
                    onChange={(e) => {
                      setAdminUser(e.target.value);
                      setAdminError("");
                    }}
                    autoComplete="username"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter password"
                    value={adminPass}
                    onChange={(e) => {
                      setAdminPass(e.target.value);
                      setAdminError("");
                    }}
                    autoComplete="current-password"
                  />
                </div>
                {adminError && (
                  <p className="text-xs text-destructive">{adminError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-teal text-background hover:bg-teal-bright font-semibold gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Default: admin / admin123
                </p>
              </form>
            </TabsContent>

            {/* User login */}
            <TabsContent value="user">
              <form onSubmit={handleUserLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="Enter your email"
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                      setUserError("");
                    }}
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    type="password"
                    placeholder="Enter your password"
                    value={userPass}
                    onChange={(e) => {
                      setUserPass(e.target.value);
                      setUserError("");
                    }}
                    autoComplete="current-password"
                  />
                </div>
                {userError && (
                  <p className="text-xs text-destructive">{userError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-teal text-background hover:bg-teal-bright font-semibold gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          &copy; {new Date().getFullYear()} ExhibiTrack.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline"
          >
            Built with ♥ using caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
