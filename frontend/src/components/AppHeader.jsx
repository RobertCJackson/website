import { Bell, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";

const AppHeader = () => {
  const { pathname } = useLocation();
  const titleMap = {
    "/app": "Dashboard",
    "/app/documents": "Documents",
    "/app/signatures": "Signatures & workflows",
    "/app/verification": "Identity verification",
    "/app/settings": "Settings",
  };
  const title = titleMap[pathname] || "Dashboard";

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6"
      data-testid="app-header"
    >
      <h1 className="font-display text-lg font-semibold text-slate-900">
        {title}
      </h1>

      <div className="relative ml-6 hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search documents, signers, deed IDs…"
          className="pl-9"
          data-testid="app-search-input"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Button
          className="hidden gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 sm:inline-flex"
          data-testid="new-document-btn"
        >
          <Plus className="h-4 w-4" />
          New document
        </Button>

        <button
          type="button"
          className="relative rounded-md border border-slate-200 p-2 text-slate-600 hover:border-slate-300"
          data-testid="notifications-btn"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-md border border-slate-200 px-2.5 py-1.5 text-sm font-medium text-slate-700 hover:border-slate-300"
              data-testid="app-user-menu"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                JH
              </span>
              <span className="hidden sm:inline">James H.</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Ashford Legal LLP</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/settings" data-testid="menu-settings">Organization settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>API keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/" data-testid="menu-signout">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
