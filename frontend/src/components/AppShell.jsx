import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";

const AppShell = () => (
  <div className="flex min-h-screen bg-white" data-testid="app-shell">
    <AppSidebar />
    <div className="flex min-w-0 flex-1 flex-col">
      <AppHeader />
      <main className="flex-1 bg-slate-50/40 px-6 py-8 lg:px-10" data-testid="app-main">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AppShell;
