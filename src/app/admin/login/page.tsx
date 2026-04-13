"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export default function AdminLogin() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("nyama_login_attempts");
    const storedLock = localStorage.getItem("nyama_login_locked");
    if (stored) setAttempts(parseInt(stored, 10));
    if (storedLock) {
      const lockTime = parseInt(storedLock, 10);
      if (Date.now() < lockTime) {
        setLockedUntil(lockTime);
      } else {
        localStorage.removeItem("nyama_login_locked");
        localStorage.removeItem("nyama_login_attempts");
      }
    }
  }, []);

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLocked) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (!res.ok) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem("nyama_login_attempts", String(newAttempts));

        if (newAttempts >= MAX_ATTEMPTS) {
          const lockTime = Date.now() + LOCKOUT_MINUTES * 60 * 1000;
          setLockedUntil(lockTime);
          localStorage.setItem("nyama_login_locked", String(lockTime));
          setError(
            `Trop de tentatives. Compte bloqué pendant ${LOCKOUT_MINUTES} minutes.`
          );
        } else {
          const errData = await res.json().catch(() => null);
          setError(
            errData?.message || "Identifiants incorrects."
          );
        }
        return;
      }

      const data = await res.json();
      localStorage.setItem("nyama_admin_token", data.access_token);
      localStorage.removeItem("nyama_login_attempts");
      localStorage.removeItem("nyama_login_locked");
      router.push("/admin/dashboard");
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-[400px]">
        <div className="bg-white rounded-card p-8 sm:p-10 card-shadow">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif text-orange-500 font-bold mb-1">
              NYAMA
            </h1>
            <p className="text-charcoal/50 text-sm">Administration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Identifiant
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                disabled={isLocked}
                className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/30 transition-shadow disabled:opacity-50"
                placeholder="Nom d'utilisateur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLocked}
                className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-500/30 transition-shadow disabled:opacity-50"
                placeholder="Mot de passe"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-btn text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || isLocked}
              className="w-full bg-forest-500 text-white py-3 rounded-btn font-semibold hover:bg-forest-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="text-center text-xs text-charcoal/30 mt-6 flex items-center justify-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.27 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            Connexion surveillée et journalisée
          </p>
        </div>
      </div>
    </main>
  );
}
