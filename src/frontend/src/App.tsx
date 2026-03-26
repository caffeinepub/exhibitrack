import UserLayout from "@/components/UserLayout";
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
import Documents from "@/pages/Documents";
import EventDetails from "@/pages/EventDetails";
import Login from "@/pages/Login";
import Payments from "@/pages/Payments";
import Services from "@/pages/Services";
import SettingsPage from "@/pages/Settings";
import Vendors from "@/pages/Vendors";
import Visitors from "@/pages/Visitors";
import UserBoothApply from "@/pages/user/UserBoothApply";
import UserDashboard from "@/pages/user/UserDashboard";
import UserDocuments from "@/pages/user/UserDocuments";
import UserPayments from "@/pages/user/UserPayments";
import UserProfile from "@/pages/user/UserProfile";
import UserServices from "@/pages/user/UserServices";
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
  CalendarDays,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  MapIcon,
  Menu,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const queryClient = new QueryClient();

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/event-details", label: "Event Details", icon: CalendarDays },
  { path: "/vendors", label: "Vendors", icon: Users },
  { path: "/booth-map", label: "Booth Allocation", icon: MapIcon },
  { path: "/payments", label: "Payment Monitoring", icon: CreditCard },
  { path: "/visitors", label: "Crowd", icon: Activity },
  { path: "/analytics", label: "Report", icon: BarChart2 },
];

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/event-details": "Event Details",
  "/booth-map": "Booth Allocation",
  "/vendors": "Vendor Management",
  "/visitors": "Crowd Monitoring",
  "/analytics": "Reports & Analytics",
  "/documents": "Document Verification",
  "/payments": "Payment Monitoring",
  "/services": "Service Providers",
  "/settings": "Settings",
};

interface LayoutProps {
  onSignOut: () => void;
  authName: string;
}

function Layout({ onSignOut, authName }: LayoutProps) {
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
          className="flex-1 py-4 px-2 space-y-1 overflow-y-auto"
          aria-label="Main navigation"
        >
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              data-ocid={`nav.${label.toLowerCase().replace(/ /g, "_")}.link`}
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

          <div className="relative">
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
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-teal-dim border border-teal/30 flex items-center justify-center text-teal text-xs font-bold">
                  {authName?.[0]?.toUpperCase() ?? "A"}
                </div>
                <span className="text-foreground">{authName || "Admin"}</span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={onSignOut}
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

// ─── Admin router ───────────────────────────────────────────────────────────

const adminRootRoute = createRootRoute({ component: () => <Outlet /> });

function makeAdminLayoutRoute(onSignOut: () => void, authName: string) {
  return createRoute({
    getParentRoute: () => adminRootRoute,
    id: "admin-layout",
    component: () => <Layout onSignOut={onSignOut} authName={authName} />,
  });
}

function buildAdminRouter(onSignOut: () => void, authName: string) {
  const layoutRoute = makeAdminLayoutRoute(onSignOut, authName);

  const routes = [
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/",
      component: Dashboard,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/event-details",
      component: EventDetails,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/booth-map",
      component: BoothMap,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/vendors",
      component: Vendors,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/visitors",
      component: Visitors,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/analytics",
      component: Analytics,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/settings",
      component: SettingsPage,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/documents",
      component: Documents,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/payments",
      component: Payments,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/services",
      component: Services,
    }),
  ];

  const routeTree = adminRootRoute.addChildren([
    layoutRoute.addChildren(routes),
  ]);
  return createRouter({ routeTree });
}

// ─── User portal router ──────────────────────────────────────────────────────

const userRootRoute = createRootRoute({ component: () => <Outlet /> });

function makeUserLayoutRoute(onSignOut: () => void, authName: string) {
  return createRoute({
    getParentRoute: () => userRootRoute,
    id: "user-layout",
    component: () => <UserLayout onSignOut={onSignOut} authName={authName} />,
  });
}

function buildUserRouter(onSignOut: () => void, authName: string) {
  const layoutRoute = makeUserLayoutRoute(onSignOut, authName);

  const routes = [
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/",
      component: UserDashboard,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/booth-apply",
      component: UserBoothApply,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/documents",
      component: UserDocuments,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/payments",
      component: UserPayments,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/services",
      component: UserServices,
    }),
    createRoute({
      getParentRoute: () => layoutRoute,
      path: "/profile",
      component: UserProfile,
    }),
  ];

  const routeTree = userRootRoute.addChildren([
    layoutRoute.addChildren(routes),
  ]);
  return createRouter({ routeTree });
}

// ─── Root App ────────────────────────────────────────────────────────────────

export default function App() {
  const [auth, setAuth] = useState<{ role: string; name: string } | null>(
    () => {
      try {
        const stored = localStorage.getItem("exhibitrack_auth");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    },
  );

  function handleLogin(role: "admin" | "user") {
    const name = role === "admin" ? "Admin" : "User";
    const authData = { role, name };
    localStorage.setItem("exhibitrack_auth", JSON.stringify(authData));
    setAuth(authData);
  }

  function handleSignOut() {
    localStorage.removeItem("exhibitrack_auth");
    setAuth(null);
  }

  if (!auth) {
    return (
      <QueryClientProvider client={queryClient}>
        <Login onLogin={handleLogin} />
        <Toaster />
      </QueryClientProvider>
    );
  }

  const router =
    auth.role === "user"
      ? buildUserRouter(handleSignOut, auth.name)
      : buildAdminRouter(handleSignOut, auth.name);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
