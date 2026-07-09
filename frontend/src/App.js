import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import MarketingLayout from "@/components/MarketingLayout";
import AppShell from "@/components/AppShell";

import Home from "@/pages/Home";
import Features from "@/pages/Features";
import Security from "@/pages/Security";
import Solutions from "@/pages/Solutions";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import SignIn from "@/pages/SignIn";

import AppDashboard from "@/pages/AppDashboard";
import AppDocuments from "@/pages/AppDocuments";
import AppSignatures from "@/pages/AppSignatures";
import AppVerification from "@/pages/AppVerification";
import AppSettings from "@/pages/AppSettings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            classNames: {
              toast:
                "!bg-white !text-slate-900 !border !border-slate-200 !shadow-sm",
            },
          }}
        />
        <Routes>
          {/* Marketing site */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/security" element={<Security />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>

          {/* Authenticated app shell (placeholder auth) */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<AppDashboard />} />
            <Route path="documents" element={<AppDocuments />} />
            <Route path="signatures" element={<AppSignatures />} />
            <Route path="verification" element={<AppVerification />} />
            <Route path="settings" element={<AppSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
