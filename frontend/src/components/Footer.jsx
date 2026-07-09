import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-slate-200 bg-slate-50" data-testid="marketing-footer">
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
            UK-compliant eSignatures and remote deed witnessing on a single
            platform. Built for solicitors, conveyancers, and enterprise teams
            that need trusted, auditable digital signing.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="mailto:hello@touch2sign.com"
              className="rounded-md border border-slate-300 p-2 text-slate-600 transition-colors hover:border-blue-700 hover:text-blue-700"
              aria-label="Email"
              data-testid="footer-email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-md border border-slate-300 p-2 text-slate-600 transition-colors hover:border-blue-700 hover:text-blue-700"
              aria-label="LinkedIn"
              data-testid="footer-linkedin"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-md border border-slate-300 p-2 text-slate-600 transition-colors hover:border-blue-700 hover:text-blue-700"
              aria-label="Twitter"
              data-testid="footer-twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Product
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/features" className="text-slate-700 hover:text-blue-700">Features</Link></li>
            <li><Link to="/security" className="text-slate-700 hover:text-blue-700">Security &amp; Compliance</Link></li>
            <li><Link to="/solutions" className="text-slate-700 hover:text-blue-700">Solutions</Link></li>
            <li><Link to="/pricing" className="text-slate-700 hover:text-blue-700">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Company
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/contact" className="text-slate-700 hover:text-blue-700">Book a demo</Link></li>
            <li><a href="#" className="text-slate-700 hover:text-blue-700">About</a></li>
            <li><a href="#" className="text-slate-700 hover:text-blue-700">Partners</a></li>
            <li><a href="#" className="text-slate-700 hover:text-blue-700">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Legal
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="#" className="text-slate-700 hover:text-blue-700">Terms</a></li>
            <li><a href="#" className="text-slate-700 hover:text-blue-700">Privacy</a></li>
            <li><a href="#" className="text-slate-700 hover:text-blue-700">DPA</a></li>
            <li><a href="#" className="text-slate-700 hover:text-blue-700">Sub-processors</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Touch2Sign Ltd. Registered in England &amp; Wales.</p>
        <p className="font-mono-ibm">
          eIDAS QES · UK ECA 2000 · UK DIATF · PAdES · SCCR
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
