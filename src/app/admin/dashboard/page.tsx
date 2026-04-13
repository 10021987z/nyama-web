"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Partnership = {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  companyName?: string;
  description?: string;
  city: string;
  quarter: string;
  vehicleType?: string;
  idNumber?: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
};

type PartnershipStats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

type DisputeStats = {
  open: number;
  underReview: number;
  resolved: number;
  escalated: number;
  critical: number;
  refundsXaf: number;
  avgResolutionHours: number;
};

type Tab = "overview" | "partnerships" | "disputes";
type StatusFilter = "all" | "pending" | "under_review" | "approved" | "rejected";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nyama_admin_token");
}

async function apiFetch(path: string, options?: RequestInit) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("nyama_admin_token");
    throw new Error("UNAUTHORIZED");
  }
  if (!res.ok) throw new Error("API Error");
  return res.json();
}

const statusLabels: Record<string, string> = {
  pending: "En attente",
  under_review: "En revue",
  approved: "Approuvée",
  rejected: "Rejetée",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  under_review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [pStats, setPStats] = useState<PartnershipStats | null>(null);
  const [dStats, setDStats] = useState<DisputeStats | null>(null);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedPartnership, setSelectedPartnership] =
    useState<Partnership | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const loadStats = useCallback(async () => {
    try {
      const [ps, ds] = await Promise.all([
        apiFetch("/admin/partnerships/stats"),
        apiFetch("/admin/disputes/stats"),
      ]);
      setPStats(ps);
      setDStats(ds);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        router.push("/admin/login");
      } else {
        setLoadError("Impossible de charger les données.");
      }
    }
  }, [router]);

  const loadPartnerships = useCallback(async () => {
    try {
      const filter =
        statusFilter === "all" ? "" : `?status=${statusFilter}`;
      const data = await apiFetch(`/admin/partnerships${filter}`);
      setPartnerships(data.items || []);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        router.push("/admin/login");
      }
    }
  }, [statusFilter, router]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    loadStats();
  }, [router, loadStats]);

  useEffect(() => {
    if (tab === "partnerships" || tab === "overview") {
      loadPartnerships();
    }
  }, [tab, statusFilter, loadPartnerships]);

  async function handleAction(id: string, status: string) {
    setActionLoading(true);
    try {
      await apiFetch(`/admin/partnerships/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, adminNotes: adminNotes || undefined }),
      });
      setSelectedPartnership(null);
      setAdminNotes("");
      await Promise.all([loadStats(), loadPartnerships()]);
    } catch {
      // silently handle
    } finally {
      setActionLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("nyama_admin_token");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-forest-500 text-white flex flex-col shrink-0 hidden lg:flex">
        <div className="p-6">
          <span className="text-2xl font-serif text-orange-400 font-bold">
            NYAMA
          </span>
          <p className="text-forest-200 text-xs mt-1">Administration</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <button
            onClick={() => setTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-btn text-left transition-colors ${
              tab === "overview"
                ? "bg-white/15 text-white"
                : "text-forest-200 hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Vue d&apos;ensemble
          </button>

          <button
            onClick={() => setTab("partnerships")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-btn text-left transition-colors ${
              tab === "partnerships"
                ? "bg-white/15 text-white"
                : "text-forest-200 hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Candidatures
            {pStats && pStats.pending > 0 && (
              <span className="ml-auto bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pStats.pending}
              </span>
            )}
          </button>

          <button
            onClick={() => setTab("disputes")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-btn text-left transition-colors ${
              tab === "disputes"
                ? "bg-white/15 text-white"
                : "text-forest-200 hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Litiges
            {dStats && dStats.open > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {dStats.open}
              </span>
            )}
          </button>
        </nav>

        <div className="p-3 space-y-1">
          <Link
            href="https://nyama-dashboard.vercel.app"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-btn text-forest-200 hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Dashboard principal
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-btn text-forest-200 hover:bg-white/10 transition-colors text-left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="lg:hidden bg-white card-shadow px-4 py-3 flex items-center justify-between">
          <span className="text-xl font-serif text-orange-500 font-bold">
            NYAMA
          </span>
          <div className="flex gap-2">
            {(["overview", "partnerships", "disputes"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-btn text-xs font-medium transition-colors ${
                  tab === t
                    ? "bg-forest-500 text-white"
                    : "bg-background text-charcoal"
                }`}
              >
                {t === "overview"
                  ? "Vue"
                  : t === "partnerships"
                    ? "Candidatures"
                    : "Litiges"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          {loadError && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-btn text-sm mb-6">
              {loadError}
            </div>
          )}

          {/* OVERVIEW TAB */}
          {tab === "overview" && (
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-charcoal mb-6">
                Vue d&apos;ensemble
              </h1>

              {/* Partnership stats */}
              <h2 className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider mb-3">
                Candidatures partenaires
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {pStats ? (
                  <>
                    <StatCard
                      label="Total"
                      value={pStats.total}
                      color="bg-charcoal/5"
                    />
                    <StatCard
                      label="En attente"
                      value={pStats.pending}
                      color="bg-yellow-50"
                      textColor="text-yellow-700"
                    />
                    <StatCard
                      label="Approuvées"
                      value={pStats.approved}
                      color="bg-green-50"
                      textColor="text-green-700"
                    />
                    <StatCard
                      label="Rejetées"
                      value={pStats.rejected}
                      color="bg-red-50"
                      textColor="text-red-700"
                    />
                  </>
                ) : (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-card p-5 card-shadow animate-pulse h-24"
                    />
                  ))
                )}
              </div>

              {/* Dispute stats */}
              <h2 className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider mb-3">
                Litiges
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {dStats ? (
                  <>
                    <StatCard
                      label="Ouverts"
                      value={dStats.open}
                      color="bg-yellow-50"
                      textColor="text-yellow-700"
                    />
                    <StatCard
                      label="En revue"
                      value={dStats.underReview}
                      color="bg-blue-50"
                      textColor="text-blue-700"
                    />
                    <StatCard
                      label="Résolus"
                      value={dStats.resolved}
                      color="bg-green-50"
                      textColor="text-green-700"
                    />
                    <StatCard
                      label="Critiques"
                      value={dStats.critical}
                      color="bg-red-50"
                      textColor="text-red-700"
                    />
                  </>
                ) : (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-card p-5 card-shadow animate-pulse h-24"
                    />
                  ))
                )}
              </div>

              {/* Recent partnerships */}
              <h2 className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider mb-3">
                Dernières candidatures
              </h2>
              <div className="space-y-3">
                {partnerships.slice(0, 5).map((p) => (
                  <PartnershipCard
                    key={p.id}
                    partnership={p}
                    onClick={() => {
                      setSelectedPartnership(p);
                      setAdminNotes(p.adminNotes || "");
                    }}
                  />
                ))}
                {partnerships.length === 0 && (
                  <p className="text-charcoal/40 text-sm">
                    Aucune candidature pour le moment.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* PARTNERSHIPS TAB */}
          {tab === "partnerships" && (
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-charcoal mb-6">
                Candidatures
              </h1>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(
                  [
                    ["all", "Toutes"],
                    ["pending", "En attente"],
                    ["approved", "Approuvées"],
                    ["rejected", "Rejetées"],
                  ] as [StatusFilter, string][]
                ).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setStatusFilter(value)}
                    className={`px-4 py-2 rounded-btn text-sm font-medium transition-colors ${
                      statusFilter === value
                        ? "bg-forest-500 text-white"
                        : "bg-white text-charcoal card-shadow hover:bg-forest-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {partnerships.map((p) => (
                  <PartnershipCard
                    key={p.id}
                    partnership={p}
                    onClick={() => {
                      setSelectedPartnership(p);
                      setAdminNotes(p.adminNotes || "");
                    }}
                  />
                ))}
                {partnerships.length === 0 && (
                  <div className="text-center py-12 text-charcoal/40">
                    Aucune candidature trouvée.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DISPUTES TAB */}
          {tab === "disputes" && (
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-charcoal mb-6">
                Litiges
              </h1>
              {dStats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    label="Ouverts"
                    value={dStats.open}
                    color="bg-yellow-50"
                    textColor="text-yellow-700"
                  />
                  <StatCard
                    label="Remboursements (XAF)"
                    value={dStats.refundsXaf.toLocaleString()}
                    color="bg-orange-50"
                    textColor="text-orange-700"
                  />
                  <StatCard
                    label="Temps moyen (h)"
                    value={dStats.avgResolutionHours}
                    color="bg-blue-50"
                    textColor="text-blue-700"
                  />
                  <StatCard
                    label="Escaladés"
                    value={dStats.escalated}
                    color="bg-red-50"
                    textColor="text-red-700"
                  />
                </div>
              )}
              <p className="text-charcoal/50 text-sm">
                La gestion détaillée des litiges est disponible sur le{" "}
                <a
                  href="https://nyama-dashboard.vercel.app"
                  target="_blank"
                  className="text-forest-500 underline"
                >
                  dashboard principal
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Partnership detail modal */}
      {selectedPartnership && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setSelectedPartnership(null)}
        >
          <div
            className="bg-white rounded-card w-full max-w-lg max-h-[90vh] overflow-auto card-shadow p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-serif text-xl text-charcoal">
                  {selectedPartnership.firstName}{" "}
                  {selectedPartnership.lastName}
                </h2>
                <p className="text-charcoal/50 text-sm mt-0.5">
                  {selectedPartnership.type === "cuisiniere"
                    ? "Cuisinière / Restaurant"
                    : "Livreur"}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusColors[selectedPartnership.status] ||
                  "bg-gray-100 text-gray-800"
                }`}
              >
                {statusLabels[selectedPartnership.status] ||
                  selectedPartnership.status}
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <DetailRow
                label="Téléphone"
                value={selectedPartnership.phone}
              />
              {selectedPartnership.email && (
                <DetailRow
                  label="Email"
                  value={selectedPartnership.email}
                />
              )}
              {selectedPartnership.companyName && (
                <DetailRow
                  label="Établissement"
                  value={selectedPartnership.companyName}
                />
              )}
              <DetailRow
                label="Localisation"
                value={`${selectedPartnership.quarter}, ${selectedPartnership.city}`}
              />
              {selectedPartnership.vehicleType && (
                <DetailRow
                  label="Véhicule"
                  value={selectedPartnership.vehicleType}
                />
              )}
              {selectedPartnership.idNumber && (
                <DetailRow
                  label="CNI"
                  value={selectedPartnership.idNumber}
                />
              )}
              {selectedPartnership.description && (
                <div>
                  <p className="text-charcoal/50 mb-1">Description</p>
                  <p className="text-charcoal">
                    {selectedPartnership.description}
                  </p>
                </div>
              )}
              <DetailRow
                label="Date"
                value={new Date(
                  selectedPartnership.createdAt
                ).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />

              {/* Admin notes */}
              <div>
                <label className="block text-charcoal/50 mb-1">
                  Notes admin
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-btn bg-background text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/30 resize-none"
                  placeholder="Notes internes..."
                />
              </div>
            </div>

            {/* Actions */}
            {selectedPartnership.status === "pending" && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    handleAction(selectedPartnership.id, "approved")
                  }
                  disabled={actionLoading}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-btn font-medium hover:bg-green-700 transition-colors disabled:opacity-60"
                >
                  Approuver
                </button>
                <button
                  onClick={() =>
                    handleAction(selectedPartnership.id, "rejected")
                  }
                  disabled={actionLoading}
                  className="flex-1 bg-red-600 text-white py-2.5 rounded-btn font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
                >
                  Rejeter
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedPartnership(null)}
              className="w-full mt-3 py-2.5 rounded-btn text-charcoal/60 hover:bg-background transition-colors text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  textColor,
}: {
  label: string;
  value: number | string;
  color: string;
  textColor?: string;
}) {
  return (
    <div className={`${color} rounded-card p-5 card-shadow`}>
      <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className={`text-2xl font-serif font-bold ${textColor || "text-charcoal"}`}>
        {value}
      </p>
    </div>
  );
}

function PartnershipCard({
  partnership,
  onClick,
}: {
  partnership: Partnership;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-card p-4 sm:p-5 card-shadow hover:card-shadow-hover transition-shadow text-left flex items-center gap-4"
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          partnership.type === "cuisiniere"
            ? "bg-orange-50 text-orange-500"
            : "bg-gold-50 text-gold"
        }`}
      >
        {partnership.type === "cuisiniere" ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-charcoal truncate">
          {partnership.firstName} {partnership.lastName}
        </p>
        <p className="text-xs text-charcoal/50 truncate">
          {partnership.city}, {partnership.quarter}
          {partnership.email ? ` — ${partnership.email}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline text-xs text-charcoal/40">
          {partnership.phone}
        </span>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            statusColors[partnership.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {statusLabels[partnership.status] || partnership.status}
        </span>
      </div>
    </button>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-charcoal/50 shrink-0">{label}</span>
      <span className="text-charcoal text-right">{value}</span>
    </div>
  );
}
