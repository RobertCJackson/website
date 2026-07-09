import { useState } from "react";
import { Building2, Users, Key, Bell, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";

const TEAM = [
  { name: "James Hughes", email: "james@ashford-legal.co.uk", role: "Owner", initials: "JH" },
  { name: "Aisha Malik", email: "aisha@ashford-legal.co.uk", role: "Admin", initials: "AM" },
  { name: "Rachel Beaumont", email: "rachel@ashford-legal.co.uk", role: "Signer", initials: "RB" },
  { name: "Michael Pearce", email: "michael@ashford-legal.co.uk", role: "Viewer", initials: "MP" },
];

const AppSettings = () => {
  const [org, setOrg] = useState({
    name: "Ashford Legal LLP",
    domain: "ashford-legal.co.uk",
    industry: "Legal",
    country: "United Kingdom",
  });
  const [notify, setNotify] = useState({
    signed: true,
    witnessed: true,
    failedVerification: true,
    weeklyDigest: false,
  });

  return (
    <div className="space-y-6" data-testid="settings-page">
      <div>
        <h2 className="font-display text-2xl font-bold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-600">
          Manage your organization, team, permissions, and notifications.
        </p>
      </div>

      <Tabs defaultValue="organization" className="w-full">
        <TabsList
          className="grid w-full max-w-xl grid-cols-4 rounded-lg border border-slate-200 bg-white p-1"
          data-testid="settings-tabs"
        >
          <TabsTrigger value="organization" data-testid="tab-organization">
            <Building2 className="mr-1.5 h-3.5 w-3.5" /> Organization
          </TabsTrigger>
          <TabsTrigger value="team" data-testid="tab-team">
            <Users className="mr-1.5 h-3.5 w-3.5" /> Team
          </TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security">
            <Key className="mr-1.5 h-3.5 w-3.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">
            <Bell className="mr-1.5 h-3.5 w-3.5" /> Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="mt-6">
          <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-8">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Organization profile
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              This information appears on your audit certificates and signer
              emails.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="org-name">Legal name</Label>
                <Input
                  id="org-name"
                  value={org.name}
                  onChange={(e) => setOrg((o) => ({ ...o, name: e.target.value }))}
                  className="mt-1.5"
                  data-testid="org-name-input"
                />
              </div>
              <div>
                <Label htmlFor="org-domain">Primary domain</Label>
                <Input
                  id="org-domain"
                  value={org.domain}
                  onChange={(e) => setOrg((o) => ({ ...o, domain: e.target.value }))}
                  className="mt-1.5"
                  data-testid="org-domain-input"
                />
              </div>
              <div>
                <Label htmlFor="org-industry">Industry</Label>
                <Input
                  id="org-industry"
                  value={org.industry}
                  onChange={(e) => setOrg((o) => ({ ...o, industry: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="org-country">Country</Label>
                <Input
                  id="org-country"
                  value={org.country}
                  onChange={(e) => setOrg((o) => ({ ...o, country: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                className="rounded-md bg-blue-700 text-white hover:bg-blue-800"
                onClick={() => toast.success("Organization profile saved.")}
                data-testid="save-org-btn"
              >
                <Save className="mr-1.5 h-4 w-4" /> Save changes
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h3 className="font-display text-base font-semibold text-slate-900">
                Team members
              </h3>
              <Button
                className="rounded-md bg-blue-700 text-white hover:bg-blue-800"
                data-testid="invite-member-btn"
              >
                Invite member
              </Button>
            </div>
            <ul className="divide-y divide-slate-100">
              {TEAM.map((m) => (
                <li
                  key={m.email}
                  className="flex items-center justify-between px-6 py-4"
                  data-testid={`member-${m.initials}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                      {m.initials}
                    </span>
                    <div>
                      <div className="font-medium text-slate-900">{m.name}</div>
                      <div className="text-xs text-slate-500">{m.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                      {m.role}
                    </span>
                    <button
                      className="text-slate-400 transition-colors hover:text-rose-600"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="max-w-2xl space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-8">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Single Sign-On
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Enable SAML SSO for your team. Available on the Enterprise plan.
              </p>
              <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div>
                  <div className="font-medium text-slate-900">Require SSO</div>
                  <div className="text-xs text-slate-500">
                    Password login disabled for members
                  </div>
                </div>
                <Switch data-testid="require-sso-switch" />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-8">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                API keys
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Programmatic access for webhooks, CRM connectors, and custom
                integrations.
              </p>
              <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
                <div>
                  <div className="font-mono-ibm text-sm text-slate-900">
                    sk_live_••••••••••••4a7f
                  </div>
                  <div className="text-xs text-slate-500">
                    Created 12 Jan 2026 · Last used 2h ago
                  </div>
                </div>
                <Button variant="outline" className="text-sm">
                  Rotate
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-8">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Notification preferences
            </h3>
            <div className="mt-6 space-y-3">
              {[
                { key: "signed", label: "Document signed", body: "Email me when a signer completes." },
                { key: "witnessed", label: "Deed witnessed", body: "Email me when the witness attests." },
                { key: "failedVerification", label: "Failed verification", body: "Alert me if OneID rejects a signer." },
                { key: "weeklyDigest", label: "Weekly digest", body: "Every Monday, activity summary." },
              ].map((n) => (
                <div
                  key={n.key}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4"
                  data-testid={`notify-${n.key}`}
                >
                  <div>
                    <div className="font-medium text-slate-900">{n.label}</div>
                    <div className="text-xs text-slate-500">{n.body}</div>
                  </div>
                  <Switch
                    checked={notify[n.key]}
                    onCheckedChange={(v) =>
                      setNotify((s) => ({ ...s, [n.key]: v }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppSettings;
