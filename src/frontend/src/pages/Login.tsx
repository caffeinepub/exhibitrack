import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Lock, Shield, User, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface LoginProps {
  onLogin: (role: "admin" | "user") => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [adminForm, setAdminForm] = useState({ username: "", password: "" });
  const [userForm, setUserForm] = useState({ email: "", password: "" });
  const [showAdminPw, setShowAdminPw] = useState(false);
  const [showUserPw, setShowUserPw] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [userError, setUserError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setAdminError("");
    if (adminForm.username === "admin" && adminForm.password === "admin123") {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.setItem(
          "exhibitrack_auth",
          JSON.stringify({ role: "admin", name: "Rajesh Kumar" }),
        );
        onLogin("admin");
        setIsLoading(false);
      }, 600);
    } else {
      setAdminError("Invalid admin credentials. Try admin / admin123");
    }
  }

  function handleUserLogin(e: React.FormEvent) {
    e.preventDefault();
    setUserError("");
    if (userForm.email && userForm.password.length >= 4) {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.setItem(
          "exhibitrack_auth",
          JSON.stringify({ role: "user", name: userForm.email }),
        );
        onLogin("user");
        setIsLoading(false);
      }, 600);
    } else {
      setUserError("Please enter a valid email and password (min 4 chars).");
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
      {/* Background glow */}
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
        {/* Logo / Branding */}
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

        {/* Card */}
        <div
          className="bg-card border border-border rounded-2xl shadow-card p-8"
          data-ocid="login.modal"
        >
          <Tabs defaultValue="admin">
            <TabsList className="w-full mb-6 bg-secondary">
              <TabsTrigger
                value="admin"
                className="flex-1 gap-2 data-[state=active]:bg-teal-dim data-[state=active]:text-teal"
                data-ocid="login.admin.tab"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Login
              </TabsTrigger>
              <TabsTrigger
                value="user"
                className="flex-1 gap-2 data-[state=active]:bg-teal-dim data-[state=active]:text-teal"
                data-ocid="login.user.tab"
              >
                <User className="w-3.5 h-3.5" />
                User Login
              </TabsTrigger>
            </TabsList>

            {/* Admin login */}
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="admin-username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="admin-username"
                      placeholder="Enter admin username"
                      className="pl-9"
                      value={adminForm.username}
                      onChange={(e) =>
                        setAdminForm((f) => ({
                          ...f,
                          username: e.target.value,
                        }))
                      }
                      data-ocid="login.admin_username.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="admin-password"
                      type={showAdminPw ? "text" : "password"}
                      placeholder="Enter password"
                      className="pl-9 pr-9"
                      value={adminForm.password}
                      onChange={(e) =>
                        setAdminForm((f) => ({
                          ...f,
                          password: e.target.value,
                        }))
                      }
                      data-ocid="login.admin_password.input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showAdminPw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {adminError && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="login.admin.error_state"
                  >
                    {adminError}
                  </p>
                )}

                <div className="rounded-lg bg-teal-dim border border-teal/20 px-4 py-3 text-xs text-teal">
                  <strong>Demo credentials:</strong> admin / admin123
                </div>

                <Button
                  type="submit"
                  className="w-full bg-teal text-background hover:bg-teal-bright font-semibold"
                  disabled={isLoading}
                  data-ocid="login.admin.submit_button"
                >
                  {isLoading ? "Signing in…" : "Sign In as Admin"}
                </Button>
              </form>
            </TabsContent>

            {/* User login */}
            <TabsContent value="user">
              <form onSubmit={handleUserLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="user-email">Email Address</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-9"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm((f) => ({ ...f, email: e.target.value }))
                      }
                      data-ocid="login.user_email.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="user-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="user-password"
                      type={showUserPw ? "text" : "password"}
                      placeholder="Enter password"
                      className="pl-9 pr-9"
                      value={userForm.password}
                      onChange={(e) =>
                        setUserForm((f) => ({ ...f, password: e.target.value }))
                      }
                      data-ocid="login.user_password.input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowUserPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showUserPw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {userError && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="login.user.error_state"
                  >
                    {userError}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-teal text-background hover:bg-teal-bright font-semibold"
                  disabled={isLoading}
                  data-ocid="login.user.submit_button"
                >
                  {isLoading ? "Signing in…" : "Sign In"}
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
