import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { to: "/features", label: "Features" },
  { to: "/security", label: "Security" },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Book Demo" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md"
      data-testid="marketing-navbar"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          to="/"
          className="flex items-center"
          data-testid="nav-home-link"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-link-${item.to.slice(1)}`}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-700"
                    : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/signin"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
            data-testid="nav-signin-link"
          >
            Sign In
          </Link>
          <Link to="/contact" data-testid="nav-book-demo-cta">
            <Button className="rounded-md bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800">
              Book a demo
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
        >
          {open ? (
            <X className="h-6 w-6 text-slate-800" />
          ) : (
            <Menu className="h-6 w-6 text-slate-800" />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden" data-testid="mobile-menu">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-slate-100 pt-3">
              <Link
                to="/signin"
                className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                data-testid="mobile-signin-link"
              >
                Sign In
              </Link>
              <Link
                to="/contact"
                className="flex-1 rounded-md bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800"
                data-testid="mobile-book-demo-cta"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
