"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminHandoffPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Authentification...");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    const match = hash.match(/token=([^&]+)/);
    if (!match) {
      setStatus("Aucun jeton reçu. Redirection...");
      router.replace("/admin/login");
      return;
    }
    const token = decodeURIComponent(match[1]);
    localStorage.setItem("nyama_admin_token", token);
    document.cookie = `admin-token=${token}; path=/; max-age=${2 * 3600}; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    window.history.replaceState(null, "", window.location.pathname);
    setStatus("Connecté — redirection...");
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4" />
        <p className="text-charcoal/70">{status}</p>
      </div>
    </main>
  );
}
