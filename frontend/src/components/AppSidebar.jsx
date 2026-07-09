import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Signature,
  Fingerprint,
  Settings as SettingsIcon,
  LifeBuoy,
} from "lucide-react";
import Logo from "@/components/Logo";

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/documents", label: "Documents", icon: FileText },
  { to: "/app/signatures", label: "Signatures", icon: Signature },
  { to: "/app/verification", label: "Identity Verification", icon: Fingerprint },
  { to: "/app/settings", label: "Settings", icon: SettingsIcon },
];

const AppSidebar = () => (
  <aside
    className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-50 lg:flex"
    data-testid="app-sidebar"
  >
    <div className="flex h-16 items-center border-b border-slate-200 px-6">
      <Link to="/" data-testid="app-sidebar-logo">
        <Logo />
      </Link>
    </div>
    <nav className="flex-1 space-y-1 px-3 py-6">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md border-l-[3px] px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-blue-700 bg-blue-50 text-blue-700"
                : "border-transparent text-slate-600 hover:bg-white hover:text-slate-900"
            }`
          }
          data-testid={`sidebar-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
    <div className="border-t border-slate-200 p-4">
      <Link
        to="/contact"
        className="flex items-center gap-2 rounded-md bg-white p-3 text-sm text-slate-700 ring-1 ring-slate-200 transition-colors hover:ring-blue-200"
        data-testid="sidebar-support-link"
      >
        <LifeBuoy className="h-4 w-4 text-blue-700" />
        <div>
          <div className="text-sm font-semibold text-slate-900">Need help?</div>
          <div className="text-xs text-slate-500">Talk to our team</div>
        </div>
      </Link>
    </div>
  </aside>
);

export default AppSidebar;
