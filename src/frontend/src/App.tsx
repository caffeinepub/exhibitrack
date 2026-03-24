import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";
import Analytics from "@/pages/Analytics";
import BoothMap from "@/pages/BoothMap";
import Dashboard from "@/pages/Dashboard";
import SettingsPage from "@/pages/Settings";
import Vendors from "@/pages/Vendors";
import Visitors from "@/pages/Visitors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useLocation,
} from "@tanstack/react-router";
import {
  Activity,
  BarChart2,
  Bell,
  ChevronDown,
  LayoutDashboard,
  MapIcon,
  Menu,
  Settings,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const queryClient = new QueryClient();

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/booth-map", label: "Booth Map", icon: MapIcon },
  { path: "/vendors", label: "Vendors", icon: Users },
  { path: "/visitors", label: "Visitors", icon: Activity },
  { path: "/analytics", label: "Analytics", icon: BarChart2 },
  { path: "/settings", label: "Settings", icon: Settings },
];

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/booth-map": "Booth Map",
  "/vendors": "Vendor Management",
  "/visitors": "Visitor Monitoring",
  "/analytics": "Analytics & Reports",
  "/settings": "Settings",
};

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] ?? "ExhibiTrack";

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
            <span className="text-lg font-bold">
              <span className="text-teal">Exhibi</span>
              <span className="text-foreground">Track</span>
            </span>
          )}
        </div>

        <nav
          className="flex-1 py-4 px-2 space-y-1"
          aria-label="Main navigation"
        >
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              data-ocid={`nav.${label.toLowerCase().replace(" ", "_")}.link`}
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

          <div className="relative" data-ocid="header.notification.button">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full">
                3
              </span>
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild data-ocid="header.user.dropdown_menu">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-teal-dim border border-teal/30 flex items-center justify-center text-teal text-xs font-bold">
                  A
                </div>
                <span className="text-foreground">Admin</span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
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

const rootRoute = createRootRoute({ component: Layout });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});
const boothMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booth-map",
  component: BoothMap,
});
const vendorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendors",
  component: Vendors,
});
const visitorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visitors",
  component: Visitors,
});
const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: Analytics,
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  boothMapRoute,
  vendorsRoute,
  visitorsRoute,
  analyticsRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
