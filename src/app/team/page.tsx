"use client";

import { useState } from "react";
import { UserCog, Mail, Plus, X, RefreshCw, CheckCircle2, Shield, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "Admin" | "Manager" | "Viewer";
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "pending";
  joinedAt: string;
}

const initialTeam: TeamMember[] = [
  { id: "1", name: "Alex Johnson", email: "alex@agency.com", role: "Admin", status: "active", joinedAt: "2024-01-15" },
  { id: "2", name: "Priya Sharma", email: "priya@agency.com", role: "Manager", status: "active", joinedAt: "2024-02-20" },
  { id: "3", name: "Carlos Rivera", email: "carlos@agency.com", role: "Viewer", status: "pending", joinedAt: "2024-06-01" },
];

const roleConfig: Record<Role, { color: string; description: string }> = {
  Admin: { color: "bg-primary/10 text-primary", description: "Full access to all settings and billing" },
  Manager: { color: "bg-amber-50 text-amber-700", description: "Manage businesses, posts, and reviews" },
  Viewer: { color: "bg-surface-container text-on-surface-variant", description: "Read-only access to reports" },
};

export default function TeamPage() {
  const [team, setTeam] = useState(initialTeam);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Viewer");
  const [inviting, setInviting] = useState(false);
  const [invited, setInvited] = useState(false);

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setInviting(true);
    await new Promise((r) => setTimeout(r, 900));
    setTeam((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole,
        status: "pending",
        joinedAt: new Date().toISOString().slice(0, 10),
      },
    ]);
    setInviteEmail("");
    setInviting(false);
    setInvited(true);
    setTimeout(() => { setInvited(false); setShowInvite(false); }, 1500);
  };

  const handleRemove = (id: string) => setTeam((prev) => prev.filter((m) => m.id !== id));

  const handleRoleChange = (id: string, role: Role) =>
    setTeam((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      <div className="flex justify-between items-end flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">Team Management</h2>
          <p className="text-on-surface-variant mt-1">
            Invite team members and assign roles to manage access.
          </p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      {/* Role descriptions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(Object.entries(roleConfig) as [Role, typeof roleConfig[Role]][]).map(([role, cfg]) => (
          <div key={role} className="bg-white rounded-xl border border-outline-variant p-5 flex items-start gap-3 animate-fade-in">
            <Shield className={cn("w-5 h-5 mt-0.5 shrink-0", role === "Admin" ? "text-primary" : role === "Manager" ? "text-amber-500" : "text-on-surface-variant")} />
            <div>
              <p className="font-semibold text-on-surface">{role}</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{cfg.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-semibold text-on-surface">Members ({team.length})</h3>
        </div>
        <div className="divide-y divide-outline-variant">
          {team.map((member) => (
            <div key={member.id} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors">
              <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-sm font-bold text-on-primary-container shrink-0">
                {member.name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-on-surface text-sm">{member.name}</p>
                <p className="text-xs text-on-surface-variant">{member.email}</p>
              </div>
              <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold", roleConfig[member.role].color)}>
                {member.role}
              </span>
              <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold capitalize",
                member.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
              )}>
                {member.status}
              </span>
              <div className="flex items-center gap-1">
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value as Role)}
                  className="px-2 py-1 border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Viewer</option>
                </select>
                <button onClick={() => handleRemove(member.id)} className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowInvite(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-primary/10 rounded-xl"><UserCog className="w-5 h-5 text-primary" /></span>
                <h3 className="font-bold text-on-surface text-lg">Invite Team Member</h3>
              </div>
              <button onClick={() => setShowInvite(false)} className="p-2 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="colleague@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Role</label>
                <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value as Role)} className="w-full px-4 py-2.5 border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowInvite(false)} className="flex-1 py-2.5 border border-outline-variant rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleInvite}
                  disabled={inviting || !inviteEmail}
                  className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all", inviting || !inviteEmail ? "bg-primary/50" : "bg-primary hover:opacity-90 active:scale-95 shadow-lg")}
                >
                  {invited ? <><CheckCircle2 className="w-4 h-4" /> Sent!</> : inviting ? <><RefreshCw className="w-4 h-4 animate-spin" /> Sending...</> : <><Mail className="w-4 h-4" /> Send Invite</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
