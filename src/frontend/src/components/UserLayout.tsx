import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  BarChart2,
  ChevronDown,
  CreditCard,
  FileText,
  LayoutDashboard,
  MapPin,
  Menu,
  User,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/booth-apply", label: "Booth Apply", icon: MapPin },
  { path: "/documents", label: "Documents", icon: FileText },
  { path: "/payments", label: "Payments", icon: CreditCard },
  { path: "/services", label: "Services", icon: Wrench },
  { path: "/profile", label: "Profile", icon: User },
];

const pageTitles: Record<string, string> = {
  "/": "My Dashboard",
  "/booth-apply": "Booth Application",
  "/documents": "My Documents",
  "/payments": "My Payments",
  "/services": "Service Requests",
  "/profile": "My Profile",
};

interface UserLayoutProps {
  onSignOut: () => void;
  authName: string;
}

export default function UserLayout({ onSignOut, authName }: UserLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] ?? "User Portal";
  const initials = authName
    ? authName
        .split("@")[0]
        .split(".")
        .map((s: string) => s[0]?.toUpperCase() ?? "")
        .join("")
        .slice(0, 2)
    : "U";

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-16"
        } bg-sidebar border-r border-sidebar-border`}
      >
        <div className="flex items-center gap-2.5 px-4 h-16 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-dim border border-teal/30">
            <Zap className="w-4 h-4 text-teal" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col min-w-0">
              <span className="text-base font-bold leading-tight">
                <span className="text-teal">Exhibi</span>
                <span className="text-foreground">Track</span>
              </span>
              <span className="text-[10px] font-semibold text-teal/70 uppercase tracking-widest">
                User Portal
              </span>
            </div>
          )}
        </div>

        <nav
          className="flex-1 py-4 px-2 space-y-1 overflow-y-auto"
          aria-label="User navigation"
        >
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              data-ocid={`user_nav.${label.toLowerCase().replace(/ /g, "_")}.link`}
              activeProps={{
                className: "bg-teal-dim text-teal border border-teal/20",
              }}
              inactiveProps={{
                className:
                  "text-muted-foreground hover:text-foreground hover:bg-secondary",
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
              {sidebarOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center justify-center w-full p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-4 px-6 h-16 border-b border-border bg-card flex-shrink-0">
          <h1 className="text-lg font-semibold text-foreground flex-1">
            {pageTitle}
          </h1>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-teal-dim border border-teal/20">
            <BarChart2 className="w-3 h-3 text-teal" />
            <span className="text-[10px] font-bold text-teal uppercase tracking-wider">
              Vendor
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              data-ocid="user_header.user.dropdown_menu"
            >
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-teal-dim border border-teal/30 flex items-center justify-center text-teal text-xs font-bold">
                  {initials}
                </div>
                <span className="text-foreground max-w-[120px] truncate">
                  {authName || "User"}
                </span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link to="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={onSignOut}
                data-ocid="user_header.signout.button"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        <footer className="px-6 py-3 border-t border-border text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ExhibiTrack.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline"
          >
            Built with &hearts; using caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
